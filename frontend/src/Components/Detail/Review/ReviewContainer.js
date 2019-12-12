import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ReviewPresenter from "./ReviewPresenter";
import styled from "styled-components";
import { connect } from "react-redux";
import { getReviews, inputReview } from "../../../actions";

class ReviewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: null,
      loading: true,
      reviewPage: 1,
      inputReviewValue: ''
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id }
      },
      user: { jwtToken }
    } = this.props;
    const parsedId = parseInt(id);
    try {
      const { data: reviews } = await getReviews(parsedId, jwtToken);
      this.setState({ reviews });
    } catch {
      this.setState({ error: "Can't find anything." });
    } finally {
      this.setState({ loading: false });
    }
  }

  findLikedUser = (liked_users_id) => {
    const { user } = this.props;
    return liked_users_id.findIndex(element => element === user.id) === -1 ? false : true;
  }

  reviewPageHandler = (direction) => {
    const { reviews, reviewPage } = this.state;
    if(reviewPage - 1 !== 0 && direction === "left") {
      this.setState({ reviewPage: reviewPage - 1 });
    } else if(reviews.length - 6 * reviewPage > 0 && direction === "right") {
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
    
    if(!jwtToken) {
      return alert("먼저 로그인 해주세요");
    }
    
    await inputReview(inputReviewValue, parseInt(id), jwtToken);
    alert("리뷰가 등록 되었습니다.")
    window.location.reload();
  };

  render() {
    const { reviews, loading, reviewPage, inputReviewValue } = this.state;
    const { user } = this.props;
    return (
      <ReviewPresenter
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
