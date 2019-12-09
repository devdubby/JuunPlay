import React, { Component } from "react";
import ReviewPresenter from "./ReviewPresenter";
import { connect } from "react-redux";
import { likeReview, unLikeReview } from "../../../actions";

class ReviewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLike: props.isLike,
      likeCount: props.likeCount,
    };
  }

  handleLikeReview = () => {
    const { isLike, likeCount } = this.state;
    if(isLike) {
      this.setState({ isLike: false, likeCount: likeCount - 1 });
    } else {
      this.setState({ isLike: true, likeCount: likeCount + 1 });
    }
  };

  async componentWillUnmount() {
    const { isLike } = this.state;
    const {
      review: { id },
      user: { jwtToken }
    } = this.props;

    if (isLike) {
      return await likeReview(id, jwtToken);
    } else {
      // return await unLikeReview(id, jwtToken);
    }
  }

  render() {
    const { review } = this.props;
    const { isLike, likeCount } = this.state;
    return (
      <ReviewPresenter
        review={review}
        handleLikeReview={this.handleLikeReview}
        isLike={isLike}
        likeCount={likeCount}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth
  };
};

export default connect(mapStateToProps, {})(ReviewContainer);
