import React, {useState, memo} from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../MovieCard/MovieCard';
import ShowMoreButton from './ShowMoreButton';

const INCREASE_STEP = 8;

const collectMoviesId = (movieList) => movieList.map((m) => m.id).sort((a, b) => b - a);

const checkIfArraysAreEqual = (arr1, arr2) => arr1.length === arr2.length && arr1.every((e, index) => e === arr2[index]);

const MovieList = (props) => {
  const [maxNumberOfMoviesToShow, setMaxNumberOfMoviesToShow] = useState(INCREASE_STEP);

  const increaseNumberOfMovies = () => setMaxNumberOfMoviesToShow((prevState) => prevState + INCREASE_STEP);

  return (
    <>
      <div className="catalog__movies-list">
        {
          props.movies.slice(0, maxNumberOfMoviesToShow).map((movie) => <MovieCard
            name={movie.name}
            id={movie.id}
            preview_image={movie.preview_image}
            key={movie.name + movie.id}
            preview_video_link={movie.preview_video_link}
            poster_image={movie.poster_image}
            removeMovieFromFavorites={props.removeMovieFromFavorites} />
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
  "movies": PropTypes.arrayOf(
      PropTypes.shape({
        "name": PropTypes.string.isRequired,
        "preview_image": PropTypes.string.isRequired,
        "id": PropTypes.number.isRequired,
        "onMouseOver": PropTypes.func,
        "preview_video_link": PropTypes.string.isRequired,
        "poster_image": PropTypes.string.isRequired
      })
  ).isRequired,
  "removeMovieFromFavorites": PropTypes.func
};

export default memo(MovieList, (prevProps, nextProps) => {
  return checkIfArraysAreEqual(
      collectMoviesId(prevProps.movies),
      collectMoviesId(nextProps.movies)
  );
});
