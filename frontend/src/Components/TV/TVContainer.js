import React, { useState, useEffect, useCallback } from "react";
import TVPresenter from "./TVPresenter";
import { getShowsTopRated, getShowsPopular, getShowsAiringToday } from "../../actions";

function TVContainer() {
  const [state, setState] = useState({
    topRated: [],
    popular: [],
    airingToday: [],
    loading: true,
    error: null
  });
  const { topRated, popular, airingToday, loading, error } = state;

  const callApi = useCallback(async () => {
    try {
      const {
        data: { results: topRated }
      } = await getShowsTopRated();
      const {
        data: { results: popular }
      } = await getShowsPopular();
      const {
        data: { results: airingToday }
      } = await getShowsAiringToday();
      setState({ topRated, popular, airingToday });
    } catch {
      setState({
        error: "Can't find TV information."
      });
    } finally {
      setState(state => ({ ...state, loading: false }));
    }
  }, []);

  useEffect(() => {
    callApi();
  }, [callApi]);

  return (
    <TVPresenter
      topRated={topRated}
      popular={popular}
      airingToday={airingToday}
      loading={loading}
      error={error}
    />
  );
};

export default TVContainer;