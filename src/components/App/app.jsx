import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import getShapeOfMoviePropType from '../../utils/shape-of-movie';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MainPage from '../MainPage/MainPage';
import SignIn from '../SignIn/SignIn';
import MyList from '../MyList/MyList';
import Movie from '../Movie/Movie';
import AddReview from '../AddReview/AddReview';
import Player from '../Player/Player';
import Page404 from '../Page404/Page404';
import {connect} from 'react-redux';
import {getAllMoviesAndPromoThunk, requiredAuthorizationThunk} from '../../store/api-actions';
import Loader from '../Loader/Loader';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

const App = (props) => {

  useEffect(() => {
    props.requiredAuthorization();
    props.getAllMoviesAndPromo();
  }, []);

  const loaderIcon = document.getElementById(`loader-icon`);

  if (loaderIcon && props.movies[0]) {
    loaderIcon.remove();
  }

  return (
    props.isDataDownloaded
      ? <BrowserRouter>
        <Switch>
          <Route path='/' exact>
            <MainPage />
          </Route>

          <Route path='/login' exact>
            <SignIn />
          </Route>

          <PrivateRoute path='/mylist' exact render={() => <MyList />}/>

          <Route path='/films/:id' exact>
            <Movie />
          </Route>

          <PrivateRoute path='/films/:id/review' exact render={() => <AddReview />}/>

          <Route path='/player/:id' exact >
            <Player />
          </Route>
          <Route>
            <Page404 />
          </Route>
        </Switch>
      </BrowserRouter>
      : <Loader />
  );
};

App.propTypes = {
  movies: PropTypes.arrayOf(getShapeOfMoviePropType()).isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  promo: getShapeOfMoviePropType(),
  getAllMoviesAndPromo: PropTypes.func.isRequired,
  requiredAuthorization: PropTypes.func.isRequired,
  isDataDownloaded: PropTypes.bool,
};

const mapStateToProps = (store) => ({
  movies: store.MOVIES.movies,
  genres: store.MOVIES.genres,
  promo: store.MOVIES.promo,
  isDataDownloaded: store.MOVIES.isDataDownloaded
});

const mapDispatchToProps = (dispatch) => ({
  getAllMoviesAndPromo: () => dispatch(getAllMoviesAndPromoThunk()),
  requiredAuthorization: () => dispatch(requiredAuthorizationThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
