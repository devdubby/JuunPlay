import React, { Component } from "react";
import styled from "styled-components";

const ReviewContainer = styled.div`
  width: 100%;
  height: 29.6%;
  max-height: 29.5%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReviewBox = styled.div`
  width: 92%;
  padding: 0px 10px;
  display: flex;
  flex-direction: column;
  line-height: 32px;
  margin-bottom: 6px;
`;

const ReviewerName = styled.span`
  font-size: 19px;
`;

const ReviewData = styled.span`
  font-size: 15px;
`;

const LikeBox = styled.div``;

const ReviewIcon = styled.button`
  width: 31px;
  font-size: 17px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
`;

const LikeCount = styled.span`
  font-size: 15px;
`;

class ReviewPresenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLike: null,
      likeCount: null,
    };
  }

  componentDidMount() {
    const { isMyLike } = this.props;
    console.log('is my like', this.props);
    this.setState({ isLike: isMyLike ? true : false });
  };

  render() {
    const { isLike } = this.state;
    console.log('isLike', isLike);
    const { review, handleLikeReview , likeCount } = this.props;
    return (
      <ReviewContainer>
        <ReviewBox>
          <ReviewerName>{review.writer_name}</ReviewerName>
          <ReviewData>{review.review_data}</ReviewData>
          <LikeBox>
            <ReviewIcon onClick={handleLikeReview}>
              <i className={isLike ? "fas fa-thumbs-up" : "far fa-thumbs-up"}></i>
            </ReviewIcon>
            <LikeCount>{likeCount}</LikeCount>
          </LikeBox>
        </ReviewBox>
      </ReviewContainer>
    );
  };
};

export default ReviewPresenter;
