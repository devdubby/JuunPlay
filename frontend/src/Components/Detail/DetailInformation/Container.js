import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Presenter from './Presenter';
import Loader from '../../Loader';
import {
  getReviews,
  inputReview,
  getMovieCredits,
  getShowCredits,
  getCollections,
} from '../../../actions';

let timeID = null;

function Container({ location, match, collectionsID, title, voteCount, voteAverage }) {
  const [state, setState] = useState({
    reviews: null,
    credits: null,
    loading: true,
    reviewPage: 1,
    inputReviewValue: '',
    cast: null,
    crew: null,
    collections: null,
    isScrollEvent: true,
  });
  const {
    reviews,
    loading,
    reviewPage,
    inputReviewValue,
    credits,
    collections,
    isScrollEvent,
    error,
  } = state;
  const user = useSelector(state => state.auth);
  const { jwtToken, id: userId } = user;

  const callApi = useCallback(async () => {
    const parsedId = parseInt(match.params.id);
    try {
      const { data: reviews } = await getReviews(parsedId, jwtToken);
      const collections = collectionsID && (await getCollections(collectionsID));
      const data = location.pathname.includes('/movie/')
        ? await getMovieCredits(parsedId)
        : await getShowCredits(parsedId);
      const cast = data.cast.filter((cast, index) => index < 7);
      const crew = data.crew.filter(crew => crew.job === 'Director');

      setState(state => ({ ...state, reviews, credits: { cast, crew }, collections }));
    } catch {
      setState(state => ({ ...state, error: '데이터를 찾을 수 없습니다.' }));
    } finally {
      setState(state => ({ ...state, loading: false }));
      setTimeout(() => {
        setState(state => ({ ...state, isScrollEvent: false }));
      }, 1500);
    }
  }, [collectionsID, match.params.id, location.pathname, jwtToken]);

  useEffect(() => {
    callApi();
  }, [callApi]);

  const findLikedUser = useCallback(
    liked_users_id => {
      return liked_users_id.findIndex(element => element === userId) === -1 ? false : true;
    },
    [userId]
  );

  const reviewPageHandler = useCallback(
    direction => {
      if (reviewPage - 1 !== 0 && direction === 'left') {
        setState({ ...state, reviewPage: reviewPage - 1 });
      } else if (reviews.length - 6 * reviewPage > 0 && direction === 'right') {
        setState({ ...state, reviewPage: reviewPage + 1 });
      }
    },
    [state, reviews, reviewPage]
  );

  const onChangeReview = useCallback(
    event => {
      setState({ ...state, inputReviewValue: event.target.value });
    },
    [state]
  );

  const onReviewCancel = useCallback(() => {
    setState({ ...state, inputReviewValue: '' });
  }, [state]);

  const onSubmit = useCallback(async () => {
    if (!jwtToken) {
      return alert('먼저 로그인 해주세요');
    }

    try {
      await inputReview(inputReviewValue, parseInt(match.params.id), jwtToken);
      const { data: reviews } = await getReviews(parseInt(match.params.id), jwtToken);
      setState({ ...state, reviews, inputReviewValue: '' });
    } catch {
      setState({ ...state, error: '데이터를 찾을 수 없습니다.' });
    }
  }, [state, inputReviewValue, match.params.id, jwtToken]);

  const handleScroll = useCallback(() => {
    clearTimeout(timeID);
    if (!isScrollEvent) {
      setState({ ...state, isScrollEvent: true });
    }
    timeID = setTimeout(() => {
      setState({ ...state, isScrollEvent: false });
    }, 1500);
  }, [state, isScrollEvent]);

  return loading ? (
    <Loader />
  ) : (
    <Presenter
      credits={credits}
      user={user}
      reviews={reviews}
      error={error}
      findLikedUser={findLikedUser}
      reviewPageHandler={reviewPageHandler}
      reviewPage={reviewPage}
      onChangeReview={onChangeReview}
      onReviewCancel={onReviewCancel}
      onSubmit={onSubmit}
      inputReviewValue={inputReviewValue}
      collections={collections}
      title={title}
      voteCount={voteCount}
      voteAverage={voteAverage}
      handleScroll={handleScroll}
      isScrollEvent={isScrollEvent}
      isMovie={location.pathname.includes('/movie/')}
    />
  );
}

export default withRouter(Container);
