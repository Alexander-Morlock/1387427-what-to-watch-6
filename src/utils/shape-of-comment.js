import PropTypes from 'prop-types';

export const shapeOfComment = PropTypes.shape({
  "id": PropTypes.number.isRequired,
  "user": PropTypes.shape(
      {
        "id": PropTypes.number.isRequired,
        "name": PropTypes.string.isRequired
      }
  ).isRequired,
  "rating": PropTypes.number.isRequired,
  "comment": PropTypes.string.isRequired,
  "date": PropTypes.string.isRequired
});

