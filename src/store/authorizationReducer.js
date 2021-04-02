import {ActionType} from './action';
import {AuthorizationStatus, ConnectionStatus} from '../utils/constants';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  user: {}
};

const authorizationReducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.REQUIRED_AUTHORIZATION: {
      const isSuccess = action.payload.status === ConnectionStatus.SUCCESS;
      return {
        ...state,
        authorizationStatus: isSuccess
          ? AuthorizationStatus.AUTH
          : AuthorizationStatus.NO_AUTH,
        user: action.payload.data,
        connectionStatus: action.payload.status
      };
    }

    case ActionType.SEND_AUTHORIZATION: {
      const isSuccess = action.payload.status === ConnectionStatus.SUCCESS;
      return {
        ...state,
        user: action.payload.data,
        authorizationStatus: isSuccess
          ? AuthorizationStatus.AUTH
          : AuthorizationStatus.NO_AUTH,
        connectionStatus: action.payload.status
      };
    }

    case ActionType.LOG_OUT: {
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        user: null
      };
    }

    default: {
      return state;
    }
  }
};

export default authorizationReducer;
