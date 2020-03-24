import React, { Component } from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { likeReview, unLikeReview } from '../../../actions';

const ReviewContainer = styled.div`
  width: 48%;
  height: 29.6%;
  max-height: 29.5%;
  margin: 5px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReviewBox = styled.div`
  width: 92%;
  padding: 13px;
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
  line-height: 21px;
  word-break: keep-all;
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

class Review extends Component {
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
  }

  handleLikeReview = () => {
    const { isLike, likeCount } = this.state;
    const {
      user: { jwtToken },
    } = this.props;

    if (!jwtToken) return;

    if (isLike) {
      this.setState({ isLike: false, likeCount: likeCount - 1 });
    } else {
      this.setState({ isLike: true, likeCount: likeCount + 1 });
    }
  };

  async componentWillUnmount() {
    const { isLike } = this.state;
    const {
      review: { id },
      user: { jwtToken },
      isMyLike,
    } = this.props;

    if (!jwtToken || isLike === isMyLike) return;

    isLike ? await likeReview(id, jwtToken) : await unLikeReview(id, jwtToken);
  }

  render() {
    const { isLike, likeCount } = this.state;
    const {
      review,
      user: { jwtToken },
    } = this.props;
    return (
      <ReviewContainer>
        <ReviewBox>
          <ReviewerName>{review.writer_name}</ReviewerName>
          <ReviewData>{review.review_data}</ReviewData>
          <LikeBox>
            <ReviewIcon onClick={this.handleLikeReview} data-tip={'로그인 해주세요'} place="right">
              <i className={isLike ? 'fas fa-thumbs-up' : 'far fa-thumbs-up'}></i>
            </ReviewIcon>
            {!jwtToken && <ReactTooltip />}
            <LikeCount>{likeCount}</LikeCount>
          </LikeBox>
        </ReviewBox>
      </ReviewContainer>
    );
  }
}

export default Review;
