import PropTypes from 'prop-types';

export const shapeOfUser = PropTypes.shape({
  "id": PropTypes.number,
  "email": PropTypes.string,
  "name": PropTypes.string,
  "avatar_url": PropTypes.string
});
