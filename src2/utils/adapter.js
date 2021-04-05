export const adaptMovieFromServer = ({
  poster_image: posterImage,
  preview_image: previewImage,
  background_image: backgroundImage,
  background_color: backgroundColor,
  scores_count: scoresCount,
  run_time: runTime,
  is_favorite: isFavorite,
  video_link: videoLink,
  preview_video_link: previewVideoLink,
  ...rest
}) => ({
  ...rest,
  posterImage,
  previewImage,
  backgroundImage,
  backgroundColor,
  scoresCount,
  runTime,
  isFavorite,
  videoLink,
  previewVideoLink
});

export const adaptMoviesFromServer = (movies) => movies.map((m) =>adaptMovieFromServer(m));

const adaptUserFromServer = ({avatar_url: avatarUrl = ``, ...rest}) => ({...rest, avatarUrl});

export const adaptUserResponseFromServer = ({data = {}, ...rest}) => ({...rest, data: adaptUserFromServer(data)});
