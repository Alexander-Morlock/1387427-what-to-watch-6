import React, {useState} from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../MovieCard/MovieCard';

const MovieList = (props) => {
  const [state, setState] = useState(0);
  const handleOnMouseOver = (evt) => {
    setState(evt.target.dataset.id);
  };

  return (
    <div className="catalog__movies-list" data-active={state}>
      {
        props.films.map((movie) => {
          return <MovieCard
            name={movie.name}
            id={movie.id}
            preview_image={movie.preview_image}
            key={movie.name + movie.id}
            onMouseOver={handleOnMouseOver}/>;
        })
      }
    </div>
  );
};

MovieList.propTypes = {
  films: PropTypes.arrayOf(
      PropTypes.shape({
        "name": PropTypes.string.isRequired,
        "preview_image": PropTypes.string.isRequired,
        "id": PropTypes.number.isRequired
      })
  ).isRequired
};

export default MovieList;
