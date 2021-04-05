export const ActionType = {
  GET_FAVORITE_MOVIES: `GET_FAVORITE_MOVIES`,
  SET_FAVORITE_MOVIE: `SET_FAVORITE_MOVIE`,
  REMOVE_MOVIE_FROM_FAVORITES: `REMOVE_MOVIE_FROM_FAVORITES`
};

export const getFavoriteMovies = (response) => ({
  type: ActionType.GET_FAVORITE_MOVIES,
  payload: response
});
export const setFavoriteMovie = (response) => ({
  type: ActionType.SET_FAVORITE_MOVIE,
  payload: response
});
export const removeMovieFromFavorites = (response) => ({
  type: ActionType.REMOVE_MOVIE_FROM_FAVORITES,
  payload: response
});

