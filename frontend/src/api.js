import axios from "axios";
import { MOVIE_API_KEY } from "./config/keys";

export const theMovieApi = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: MOVIE_API_KEY,
    language: "ko-KR"
  }
});

export const api = axios.create({
  baseURL: "http://localhost:8080/",
});