import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {shapeOfMovie} from '../../utils/shape-of-movie';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MainPage from '../MainPage/main-page';
import SignIn from '../SignIn/sign-in';
import MyList from '../MyList/my-list';
import Movie from '../Movie/movie';
import AddReview from '../AddReview/add-review';
import Player from '../Player/player';
import Page404 from '../Page404/page-404';
import {connect} from 'react-redux';
import {getAllMoviesAndPromoThunk, requiredAuthorizationThunk} from '../../store/api-actions';
import Loader from '../Loader/loader';
import PrivateRoute from '../PrivateRoute/private-route';
import {getGenres, getIsDataDownloaded, getMovies, getPromo} from '../../store/moviesReducer/selectors';

const App = ({movies, getAllMoviesAndPromo, requiredAuthorization, isDataDownloaded}) => {

  useEffect(() => {
    requiredAuthorization();
    getAllMoviesAndPromo();
  }, []);

  const loaderIcon = document.getElementById(`loader-icon`);

  if (loaderIcon && movies[0]) {
    loaderIcon.remove();
  }

  return (
    isDataDownloaded
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
  movies: PropTypes.arrayOf(shapeOfMovie).isRequired,
  getAllMoviesAndPromo: PropTypes.func.isRequired,
  requiredAuthorization: PropTypes.func.isRequired,
  isDataDownloaded: PropTypes.bool
};

const mapStateToProps = (store) => ({
  movies: getMovies(store),
  genres: getGenres(store),
  promo: getPromo(store),
  isDataDownloaded: getIsDataDownloaded(store)
});

const mapDispatchToProps = (dispatch) => ({
  getAllMoviesAndPromo: () => dispatch(getAllMoviesAndPromoThunk()),
  requiredAuthorization: () => dispatch(requiredAuthorizationThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
