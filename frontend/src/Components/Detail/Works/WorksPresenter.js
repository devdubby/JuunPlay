import React from "react";
import styled from "styled-components";
import Loader from "../../Loader";

const WorksContainer = styled.div`
  height: 91%;
  min-height: 91%;
  display: flex;
  justify-content: center;
  align-items: center;
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

const WorksItems = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Works = styled.div`
  width: 30%;
  height: 48%;
  background-color: yellow;
  margin: 5px;
  border-radius: 5px;
`;

const Image = styled.div`
  height: 45%;
  background-image: url(${props => props.img});
  background-size: cover;
`;

const WorksPresenter = ({ works, loading, error }) => {
  return loading ? (
    <LoaderContainer>
      <span role="img" aria-label="Loading">
        ⏰
      </span>
    </LoaderContainer>
  ) : (
    <WorksContainer>
      <ChevronContainer>
        <ChevronBtn>
          <ChevronIcon className="fas fa-chevron-left"></ChevronIcon>
        </ChevronBtn>
      </ChevronContainer>
      <WorksItems>
        {works.results
          .filter((works, index) => index < 6)
          .map(works => {
            return (
              <Works key={works.id}>
                <Image
                  img={`https://image.tmdb.org/t/p/w300${works.backdrop_path}`}
                />
                {works.title}
                {works.release_data}
                {works.vote_average}
                {works.overview}
              </Works>
            );
          })}
      </WorksItems>
      <ChevronContainer>
        <ChevronBtn>
          <ChevronIcon className="fas fa-chevron-right"></ChevronIcon>
        </ChevronBtn>
      </ChevronContainer>
    </WorksContainer>
  );
};

export default WorksPresenter;
