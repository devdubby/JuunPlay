import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import BasicInformation from "./BasicInformation";
import DetailInformation from "./DetailInformation";
import SimilarWorks from "./SimilarWorks";
import Loader from "../Loader";
import Message from "../Message";
import { getMovieDetail, getShowDetail, getShowVideos } from "../../actions";

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
  width: 81%;
  height: 82%;
  margin-top: 2%;
  z-index: 1;
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

function DetailContainer({ history, location, match }) {
  const [state, setState] = useState({
    result: null,
    videos: null,
    error: null,
    loading: true,
    tabIndex: 0,
    activeVideoIndex: 0
  });
  
  const { result, loading, error, activeVideoIndex, videos, tabIndex } = state;

  const callApi = useCallback(async id => {
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return history.push("/");
    }
    let result = null;
    let videos = null;

    try {
      if (location.pathname.includes("/movie/")) {
        ({
          data: result,
          data: {
            videos: { results: videos }
          }
        } = await getMovieDetail(parsedId));
      } else {
        ({ data: result } = await getShowDetail(parsedId));
        ({
          data: { results: videos }
        } = await getShowVideos(parsedId));
      }
    } catch {
      setState(state => ({ ...state, error: "데이터를 찾을 수 없습니다." }));
    } finally {
      setState(state => ({ ...state, loading: false, result, videos, tabIndex: 0 }));
    }
  }, [history, location.pathname]);

  useEffect(() => {
    callApi(match.params.id);
  }, [callApi, match.params.id]);

  const btnActiveHandler = useCallback(index => {
    setState({ ...state, tabIndex: index });
  }, [state]);

  const leftVideoActiveHandler = useCallback(() => {
    if (activeVideoIndex - 1 === -1) {
      setState({ ...state, activeVideoIndex: videos.length - 1 });
      return;
    }
    setState({ ...state, activeVideoIndex: activeVideoIndex - 1 });
  }, [state, activeVideoIndex, videos]);

  const rightVideoActiveHandler = useCallback(() => {
    if (activeVideoIndex + 1 === videos.length) {
      setState({ ...state, activeVideoIndex: 0 });
      return;
    }
    setState({ ...state, activeVideoIndex: activeVideoIndex + 1 });
  }, [state, activeVideoIndex, videos]);

  const renderComponent = useCallback(() => {
    switch (tabIndex) {
      case 0:
        return (
          <BasicInformation
            result={result}
            videos={videos}
            leftVideoActiveHandler={leftVideoActiveHandler}
            rightVideoActiveHandler={rightVideoActiveHandler}
            activeVideoIndex={activeVideoIndex}
          />
        );
      case 1:
        return (
          <DetailInformation
            title={result.title}
            voteAverage={result.vote_average}
            voteCount={result.vote_count}
            collectionsID={
              result.belongs_to_collection && result.belongs_to_collection.id
            }
          />
        );
      case 2:
        return <SimilarWorks />;
      default:
        break;
    }
  }, [result, videos, tabIndex, activeVideoIndex, leftVideoActiveHandler,rightVideoActiveHandler]);

  const renderBtnContainer = useCallback(() => {
    const btnArray = ["기본정보", "상세정보", "비슷한 작품"];

    return (
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
    );
  }, [tabIndex, btnActiveHandler]);

  return loading ? (
    <Loader />
  ) : (
    <Container>
      {error ? (
        <Message color="#ffffff" text={error} />
      ) : (
        <>
          <BackDrop
            bgImage={
              result && result.backdrop_path
                ? `https://image.tmdb.org/t/p/original${result.backdrop_path}`
                : require("../../assets/noBackgroundImg.jpg")
            }
          />
          <Content>
            {renderComponent()}
            {renderBtnContainer()}
          </Content>
        </>
      )}
    </Container>
  );
}

export default DetailContainer;
