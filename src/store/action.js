export const ActionType = {
  GET_ALL_MOVIES: `GET_ALL_MOVIES`,
  GET_COMMENTS: `GET_COMMENTS`,
  GET_ALL_MOVIES_AND_PROMO: `GET_ALL_MOVIES_AND_PROMO`,
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SEND_AUTHORIZATION: `SEND_AUTHORIZATION`,
  LOG_OUT: `LOG_OUT`,
  BLOCK_COMMENT_FORM: `BLOCK_COMMENT_FORM`,
  UNBLOCK_COMMENT_FORM: `UNBLOCK_COMMENT_FORM`,
  SET_ERROR_COMMENT_FORM: `SET_ERROR_COMMENT_FORM`,
  GET_FAVORITE_MOVIES: `GET_FAVORITE_MOVIES`,
  SET_FAVORITE_MOVIE: `SET_FAVORITE_MOVIE`,
  REMOVE_MOVIE_FROM_FAVORITES: `REMOVE_MOVIE_FROM_FAVORITES`
};

export const ActionCreator = {
  getAllMovies: (movies) => ({
    type: ActionType.GET_ALL_MOVIES,
    payload: movies
  }),
  getComments: (data) => ({
    type: ActionType.GET_COMMENTS,
    payload: data
  }),
  getAllMoviesAndPromo: (data) => ({
    type: ActionType.GET_ALL_MOVIES_AND_PROMO,
    payload: data
  }),
  requiredAuthorization: (data) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: data
  }),
  sendAuthorization: (response) => ({
    type: ActionType.SEND_AUTHORIZATION,
    payload: response
  }),
  logOut: (response) => ({
    type: ActionType.LOG_OUT,
    payload: response
  }),
  blockCommentForm: () => ({
    type: ActionType.BLOCK_COMMENT_FORM
  }),
  unBlockCommentForm: (comments) => ({
    type: ActionType.UNBLOCK_COMMENT_FORM,
    payload: comments
  }),
  setErrorCommentForm: () => ({
    type: ActionType.SET_ERROR_COMMENT_FORM
  }),
  getFavoriteMovies: (response) => ({
    type: ActionType.GET_FAVORITE_MOVIES,
    payload: response
  }),
  setFavoriteMovie: (response) => ({
    type: ActionType.SET_FAVORITE_MOVIE,
    payload: response
  }),
  removeMovieFromFavorites: (response) => ({
    type: ActionType.REMOVE_MOVIE_FROM_FAVORITES,
    payload: response
  })
};

