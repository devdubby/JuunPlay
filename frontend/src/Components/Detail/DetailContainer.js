import React, { Component } from "react";
import { connect } from "react-redux";
import DetailPresenter from "./DetailPresenter";
import {
  getMovieDetail,
  getShowDetail,
  getShowVideos,
  getReviews,
  inputReview
} from "../../actions";

class DetailContainer extends Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname }
    } = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/"),
      showVideos: null,
      inputReviewValue: '',
      clickedIndex: 0,
      activeVideoIndex: 0,
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id }
      },
      history: { push },
      user: { jwtToken }
    } = this.props;

    // if(jwtToken === "") return this.props.history.push("/");

    const { isMovie } = this.state;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    let showVideos = null;

    try {
      if (isMovie) {
        ({ data: result } = await getMovieDetail(parsedId));
      } else {
        ({ data: result } = await getShowDetail(parsedId));
        ({ data: showVideos } = await getShowVideos(parsedId));
      }
    } catch {
      this.setState({ error: "Can't find anything." });
    } finally {
      this.setState({ loading: false, result, showVideos });
    }
    setTimeout(() => {
      this.setState({ isTest: 1 });
    }, 8000);
  }

  onChangeReview = event => {
    this.setState({ inputReviewValue: event.target.value });
  };

  onReviewCancel = () => {
    this.setState({ inputReviewValue: "" });
  };

  onSubmit = async () => {
    const { inputReviewValue } = this.state;
    const {
      user: { jwtToken },
      match: {
        params: { id }
      }
    } = this.props;
    
    if(!jwtToken) {
      return alert("먼저 로그인 해주세요");
    }
    
    await inputReview(inputReviewValue, parseInt(id), jwtToken);
    window.location.reload();
  };

  btnActiveHandler = (index) => {
    this.setState({ clickedIndex: index });
  };

  leftVideoActiveHandler = () => {
    const { activeVideoIndex, result } = this.state;
    if(activeVideoIndex - 1 === -1) {
      this.setState({ activeVideoIndex: result.videos.results.length - 1 });
      return;
    }
    this.setState({ activeVideoIndex: this.state.activeVideoIndex - 1 })
  }

  rightVideoActiveHandler = () => {
    const { activeVideoIndex, result } = this.state;
    if(activeVideoIndex + 1 === result.videos.results.length) {
      this.setState({  activeVideoIndex: 0});
      return;
    }
    this.setState({ activeVideoIndex: this.state.activeVideoIndex + 1 })
  }

  render() {
    const { result, error, loading, showVideos, inputReviewValue, clickedIndex, activeVideoIndex } = this.state;
    const { user } = this.props;
    console.log('Detail', this.state);
    return (
      <DetailPresenter
        result={result}
        error={error}
        loading={loading}
        showVideos={showVideos}
        user={user}
        onChangeReview={this.onChangeReview}
        inputReviewValue={inputReviewValue}
        onReviewCancel={this.onReviewCancel}
        onSubmit={this.onSubmit}
        btnActiveHandler={this.btnActiveHandler}
        clickedIndex={clickedIndex}
        leftVideoActiveHandler={this.leftVideoActiveHandler}
        rightVideoActiveHandler={this.rightVideoActiveHandler}
        activeVideoIndex={activeVideoIndex}
      />
    );
  }
}

const mapStateToProps = state => {
  const { auth } = state;
  return {
    user: auth
  }
};

export default connect(
  mapStateToProps, 
  {}
)(DetailContainer);