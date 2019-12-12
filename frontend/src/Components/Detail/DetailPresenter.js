import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../Loader";
import Review from "./Review";
import Works from "./Works";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
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
  width: 79%;
  height: 80%;
  margin-top: 2%;
  z-index: 1;
`;

const Information = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
`;

const Cover = styled.div`
  width: 32%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 66%;
  margin-left: 25px;
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
  font-size: 15px;
  opacity: 0.7;
  line-height: 1.5;
  margin-bottom: 10px;
  height: 30%;
`;

const VideoContainer = styled.div`
  width: 100%;
  height: 51%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChevronContainer = styled.div`
  height: 50%;
  width: 10%;
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

const Iframe = styled.iframe`
  border-radius: 5px;
`;

const BtnContainer = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  height: 71%;
  font-size: 17px;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  margin: 0px 16px;
  border-bottom: 3px solid
    ${props => (props.clicked ? "#3498db" : "transparent")};
  transition: border-bottom 0.5s ease-in-out;
`;

const ReviewContainer = styled.div`
  margin-left: 10px;
  width: 100%;
  height: 91%;
  min-height: 91%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const btnArray = ["기본정보", "리뷰", "관련작품"];

const DetailPresenter = ({
  result,
  loading,
  error,
  showVideos,
  user,
  btnActiveHandler,
  tabIndex,
  leftVideoActiveHandler,
  rightVideoActiveHandler,
  activeVideoIndex,
}) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      <BackDrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        {tabIndex === 0 && <Information>
          <Cover
            bgImage={
              result.poster_path
                ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                : require("../../assets/noPosterSmall.png")
            }
          />
          <Data>
            <Title>{result.title ? result.title : result.original_title}</Title>
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
            <VideoContainer>
              <ChevronContainer>
                <ChevronBtn onClick={leftVideoActiveHandler}>
                  <ChevronIcon className="fas fa-chevron-left"></ChevronIcon>
                </ChevronBtn>
              </ChevronContainer>
              <Iframe
                id="ytplayer"
                type="text/html"
                width="65%"
                height="100%"
                src={`https://www.youtube.com/embed/${
                  result.videos.results && result.videos.results.length > 0
                    ? result.videos.results[activeVideoIndex].key
                    : showVideos && showVideos.results.length > 0
                    ? showVideos.results[activeVideoIndex].key
                    : "NoVideos"
                }?origin=${result.homepage}&rel=0`}
                frameBorder="0"
                allowFullScreen="allowfullscreen"
              />
              <ChevronContainer>
                <ChevronBtn onClick={rightVideoActiveHandler}>
                  <ChevronIcon className="fas fa-chevron-right"></ChevronIcon>
                </ChevronBtn>
              </ChevronContainer>
            </VideoContainer>
          </Data>
        </Information>}
        {tabIndex === 1 && <Review />}
        <BtnContainer>
          {btnArray.map((btn, index) => {
            return (
              <FooterButton
                key={btn + index}
                clicked={tabIndex === index}
                onClick={() => btnActiveHandler(index)}
              >
                {btn}
              </FooterButton>
            );
          })}
        </BtnContainer>
      </Content>
    </Container>
  );

export default DetailPresenter;
