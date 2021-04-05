import React, {useState, memo} from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../movie-card/movie-card';
import ShowMoreButton from './show-more-button';

const INCREASE_STEP = 8;

const collectMoviesId = (movieList) => movieList.map((m) => m.id).sort((a, b) => b - a);

const checkIfArraysAreEqual = (arr1, arr2) => arr1.length === arr2.length && arr1.every((e, index) => e === arr2[index]);

const MovieList = ({movies, removeMovieFromFavorites}) => {

  const [maxNumberOfMoviesToShow, setMaxNumberOfMoviesToShow] = useState(INCREASE_STEP);

  const increaseNumberOfMovies = () => setMaxNumberOfMoviesToShow((prevState) => prevState + INCREASE_STEP);

  return (
    <>
      <div className="catalog__movies-list">
        {
          movies.slice(0, maxNumberOfMoviesToShow).map((movie) => <MovieCard
            name={movie.name}
            id={movie.id}
            previewImage={movie.previewImage}
            key={movie.name + movie.id}
            previewVideoLink={movie.previewVideoLink}
            posterImage={movie.posterImage}
            removeMovieFromFavorites={removeMovieFromFavorites} />
          )
        }
      </div>
      {
        maxNumberOfMoviesToShow < movies.length
          && <ShowMoreButton onClick={increaseNumberOfMovies}/>
      }
    </>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        previewImage: PropTypes.string.isRequired.isRequired,
        id: PropTypes.number.isRequired,
        onMouseOver: PropTypes.func,
        previewVideoLink: PropTypes.string.isRequired,
        posterImage: PropTypes.string.isRequired
      })
  ),
  removeMovieFromFavorites: PropTypes.func
};

export default memo(MovieList, (prevProps, nextProps) => {
  return checkIfArraysAreEqual(
      collectMoviesId(prevProps.movies),
      collectMoviesId(nextProps.movies)
  );
});
