import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled(Link)`
  width: 28%;
  height: 48%;
  max-height: 48%;
  margin: 9px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;

const Image = styled.div`
  width: 100%;
  height: 52%;
  background-image: url(${props => props.img});
  background-size: cover;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const TextContainer = styled.div`
  width: 100%;
  height: 48%;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const Title = styled.span`
  font-size: 21px;
  padding: 5px;
`;

const Information = styled.div`
  display: flex;
`;

const Data = styled.div`
  font-size: 15px;
  padding: 5px;
`;

const Overview = styled.span`
  font-size: 14px;
  padding: 5px;
  height: 53%;
  max-height: 53%;
  overflow: hidden;
  line-height: 17px;
`;

const Works = ({
  isMovie,
  id,
  backdropPath,
  title,
  releaseDate,
  voteAverage,
  overview,
  genres
}) => {
  return (
    <Container to={isMovie ? `/movie/${id}` : `/show/${id}`}>
      <Image
        img={
          backdropPath
            ? `https://image.tmdb.org/t/p/w300${backdropPath}`
            : require("../../../assets/noPosterSmall.png")
        }
      />
      <TextContainer>
        <Title>{title}</Title>
        <Information>
          <Data>
            {genres &&
              genres.length > 0 &&
              genres.map((genre, index) =>
                index === genres.length - 1 ? genre.name : `${genre.name} / `
              )}
          </Data>
          <Data>⭐️ {voteAverage}/10</Data>
        </Information>
        <Overview>{overview.substring(0, 90)}...</Overview>
      </TextContainer>
    </Container>
  );
};

export default Works;
