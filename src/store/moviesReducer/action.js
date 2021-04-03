export const ActionType = {
  GET_ALL_MOVIES: `GET_ALL_MOVIES`,
  GET_COMMENTS: `GET_COMMENTS`,
  GET_ALL_MOVIES_AND_PROMO: `GET_ALL_MOVIES_AND_PROMO`
};

export const getAllMovies = (movies) => ({
  type: ActionType.GET_ALL_MOVIES,
  payload: movies
});
export const getComments = (data) => ({
  type: ActionType.GET_COMMENTS,
  payload: data
});
export const getAllMoviesAndPromo = (data) => ({
  type: ActionType.GET_ALL_MOVIES_AND_PROMO,
  payload: data
});

