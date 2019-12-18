import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
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

const btnArray = ["기본정보", "상세정보", "비슷한 작품"];

class DetailContainer extends Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname }
    } = props;
    this.state = {
      result: null,
      videos: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/"),
      paramsID: props.match.params.id,
      tabIndex: 0,
      activeVideoIndex: 0
    };
  }

  componentDidMount() {
    const { paramsID } = this.state;
    this.callApi(paramsID);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      match: {
        params: { id: prevParamsID }
      }
    } = prevProps;
    const {
      match: {
        params: { id }
      }
    } = this.props;
    if (prevParamsID !== id) {
      this.callApi(id);
    }
  }

  callApi = async id => {
    const {
      history: { push }
    } = this.props;

    const { isMovie } = this.state;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    let videos = null;

    try {
      if (isMovie) {
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
      this.setState({ error: "데이터를 찾을 수 없습니다." });
    } finally {
      this.setState({ loading: false, result, videos, tabIndex: 0 });
    }
  };

  btnActiveHandler = index => {
    this.setState({ tabIndex: index });
  };

  leftVideoActiveHandler = () => {
    const { activeVideoIndex, videos } = this.state;
    if (activeVideoIndex - 1 === -1) {
      this.setState({ activeVideoIndex: videos.length - 1 });
      return;
    }
    this.setState({ activeVideoIndex: this.state.activeVideoIndex - 1 });
  };

  rightVideoActiveHandler = () => {
    const { activeVideoIndex, videos } = this.state;
    if (activeVideoIndex + 1 === videos.length) {
      this.setState({ activeVideoIndex: 0 });
      return;
    }
    this.setState({ activeVideoIndex: this.state.activeVideoIndex + 1 });
  };

  renderComponent = () => {
    const {
      result,
      videos,
      tabIndex,
      activeVideoIndex,
      isMovie,
    } = this.state;
    switch (tabIndex) {
      case 0:
        return (
          <BasicInformation
            result={result}
            videos={videos}
            leftVideoActiveHandler={this.leftVideoActiveHandler}
            rightVideoActiveHandler={this.rightVideoActiveHandler}
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
  };

  render() {
    const { result, tabIndex, loading, error } = this.state;
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
              {this.renderComponent()}
              <BtnContainer>
                {btnArray.map((btn, index) => {
                  return (
                    <FooterButton
                      key={btn + index}
                      clicked={tabIndex === index}
                      onClick={() => this.btnActiveHandler(index)}
                    >
                      {btn}
                    </FooterButton>
                  );
                })}
              </BtnContainer>
            </Content>
          </>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { auth } = state;
  return {
    user: auth
  };
};

export default connect(mapStateToProps, {})(DetailContainer);
