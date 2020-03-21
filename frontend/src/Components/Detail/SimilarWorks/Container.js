import React, { useState, useCallback, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { getMovieSimilar, getShowSimilar } from "../../../actions";
import Presenter from "./Presenter";
import Loader from "../../Loader";

function Container ({ location, match }) {
  const [state, setState] = useState({
    works: null,
    isMovie: location.pathname.includes("/movie/"),
    loading: true,
    error: null,
    similarWorksPage: 1
  });
  const { isMovie, works, loading, error, similarWorksPage } = state;

  const getSimilarWorks = useCallback(async () => {
    try {
      const works = isMovie
        ? await getMovieSimilar(match.params.id)
        : await getShowSimilar(match.params.id);
      setState(state => ({ ...state, works }));
    } catch {
      setState(state => ({ ...state, error: "Can't find anything." }));
    } finally {
      setState(state => ({ ...state, loading: false }));
    }
  }, [isMovie, match.params.id]);

  useEffect(() => {
    getSimilarWorks();
  }, [getSimilarWorks]);

  const chevronBtnHandler = useCallback(direction => {
    if (direction === "left" && similarWorksPage - 1 !== 0) {
      setState({ ...state, similarWorksPage: similarWorksPage - 1 });
    } else if (
      works.results.length - 6 * similarWorksPage > 0 &&
      direction === "right"
    ) {
      setState({ ...state, similarWorksPage: similarWorksPage + 1 });
    }
  }, [state, similarWorksPage, works]);


  return loading ? (
    <Loader />
  ) : (
    <Presenter
      isMovie={isMovie}
      works={works}
      error={error}
      chevronBtnHandler={chevronBtnHandler}
      similarWorksPage={similarWorksPage}
    />
  );
}

export default withRouter(Container);
