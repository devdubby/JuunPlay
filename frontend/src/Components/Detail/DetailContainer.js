import React, { Component } from "react";
import { connect } from "react-redux";
import DetailPresenter from "./DetailPresenter";
import {
  getMovieDetail,
  getShowDetail,
  getShowVideos,
  getReviews,
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
      paramsID: props.match.params.id,
      showVideos: null,
      tabIndex: 0,
      activeVideoIndex: 0,
    };
  }

  componentDidMount() {
    const { paramsID } = this.state;
    this.callApi(paramsID);
  };

  componentDidUpdate(prevProps, prevState) {
    const { match: { params: { id: prevParamsID } } } = prevProps;
    const { match: { params: { id } } } = this.props;
    if(prevParamsID !== id) {
      this.callApi(id);
    }
  }

  callApi = async (id) => {
    const {
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
      this.setState({ loading: false, result, showVideos, tabIndex: 0 });
    }
  }

  btnActiveHandler = (index) => {
    this.setState({ tabIndex: index });
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
    const { result, error, loading, showVideos, tabIndex, activeVideoIndex } = this.state;
    const { user } = this.props;
    console.log('Detail', this.state);
    return (
      <DetailPresenter
        result={result}
        error={error}
        loading={loading}
        showVideos={showVideos}
        user={user}
        btnActiveHandler={this.btnActiveHandler}
        tabIndex={tabIndex}
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