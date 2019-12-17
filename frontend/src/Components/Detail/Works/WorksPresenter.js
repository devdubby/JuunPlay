import React from "react";
import styled from "styled-components";
import Loader from "../../Loader";
import Works from "./Works";

const WorksContainer = styled.div`
  height: 96%;
  min-height: 96%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoaderContainer = styled.div`
  height: 96%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
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
  justify-content: center;
`;

const genresObj = [
  { id: 28, name: "액션" },
  { id: 12, name: "모험" },
  { id: 16, name: "애니메이션" },
  { id: 35, name: "코미디" },
  { id: 80, name: "범죄" },
  { id: 99, name: "다큐멘터리" },
  { id: 18, name: "드라마" },
  { id: 10751, name: "가족" },
  { id: 14, name: "판타지" },
  { id: 36, name: "역사" },
  { id: 27, name: "공포" },
  { id: 10402, name: "음악" },
  { id: 9648, name: "미스터리" },
  { id: 10749, name: "로맨스" },
  { id: 878, name: "SF" },
  { id: 10770, name: "TV 영화" },
  { id: 53, name: "스릴러" },
  { id: 10752, name: "전쟁" },
  { id: 37, name: "서부" }
];

const findGenres = (genre_ids) => {
  const genres = genresObj.filter((genre, index) => genre_ids.includes(genre.id)).filter((element, index) => index < 3);
  return genres;
}

const WorksPresenter = ({ isMovie, works, loading, error, chevronBtnHandler, similarWorksPage }) => {
  return loading ? (
    <LoaderContainer>
      <span role="img" aria-label="Loading">
        ⏰
      </span>
    </LoaderContainer>
  ) : (
    <WorksContainer>
      <ChevronContainer>
        <ChevronBtn onClick={() => chevronBtnHandler("left")}>
          <ChevronIcon className="fas fa-chevron-left"></ChevronIcon>
        </ChevronBtn>
      </ChevronContainer>
      <WorksItems>
        {works.results
          .filter((works, index) => index >= (similarWorksPage - 1) * 6 && index < similarWorksPage * 6)
          .map(works => {
            return (
              <Works
                key={works.id}
                isMovie={isMovie}
                id={works.id}
                key={works.id}
                backdropPath={works.backdrop_path}
                title={works.title}
                releaseDate={works.release_date}
                voteAverage={works.vote_average}
                overview={works.overview}
                genres={findGenres(works.genre_ids)}
              />
            );
          })}
      </WorksItems>
      <ChevronContainer>
        <ChevronBtn onClick={() => chevronBtnHandler("right")}>
          <ChevronIcon className="fas fa-chevron-right"></ChevronIcon>
        </ChevronBtn>
      </ChevronContainer>
    </WorksContainer>
  );
};

export default WorksPresenter;
