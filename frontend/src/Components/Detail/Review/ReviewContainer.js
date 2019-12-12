import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ReviewPresenter from "./ReviewPresenter";
import styled from "styled-components";
import { connect } from "react-redux";
import { getReviews } from "../../../actions";
import Loader from "../../Loader";

const ReviewMain = styled.div`
  width: 100%;
  height: 81%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ReviewBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

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

const ChevronContainer = styled.div`
  height: 50%;
  width: 4%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChevronBtn = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;

const ChevronIcon = styled.i`
  color: white;
  font-size: 26px;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
`;

class ReviewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: null,
      isMyLike: null,
      loading: true,
      reviewPage: 1
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

  findLikedUser = (user, liked_users_id) =>
    liked_users_id.findIndex(element => element === user.id) === -1
      ? false
      : true;

  renderReviews = () => {
    const { reviews, reviewPage } = this.state;
    const { user } = this.props;

    return reviews && reviews.length > 0 ? (
      <>
        <ChevronContainer>
          <ChevronBtn onClick={() => this.reviewPageHandler("left")}>
            <ChevronIcon className="fas fa-chevron-left"></ChevronIcon>
          </ChevronBtn>
        </ChevronContainer>
        <ReviewBox>
          {reviews
            .filter(
              (review, index) => index >= (reviewPage - 1) * 6 && index < reviewPage * 6
            )
            .map(review => (
              <ReviewPresenter
                user={user}
                key={review.id}
                review={review}
                isMyLike={this.findLikedUser(user, review.liked_users_id)}
                likeCount={review.liked_users_id.length}
              />
            ))}
        </ReviewBox>
        <ChevronContainer>
          <ChevronBtn onClick={() => this.reviewPageHandler("right")}>
            <ChevronIcon className="fas fa-chevron-right"></ChevronIcon>
          </ChevronBtn>
        </ChevronContainer>
      </>
    ) : (
      <EmptyText>작성된 리뷰가 없습니다.</EmptyText>
    );
  };

  reviewPageHandler = (direction) => {
    const { reviews, reviewPage } = this.state;
    if(reviewPage - 1 !== 0 && direction === "left") {
      this.setState({ reviewPage: reviewPage - 1 });
    } else if(reviews.length - 6 * reviewPage > 0 && direction === "right") {
      this.setState({ reviewPage: reviewPage + 1 });
    }
  };

  render() {
    const { loading } = this.state;
    return (
      <ReviewMain>
        {loading ? (
          <LoaderContainer>
            <span role="img" aria-label="Loading">
              ⏰
            </span>
          </LoaderContainer>
        ) : (
          this.renderReviews()
        )}
      </ReviewMain>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth
  };
};

export default connect(mapStateToProps, {})(withRouter(ReviewContainer));
