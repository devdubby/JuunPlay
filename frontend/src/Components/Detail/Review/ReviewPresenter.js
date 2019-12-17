import React, { Component } from "react";
import Review from "./Review";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 96%;
  min-height: 96%;
  display: flex;
  justify-content: center;
`;

const ReviewContainer = styled.div`
  width: 69%;
  min-width: 69%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ReviewMain = styled.div`
  display: flex;
  align-items: center;
  height: 78%;
`;

const ReviewBox = styled.div`
  width: 51vw;
  height: 58vh;
  min-width: 51vw;
  min-height: 58vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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

const InputContainer = styled.div`
  width: 49%;
  height: 16%;
  max-height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 15px;
`;

const ReviewInput = styled.input`
  width: 92%;
  height: 44%;
  font-size: 16px;
  background-color: transparent;
  border: solid black 1px;
  color: white;
  border-radius: 8px;
  outline: none;
`;

const InputBtnContainer = styled.div`
  width: 92%;
  height: 35px;
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
`;

const InputButton = styled.button`
  background-color: ${props =>
    props.name === "cancel"
      ? "rgba(255, 255, 255, 0.3)"
      : "rgba(0, 0, 0, 0.3)"};
  width: 18%;
  margin-left: 13px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  outline: none;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  &::after {
    background-image: url(${props => props.bgImage});
    background-position: center;
    background-size: cover;
    opacity: 0.3 !important;
    z-index: -1;
    content: "";
    width: 25%;
    height: 76%;
    filter: blur(3px);
    position: absolute;
    border-radius: 10px;
  }
`;

const TitleBox = styled.div`
  width: 100%;
  height: 18%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CollectionTitle = styled.span`
  font-size: 20px;
`;

const Content = styled.div`
  width: 100%;
  height: 32%;
  display: flex;
  padding: 18px;
`;

const CollectionData = styled.div`
  width: 82%;
  height: 92%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 15px;
  overflow: hidden;
`;

const Poster = styled.div`
  background-image: url(${props => props.imgUrl});
  width: 42%;
  height: 100%;
  background-size: cover;
`;

const Title = styled.span`
  font-size: 15px;
  margin-bottom: 12px;
`;

const Overview = styled.span`
  font-size: 15px;
  line-height: 16px;
`;

const ReviewPresenter = ({
  user,
  reviews,
  loading,
  reviewPage,
  findLikedUser,
  reviewPageHandler,
  onChangeReview,
  inputReviewValue,
  onReviewCancel,
  onSubmit,
  credits,
  collections
}) => (
  <Container>
    {loading ? (
      <LoaderContainer>
        <span role="img" aria-label="Loading">
          ⏰
        </span>
      </LoaderContainer>
    ) : (
    <>
      <ReviewContainer>
        <ReviewMain>
          {reviews && reviews.length > 0 ? (
            <>
              <ChevronContainer>
                <ChevronBtn onClick={() => reviewPageHandler("left")}>
                  <ChevronIcon className="fas fa-chevron-left"></ChevronIcon>
                </ChevronBtn>
              </ChevronContainer>
              <ReviewBox>
                {reviews
                  .filter(
                    (review, index) =>
                      index >= (reviewPage - 1) * 6 && index < reviewPage * 6
                  )
                  .map(review => (
                    <Review
                      user={user}
                      key={review.id}
                      review={review}
                      isMyLike={findLikedUser(review.liked_users_id)}
                      likeCount={review.liked_users_id.length}
                    />
                  ))}
              </ReviewBox>
              <ChevronContainer>
                <ChevronBtn onClick={() => reviewPageHandler("right")}>
                  <ChevronIcon className="fas fa-chevron-right"></ChevronIcon>
                </ChevronBtn>
              </ChevronContainer>
            </>
          ) : (
            <EmptyText>작성된 리뷰가 없습니다.</EmptyText>
          )}
        </ReviewMain>
        <InputContainer>
          <ReviewInput
            value={inputReviewValue}
            onChange={onChangeReview}
            placeholder={
              user && user.jwtToken
                ? "리뷰를 작성해주세요."
                : "리뷰를 작성하려면 로그인 해주세요."
            }
            disabled={user && user.jwtToken ? false : true}
          />
          {inputReviewValue && inputReviewValue.length > 0 && (
            <InputBtnContainer>
              <InputButton name="cancel" onClick={onReviewCancel}>
                취소
              </InputButton>
              <InputButton name="confirm" onClick={onSubmit}>
                확인
              </InputButton>
            </InputBtnContainer>
          )}
        </InputContainer>
      </ReviewContainer>
      {collections && <ContentContainer bgImage={`https://image.tmdb.org/t/p/original${collections.poster_path}`}>
        <TitleBox><CollectionTitle>{collections.name}</CollectionTitle></TitleBox>
        {collections.parts.map(part => 
          <Content>
            <Poster imgUrl={`https://image.tmdb.org/t/p/w300${part.poster_path}`} />
            <CollectionData>
              <Title>{part.title}</Title>
              <Overview>{part.overview}</Overview>
            </CollectionData>
          </Content>
        )}
      </ContentContainer>}
    </>)}
  </Container>
);

export default ReviewPresenter;
