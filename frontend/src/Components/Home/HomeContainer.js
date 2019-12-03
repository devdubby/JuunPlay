import React, { Component } from "react";
import HomePresenter from "./HomePresenter";
import { connect } from 'react-redux';
import { getMoviesNowPlaying, getMoviesUpComing, getMoviesPopular } from "../../actions";

class HomeContainer extends Component {
  state = {
    nowPlaying: null,
    upcoming: null,
    popular: null,
    error: null,
    loading: true
  };

  async componentDidMount() {
    try {
      const {
        data: { results: nowPlaying }
      } = await getMoviesNowPlaying();
      const {
        data: { results: upcoming }
      } = await getMoviesUpComing();
      const {
        data: { results: popular }
      } = await getMoviesPopular();
      this.setState({
        nowPlaying,
        upcoming,
        popular
      });
    } catch {
      this.setState({
        error: "Can't find movie information."
      });
    } finally {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    const { nowPlaying, upcoming, popular, error, loading } = this.state;
    return (
      <HomePresenter
        nowPlaying={nowPlaying}
        upcoming={upcoming}
        popular={popular}
        error={error}
        loading={loading}
      />
    );
  }
}

const mapStateToProps = state => {
  return {}
};

export default connect(
  mapStateToProps, 
  {}
)(HomeContainer);