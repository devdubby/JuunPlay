import React, { useState, useCallback } from "react";
import SearchPresenter from "./SearchPresenter";
import { getMovieSearch, getShowSearch } from "../../actions";

function SearchContainer() {
  const [state, setState] = useState({
    movieResults: [],
    tvResults: [],
    searchTerm: "",
    loading: false,
    error: null
  });
  const { movieResults, tvResults, searchTerm, loading, error } = state;
  
  const searchByTerm = useCallback(async (searchValue) => {
    setState(state => ({ ...state , loading: true }));
    try {
      const {
        data: { results: movieResults }
      } = await getMovieSearch(searchValue);
      const {
        data: { results: tvResults }
      } = await getShowSearch(searchValue);
      setState(state => ({
        ...state,
        movieResults,
        tvResults
      }));
    } catch {
      setState({ error: "Can't find results." });
    } finally {
      setState(state => ({ ...state, loading: false }));
    }
  }, []);

  const handleSubmit = useCallback(event => {
    event.preventDefault();
    if (searchTerm !== "") {
      searchByTerm(searchTerm);
    }
  },[searchByTerm, searchTerm]);

  const onChange = useCallback(event => {
    const { target: { value } } = event;
    setState(state => ({ ...state, searchTerm: value }));
  }, []);

  return (
    <SearchPresenter
      movieResults={movieResults}
      tvResults={tvResults}
      loading={loading}
      error={error}
      searchTerm={searchTerm}
      handleSubmit={handleSubmit}
      onChange={onChange}
    />
  );
};

export default SearchContainer;