import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../Loader";
import Review from "./Review";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  padding: 100px 50px 50px 50px;
`;

const BackDrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 37%;
  margin-left: 20px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span`
  font-size: 18px;
`;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  margin-bottom: 20px;
  max-height: 22.3vh;
  height: 22.3vh;
`;

const EmptyText = styled.span`
  font-size: 23px;
  margin-top: 7vh;
`;

const Iframe = styled.iframe`
  border-radius: 5px;
`;

const ReviewDiv = styled.div`
  margin-left: 10px;
  width: 31%;
`;

const InputContainer = styled.div`
  height: 15%;
  max-height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
  width: 96%;
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

const findLikedUser = (user, review) =>
  review.liked_users_id.findIndex(element => element === user.id) === -1
    ? false
    : true;

const DetailPresenter = ({
  result,
  loading,
  error,
  showVideos,
  reviews,
  user,
  onChangeReview,
  inputReviewValue,
  onReviewCancel,
  onSubmit
}) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      <BackDrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}{" "}
              년
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} 분
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            <Divider>•</Divider>
            <Item>평점 {result.vote_average} / 10.0</Item>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <Iframe
            id="ytplayer"
            type="text/html"
            width="100%"
            height="54%"
            src={`https://www.youtube.com/embed/${
              showVideos
                ? showVideos.results[0].key
                : result.videos.results[0].key
            }?origin=${result.homepage}&rel=0`}
            frameBorder="0"
            allowFullScreen="allowfullscreen"
          ></Iframe>
        </Data>
        <ReviewDiv>
          {reviews && reviews.length > 0 ? (
            reviews.map((review, index) => (
              <Review
                key={review.id}
                review={review}
                isLike={findLikedUser(user, review)}
                likeCount={review.liked_users_id.length}
              />
            ))
          ) : (
            <EmptyText>작성된 리뷰가 없습니다.</EmptyText>
          )}
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
        </ReviewDiv>
      </Content>
    </Container>
  );

export default DetailPresenter;
