import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import shapeOfMovie from '../../utils/shape-of-movie';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MainPage from '../MainPage/MainPage';
import SignIn from '../SignIn/SignIn';
import MyList from '../MyList/MyList';
import Movie from '../Movie/Movie';
import AddReview from '../AddReview/AddReview';
import Player from '../Player/Player';
import Page404 from '../Page404/Page404';
import {connect} from 'react-redux';
import {getAllMoviesThunk} from '../../store/api-actions';

const App = (props) => {

  useEffect(() => {
    props.getMovies();
  }, []);

  const loaderIcon = document.getElementById(`loader-icon`);

  if (loaderIcon && props.movies[0]) {
    loaderIcon.remove();
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <MainPage />
        </Route>

        <Route path='/login' exact>
          <SignIn />
        </Route>

        <Route path='/mylist' exact>
          <MyList movies={props.movies} />
        </Route>

        <Route path='/films/:id' exact>
          <Movie />
        </Route>

        <Route path='/films/:id/review' exact>
          <AddReview movies={props.movies} />
        </Route>

        <Route path='/player/:id' exact >
          <Player movies={props.movies} />
        </Route>
        <Route>
          <Page404 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = PropTypes.arrayOf(
    shapeOfMovie()
).isRequired;

const mapStateToProps = (store) => ({
  movies: store.movies, genres: store.genres});

const mapDispatchToProps = (dispatch) => ({
  getMovies: () => dispatch(getAllMoviesThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
