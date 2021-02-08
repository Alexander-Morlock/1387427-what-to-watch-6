import React from 'react';
import PropTypes from 'prop-types';
import MainPage from '../MainPage/MainPage';
import SignIn from '../SignIn/SignIn';
import MyList from '../MyList/MyList';
import Film from '../Film/Film';
import AddReview from '../AddReview/AddReview';
import Player from '../Player/Player';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Page404 from '../Page404/Page404';
import MoreLikeThis from '../Film/MoreLikeThis';

const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <MainPage data={props.data} />
        </Route>

        <Route path='/login' exact>
          <SignIn />
        </Route>

        <Route path='/mylist' exact>
          <MyList />
        </Route>

        <Route path='/films/:id' exact>
          <Film />
          <MoreLikeThis />
        </Route>

        <Route path='/films/:id/review' exact>
          <AddReview />
        </Route>

        <Route path='/player/:id' exact>
          <Player />
        </Route>

        <Route>
          <Page404 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  data: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        imgPath: PropTypes.string.isRequired,
        hrefPath: PropTypes.string.isRequired
      })
  ).isRequired
};

export default App;
