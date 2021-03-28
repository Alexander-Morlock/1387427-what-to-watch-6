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
import {getAllMoviesAndPromoThunk} from '../../store/api-actions';
import Loader from '../Loader/Loader';

const App = (props) => {

  useEffect(() => {
    props.getAllMoviesAndPromo();
  }, []);

  const loaderIcon = document.getElementById(`loader-icon`);

  if (loaderIcon && props.movies[0]) {
    loaderIcon.remove();
  }

  return (
    props.movies[0] ? <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <MainPage />
        </Route>

        <Route path='/login' exact>
          <SignIn />
        </Route>

        <Route path='/mylist' exact>
          <MyList />
        </Route>

        <Route path='/films/:id' exact>
          <Movie />
        </Route>

        <Route path='/films/:id/review' exact>
          <AddReview />
        </Route>

        <Route path='/player/:id' exact >
          <Player />
        </Route>
        <Route>
          <Page404 />
        </Route>
      </Switch>
    </BrowserRouter> : <Loader />
  );
};

App.propTypes = PropTypes.arrayOf(
    shapeOfMovie()
).isRequired;

const mapStateToProps = (store) => ({
  movies: store.movies, genres: store.genres, promo: store.promo});

const mapDispatchToProps = (dispatch) => ({
  getAllMoviesAndPromo: () => dispatch(getAllMoviesAndPromoThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
