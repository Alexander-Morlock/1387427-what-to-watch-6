import PropTypes from 'prop-types';

export const shapeOfMovie = PropTypes.shape({
  "name": PropTypes.string,
  "posterImage": PropTypes.string,
  "previewImage": PropTypes.string.isRequired,
  "backgroundImage": PropTypes.string,
  "backgroundColor": PropTypes.string,
  "description": PropTypes.string,
  "rating": PropTypes.number,
  "scoresCount": PropTypes.number,
  "director": PropTypes.string,
  "starring": PropTypes.arrayOf(PropTypes.string),
  "runTime": PropTypes.number,
  "genre": PropTypes.string,
  "released": PropTypes.number,
  "id": PropTypes.number,
  "isFavorite": PropTypes.bool,
  "videoLink": PropTypes.string,
  "previewVideoLink": PropTypes.string
});

