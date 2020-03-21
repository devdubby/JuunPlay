import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import { likeReview, unLikeReview } from "../../../actions";

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

function Review ({ review, isMyLike, likeCount: originCount }) {
  const [state, setState] = useState({
    isLike: isMyLike ? true : false,
    likeCount: originCount
  });
  const { isLike, likeCount } = state;
  const { jwtToken } = useSelector(state => state.auth);

  const likeCallApi = useCallback(async () => {
    console.log('like call api', isLike, isMyLike);
    if(!jwtToken) return;

    if(isLike !== isMyLike) {
      if (isLike) {
        return await likeReview(review.id, jwtToken);
      } else {
        return await unLikeReview(review.id, jwtToken);
      }
    }
  }, [isLike, isMyLike, jwtToken, review.id]);
  
  useEffect(() => {
    return () => likeCallApi();
  }, [likeCallApi]);

  const handleLikeReview = useCallback(() => {
    if(!jwtToken) return;
    setState({ ...state, isLike: isLike ? false : true, likeCount: isLike ? likeCount - 1 : likeCount + 1 });
  }, [state, isLike, jwtToken, likeCount]);

  console.log('in component', state);

  return (
    <ReviewContainer>
      <ReviewBox>
        <ReviewerName>{review.writer_name}</ReviewerName>
        <ReviewData>{review.review_data}</ReviewData>
        <LikeBox>
          <ReviewIcon onClick={handleLikeReview} data-tip={"로그인 해주세요"} place="right">
            <i className={isLike ? "fas fa-thumbs-up" : "far fa-thumbs-up"}></i>
          </ReviewIcon>
          {!jwtToken && <ReactTooltip />}
          <LikeCount>{likeCount}</LikeCount>
        </LikeBox>
      </ReviewBox>
    </ReviewContainer>
  );
};

export default Review;
