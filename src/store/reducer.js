import {combineReducers} from 'redux';
import {NameSpace} from '../utils/constants';
import authorizationReducer from './authorizationReducer/authorizationReducer';
import favoritesReducer from './favoritesReducer/favoritesReducer';
import moviesReducer from './moviesReducer/moviesReducer';
import reviewReducer from './reviewReducer/reviewReducer';

export default combineReducers({
  [NameSpace.AUTHORIZATION]: authorizationReducer,
  [NameSpace.FAVORITE]: favoritesReducer,
  [NameSpace.MOVIES]: moviesReducer,
  [NameSpace.REVIEW]: reviewReducer
});
