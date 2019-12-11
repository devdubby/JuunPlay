import React, { Component } from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import { likeReview, unLikeReview } from "../../../actions";

const ReviewContainer = styled.div`
  width: 48%;
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
    const { isMyLike, likeCount } = this.props;
    this.setState({ isLike: isMyLike ? true : false, likeCount });
  };
  
  handleLikeReview = () => {
    const { isLike, likeCount } = this.state;
    const { user: { jwtToken } } = this.props;

    if(!jwtToken) return;

    if (isLike) {
      this.setState({ isLike: false, likeCount: likeCount - 1 });
    } else {
      this.setState({ isLike: true, likeCount: likeCount + 1 });
    }
    console.log('handle like review');
  };

   async componentWillUnmount() {
    const { isLike } = this.state;
    const {
      review: { id },
      user: { jwtToken },
      isMyLike
    } = this.props;

    if(isLike !== isMyLike) {
      if (isLike) {
        return await likeReview(id, jwtToken);
      } else {
        return await unLikeReview(id, jwtToken);
      }
    }
  }

  render() {
    const { isLike, likeCount } = this.state;
    console.log('props는 그대로 있나?', this.props.isMyLike);
    const { review, user: { jwtToken } } = this.props;
    return (
      <ReviewContainer>
        <ReviewBox>
          <ReviewerName>{review.writer_name}</ReviewerName>
          <ReviewData>{review.review_data}</ReviewData>
          <LikeBox>
            <ReviewIcon onClick={this.handleLikeReview} data-tip={"로그인 해주세요"} place="right">
              <i className={isLike ? "fas fa-thumbs-up" : "far fa-thumbs-up"}></i>
            </ReviewIcon>
            {!jwtToken && <ReactTooltip />}
            <LikeCount>{likeCount}</LikeCount>
          </LikeBox>
        </ReviewBox>
      </ReviewContainer>
    );
  };
};

export default ReviewPresenter;
