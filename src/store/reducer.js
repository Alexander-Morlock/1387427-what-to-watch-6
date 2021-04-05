import {combineReducers} from 'redux';
import {NameSpace} from '../utils/constants';
import authorizationReducer from './authorization-reducer/authorization-reducer';
import favoritesReducer from './favorites-reducer/favorites-reducer';
import moviesReducer from './movies-reducer/movies-reducer';
import reviewReducer from './review-reducer/review-reducer';

export default combineReducers({
  [NameSpace.AUTHORIZATION]: authorizationReducer,
  [NameSpace.FAVORITE]: favoritesReducer,
  [NameSpace.MOVIES]: moviesReducer,
  [NameSpace.REVIEW]: reviewReducer
});
