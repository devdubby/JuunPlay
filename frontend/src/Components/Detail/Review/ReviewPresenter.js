import React, { Component } from "react";
import Review from "./Review";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 96%;
  min-height: 96%;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  padding: 12px 16px;
`;

const ReviewContainer = styled.div`
  width: 63%;
  min-width: 63%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ReviewMain = styled.div`
  display: flex;
  align-items: center;
`;

const ReviewBox = styled.div`
  width: 46vw;
  height: 58vh;
  min-width: 46vw;
  min-height: 58vh;
  display: flex;
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

const EmptyContainer = styled.div`
  height: 58vh;
  min-height: 58vh;
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

const ReviewDiv = styled.div``;

const VoteContainer = styled.div`
  width: 100%;
  padding: 8px 0px 0px 54px;
  height: 8%;
  min-height: 8%;
`;

const VoteText = styled.span`
  font-size: 20px;
`;

const InputContainer = styled.div`
  width: 53%;
  height: 16%;
  max-height: 16%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 15px;
`;

const ReviewInput = styled.input`
  width: 92%;
  height: 46%;
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
  width: 37%;
  min-width: 37%;
  height: 100%;
`;

const TitleBox = styled.div`
  width: 100%;
  height: 8%;
  min-height: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CreditsTitle = styled.span`
  font-size: 30px;
  font-weight: 600;
`;

const Content = styled.div`
  width: 100%;
  height: 40%;
  min-height: 40%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const CreditsData = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 11px;
  overflow: hidden;
`;

const Poster = styled(Link)`
  background-image: url(${props => props.imgUrl});
  width: 100%;
  height: 100%;
  background-size: cover;
  margin-top: 10px;
`;

const Title = styled.span`
  font-size: 18px;
  margin-bottom: 7px;
`;

const Name = styled.span`
  font-size: 15px;
  line-height: 16px;
`;

const CollectionsContainer = styled.div`
  width: 100%;
  height: 51%;
  min-height: 51%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 9px;
`;

const CollectionsData = styled.div`
  width: 100%;
  height: 88%;
  min-height: 88%;
  display: flex;
  justify-content: center;
  overflow: auto;
  flex-wrap: wrap;
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px
      ${props => (props.isScrollEvent ? "black" : "transparent")};
    background-color: ${props =>
      props.isScrollEvent ? "rgba(255, 255, 255, 0.4)" : "transparent"};
  }
`;

const SeriesContainer = styled.div`
  width: 35%;
  min-width: 35%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6px;
`;

const CollectionTitle = styled.span`
  height: 14%;
  min-height: 14%;
  font-size: 15px;
  line-height: 16px;
  word-break: keep-all;
  text-align: center;
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
  collections,
  title,
  voteCount,
  voteAverage,
  handleScroll,
  isScrollEvent,
  isMovie
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
        {credits && (
          <ContentContainer>
            <TitleBox>
              <CreditsTitle>{title}</CreditsTitle>
            </TitleBox>
            <Content>
              <CreditsData>
                <Title>감독</Title>
                {credits.crew.map(crew => (
                  <Name key={crew.id}>{crew.name}</Name>
                ))}
              </CreditsData>
              <CreditsData>
                <Title>출연</Title>
                {credits.cast.map(cast => (
                  <Name key={cast.id}>{cast.name}</Name>
                ))}
              </CreditsData>
            </Content>
            <CollectionsContainer>
              <Title>시리즈</Title>
              <CollectionsData
                onScroll={handleScroll}
                isScrollEvent={isScrollEvent}
              >
                {collections ?
                  (collections.parts.map(part => (
                    <SeriesContainer key={part.id}>
                      <CollectionTitle>{part.title}</CollectionTitle>
                      <Poster
                        to={isMovie ? `/movie/${part.id}` : `/show/${part.id}`}
                        imgUrl={`https://image.tmdb.org/t/p/w300${part.poster_path}`}
                      />
                    </SeriesContainer>
                  ))) : (
                    <CollectionTitle>시리즈가 없습니다.</CollectionTitle>
                  )
                }
              </CollectionsData>
            </CollectionsContainer>
          </ContentContainer>
        )}
        <ReviewContainer>
          <VoteContainer>
            <VoteText>{`평균별점 ⭐️${voteAverage}점 `} </VoteText>
            <VoteText>{voteCount}명</VoteText>
          </VoteContainer>
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
              <EmptyContainer>
                <EmptyText>작성된 리뷰가 없습니다.</EmptyText>
              </EmptyContainer>
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
      </>
    )}
  </Container>
);

export default ReviewPresenter;
