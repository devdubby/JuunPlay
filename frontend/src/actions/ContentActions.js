import { theMovieApi, api } from "../api";

export const getMoviesNowPlaying = async () => {
  return await theMovieApi.get("movie/now_playing");
};

export const getMoviesUpComing = async () => {
  return await theMovieApi.get("movie/upcoming");
};

export const getMoviesPopular = async () => {
  return await theMovieApi.get("movie/popular");
};

export const getMovieDetail = async id => {
  return await theMovieApi.get(`movie/${id}`, {
    params: {
      append_to_response: "videos"
    }
  });
};

export const getMovieSearch = async term => {
  return await theMovieApi.get("search/movie", {
    params: {
      query: encodeURIComponent(term)
    }
  });
};

export const getShowsTopRated = async () => {
  return await theMovieApi.get("tv/top_rated");
};

export const getShowsPopular = async () => {
  return await theMovieApi.get("tv/popular");
};

export const getShowsAiringToday = async () => {
  return await theMovieApi.get("tv/airing_today");
};

export const getShowDetail = async id => {
  return await theMovieApi.get(`tv/${id}`, {
    params: {
      append_to_response: "videos"
    }
  });
};

export const getShowVideos = async id => {
  return await theMovieApi.get(`tv/${id}/videos`, {
    params: {
      language: "en-US"
    }
  });
};

export const getShowSearch = async term => {
  return await theMovieApi.get("search/tv", {
    params: {
      query: encodeURIComponent(term)
    }
  });
};

export const getReviews = (contentID, jwtToken) =>
  api.get(`/api/review?id=${contentID}`, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "x-access-token",
      "x-access-token": jwtToken
    }
  })
  .then(res => res.data)
  .catch(err => err.response.data);

export const inputReview = (reviewData, contentID, jwtToken) =>
  api.post(
      `/api/review/register?id=${contentID}`,
      { reviewData },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "x-access-token",
          "x-access-token": jwtToken
        }
      }
    )
    .then(res => res.data)
    .catch(err => err.response.data);

export const deleteReview = () => {
  api
    .post("/api/review/delete")
    .then(res => res.data)
    .catch(err => err.response.data);
};

export const likeReview = (id, jwtToken) => {
  api.put(`/api/review/like?id=${id}`, {}, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "x-access-token",
      "x-access-token": jwtToken
    }
  })
  .then(res => res.data)
  .catch(err => err.response.data);
};

export const unLikeReview = (id, jwtToken) => {
  api.put(`api/review/like/undo?id=${id}`, {}, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "x-access-token",
      "x-access-token": jwtToken
    }
  })
  .then(res => res.data)
  .catch(err => err.response.data);
};
