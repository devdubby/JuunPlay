import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ReviewPresenter from "./ReviewPresenter";
import styled from "styled-components";
import { connect } from "react-redux";
import { getReviews, likeReview, unLikeReview } from "../../../actions";
import Loader from "../../Loader";

const LoaderContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  margin-top: 20px;
`;

const EmptyText = styled.span`
  font-size: 23px;
  margin-top: 7vh;
`;

class ReviewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: null,
      isMyLike: null,
      loading: true
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

  // handleLikeReview = () => {
  //   const { isLike, likeCount } = this.state;
  //   if (isLike) {
  //     this.setState({ isLike: false, likeCount: likeCount - 1 });
  //   } else {
  //     this.setState({ isLike: true, likeCount: likeCount + 1 });
  //   }
  // };

  // async componentWillUnmount() {
  //   const { isLike } = this.state;
  //   const {
  //     review: { id },
  //     user: { jwtToken }
  //   } = this.props;

  //   if (isLike) {
  //     return await likeReview(id, jwtToken);
  //   } else {
  //     // return await unLikeReview(id, jwtToken);
  //   }
  // }

  findLikedUser = (user, liked_users_id) =>
  liked_users_id.findIndex(element => element === user.id) === -1
    ? false
    : true;

  render() {
    const { reviews, loading } = this.state;
    const { user } = this.props;
    console.log('review container', this.props);
    return (
      <>
        {loading ? (
          <LoaderContainer>
            <span role="img" aria-label="Loading">
              ⏰
            </span>
          </LoaderContainer>
        ) : reviews && reviews.length > 0 ? (
          reviews.map(review => (
            <ReviewPresenter
              user={user}
              key={review.id}
              review={review}
              isMyLike={this.findLikedUser(user, review.liked_users_id)}
              likeCount={review.liked_users_id.length}
              handleLikeReview={this.handleLikeReview}
            />
          ))
        ) : (
          <EmptyText>작성된 리뷰가 없습니다.</EmptyText>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth
  };
};

export default connect(mapStateToProps, {})(withRouter(ReviewContainer));
