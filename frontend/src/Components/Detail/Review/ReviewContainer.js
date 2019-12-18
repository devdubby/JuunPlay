import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ReviewPresenter from "./ReviewPresenter";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  getReviews,
  inputReview,
  getMovieCredits,
  getShowCredits,
  getCollections
} from "../../../actions";

let timeID = null;

class ReviewContainer extends Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname }
    } = props;
    this.state = {
      reviews: null,
      credits: null,
      loading: true,
      reviewPage: 1,
      inputReviewValue: "",
      isMovie: pathname.includes("/movie/"),
      cast: null,
      crew: null,
      collections: null,
      isScrollEvent: true
    };
  }

  async componentDidMount() {
    const { isMovie } = this.state;
    const {
      match: {
        params: { id }
      },
      user: { jwtToken },
      collectionsID
    } = this.props;
    const parsedId = parseInt(id);
    try {
      const { data: reviews } = await getReviews(parsedId, jwtToken);
      const collections = collectionsID && await getCollections(collectionsID);
      const data = isMovie
        ? await getMovieCredits(parsedId)
        : await getShowCredits(parsedId);
      const cast = data.cast.filter((cast, index) => index < 7);
      const crew = data.crew.filter(crew => crew.job === "Director");

      this.setState({ reviews, credits: { cast, crew }, collections });
    } catch {
      this.setState({ error: "Can't find anything." });
    } finally {
      this.setState({ loading: false });
      setTimeout(() => {
        this.setState({ isScrollEvent: false });
      }, 1500);
    }
  }

  findLikedUser = liked_users_id => {
    const { user } = this.props;
    return liked_users_id.findIndex(element => element === user.id) === -1
      ? false
      : true;
  };

  reviewPageHandler = direction => {
    const { reviews, reviewPage } = this.state;
    if (reviewPage - 1 !== 0 && direction === "left") {
      this.setState({ reviewPage: reviewPage - 1 });
    } else if (reviews.length - 6 * reviewPage > 0 && direction === "right") {
      this.setState({ reviewPage: reviewPage + 1 });
    }
  };

  onChangeReview = event => {
    this.setState({ inputReviewValue: event.target.value });
  };

  onReviewCancel = () => {
    this.setState({ inputReviewValue: "" });
  };

  onSubmit = async () => {
    const { inputReviewValue } = this.state;
    const {
      user: { jwtToken },
      match: {
        params: { id }
      }
    } = this.props;

    if (!jwtToken) {
      return alert("먼저 로그인 해주세요");
    }

    await inputReview(inputReviewValue, parseInt(id), jwtToken);
    alert("리뷰가 등록 되었습니다.");
    window.location.reload();
  };

  handleScroll = () => {
    clearTimeout(timeID);
    const { isScrollEvent } = this.state;
    if (!isScrollEvent) {
      this.setState({ isScrollEvent: true });
    }
    timeID = setTimeout(() => {
      this.setState({ isScrollEvent: false });
    }, 1500);
  };

  render() {
    const {
      reviews,
      loading,
      reviewPage,
      inputReviewValue,
      credits,
      collections,
      isScrollEvent,
      isMovie
    } = this.state;
    const { user, title, voteCount, voteAverage } = this.props;
    console.log("this.state", this.state);
    return (
      <ReviewPresenter
        credits={credits}
        user={user}
        reviews={reviews}
        loading={loading}
        findLikedUser={this.findLikedUser}
        reviewPageHandler={this.reviewPageHandler}
        reviewPage={reviewPage}
        onChangeReview={this.onChangeReview}
        onReviewCancel={this.onReviewCancel}
        onSubmit={this.onSubmit}
        inputReviewValue={inputReviewValue}
        collections={collections}
        title={title}
        voteCount={voteCount}
        voteAverage={voteAverage}
        handleScroll={this.handleScroll}
        isScrollEvent={isScrollEvent}
        isMovie={isMovie}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth
  };
};

export default connect(mapStateToProps, {})(withRouter(ReviewContainer));
