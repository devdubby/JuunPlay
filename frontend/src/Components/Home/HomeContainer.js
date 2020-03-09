import React, { useState, useEffect, useCallback } from "react";
import HomePresenter from "./HomePresenter";
import { useSelector } from "react-redux";
import {
  getMoviesNowPlaying,
  getMoviesUpComing,
  getMoviesPopular
} from "../../actions";

function HomeContainer() {
  const [state, setState] = useState({
    nowPlaying: [],
    upcoming: [],
    popular: [],
    error: null,
    loading: true
  });
  const { nowPlaying, upcoming, popular, error, loading } = state;
  const jwtToken = useSelector(state => state.auth.jwtToken);

  const callApi = useCallback(async () => {
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
      setState({
        nowPlaying,
        upcoming,
        popular
      });
    } catch {
      setState({
        error: "Can't find movie information."
      });
    } finally {
      setState(state => ({
        ...state,
        loading: false
      }));
    }
  }, []);

  useEffect(() => {
    callApi();
  }, [callApi]);

  return (
    <HomePresenter
      nowPlaying={nowPlaying}
      upcoming={upcoming}
      popular={popular}
      error={error}
      loading={loading}
      jwtToken={jwtToken}
    />
  );
};

export default HomeContainer;
