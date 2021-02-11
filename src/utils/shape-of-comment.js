import PropTypes from 'prop-types';
const shapeOfComment = () => {
  return PropTypes.shape(
      {
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
      }
  );
};

export default shapeOfComment;
