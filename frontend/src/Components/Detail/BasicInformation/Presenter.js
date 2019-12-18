import React from "react";
import styled from "styled-components";
import Message from "../../Message";

const Information = styled.div`
  width: 100%;
  height: 96%;
  min-height: 96%;
  display: flex;
`;

const Cover = styled.div`
  width: 34%;
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

const Presenter = ({
  result,
  videos,
  leftVideoActiveHandler,
  rightVideoActiveHandler,
  activeVideoIndex,
}) =>
  <Information>
    <Cover
      bgImage={
        result.poster_path
          ? `https://image.tmdb.org/t/p/original${result.poster_path}`
          : require("../../../assets/noPosterSmall.png")
      }
    />
    <Data>
      <Title>
        {result.title ? result.title : result.original_title}
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
          {result.runtime ? result.runtime : result.episode_run_time[0]}{" "}
          분
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
            videos && videos.length > 0 ? videos[activeVideoIndex].key : "NoVideos"
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
  </Information>

export default Presenter;
