import React from 'react';
import PropTypes from 'prop-types';
import shapeOfFilm from '../../utils/shape-of-film';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MainPage from '../MainPage/MainPage';
import SignIn from '../SignIn/SignIn';
import MyList from '../MyList/MyList';
import Film from '../Film/Film';
import AddReview from '../AddReview/AddReview';
import Player from '../Player/Player';
import Page404 from '../Page404/Page404';
import MoreLikeThis from '../Film/MoreLikeThis';

const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <MainPage films={props.films} />
        </Route>

        <Route path='/login' exact>
          <SignIn />
        </Route>

        <Route path='/mylist' exact>
          <MyList films={props.films} />
        </Route>

        <Route path='/films/:id' exact>
          <Film films={props.films} />
          <MoreLikeThis />
        </Route>

        <Route path='/films/:id/review' exact>
          <AddReview films={props.films} />
        </Route>

        <Route path='/player/:id' exact >
          <Player films={props.films} />
        </Route>
        <Route>
          <Page404 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = PropTypes.arrayOf(
    shapeOfFilm()
).isRequired;


export default App;
