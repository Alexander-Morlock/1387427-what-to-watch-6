import PropTypes from 'prop-types';
const shapeOfUser = () => {
  return PropTypes.shape({
    "id": PropTypes.number,
    "email": PropTypes.string,
    "name": PropTypes.string,
    "avatar_url": PropTypes.string});
};

export default shapeOfUser;
