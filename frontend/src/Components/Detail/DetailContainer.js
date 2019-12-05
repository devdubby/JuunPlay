import React, { Component } from "react";
import { connect } from "react-redux";
import DetailPresenter from "./DetailPresenter";
import {
  getMovieDetail,
  getShowDetail,
  getShowVideos,
  getReviews
} from "../../actions";

class DetailContainer extends Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname }
    } = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/"),
      showVideos: null,
      reviews: null,
      isLike: false,
      inputReviewValue: null,
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id }
      },
      history: { push }
    } = this.props;
    const { isMovie } = this.state;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    let showVideos = null;

    const { data } = await getReviews(parsedId);
    try {
      if (isMovie) {
        ({ data: result } = await getMovieDetail(parsedId));
      } else {
        ({ data: result } = await getShowDetail(parsedId));
        ({ data: showVideos } = await getShowVideos(parsedId));
      }
    } catch {
      this.setState({ error: "Can't find anything." });
    } finally {
      this.setState({ loading: false, result, showVideos, reviews: data });
    }
  }

  handleLikeReview = () => {
    const { isLike } = this.state;
    this.setState({ isLike: !isLike })
  }

  onChangeReview = (event) => {
    this.setState({ inputReviewValue: event.target.value });
  }

  onReviewCancel = () => {
    this.setState({ inputReviewValue: "" });
  }

  render() {
    console.log("detail", this.state);
    console.log("detail props", this.props);
    const { result, error, loading, showVideos, reviews, isLike, inputReviewValue } = this.state;
    const { user } = this.props;
    return (
      <DetailPresenter
        result={result}
        error={error}
        loading={loading}
        showVideos={showVideos}
        reviews={reviews}
        handleLikeReview={this.handleLikeReview}
        isLike={isLike}
        user={user}
        onChangeReview={this.onChangeReview}
        inputReviewValue={inputReviewValue}
        onReviewCancel={this.onReviewCancel}
      />
    );
  }
}

const mapStateToProps = state => {
  const { auth } = state;
  return {
    user: auth
  }
};

export default connect(
  mapStateToProps, 
  {}
)(DetailContainer);