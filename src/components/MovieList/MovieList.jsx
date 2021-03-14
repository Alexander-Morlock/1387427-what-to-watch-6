import React, {useState} from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../MovieCard/MovieCard';
import ShowMoreButton from './ShowMoreButton';

const INCREASE_STEP = 8;

const MovieList = (props) => {
  const [activeFilmState, setActiveFilmState] = useState(0);
  const [maxNumberOfMoviesToShow, setMaxNumberOfMoviesToShow] = useState(8);

  const increaseNumberOfMovies = () => setMaxNumberOfMoviesToShow((prevState) => prevState + INCREASE_STEP);

  const handleOnMouseOver = (evt) => {
    setActiveFilmState(evt.target.dataset.id);
  };

  return (
    <>
      <div className="catalog__movies-list" data-active={activeFilmState}>
        {
          props.movies.slice(0, maxNumberOfMoviesToShow).map((movie) => <MovieCard
            name={movie.name}
            id={movie.id}
            preview_image={movie.preview_image}
            key={movie.name + movie.id}
            onMouseOver={handleOnMouseOver}
            preview_video_link={movie.preview_video_link}
            poster_image={movie.poster_image} />
          )
        }
      </div>
      {
        maxNumberOfMoviesToShow < props.movies.length
          && <ShowMoreButton onClick={increaseNumberOfMovies}/>
      }
    </>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        "name": PropTypes.string.isRequired,
        "preview_image": PropTypes.string.isRequired,
        "id": PropTypes.number.isRequired,
        "onMouseOver": PropTypes.func,
        "preview_video_link": PropTypes.string.isRequired,
        "poster_image": PropTypes.string.isRequired
      })
  ).isRequired
};

export default MovieList;
