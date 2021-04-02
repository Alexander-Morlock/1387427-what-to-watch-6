import {ActionType} from './action';

const initialState = {
  isErrorCommentForm: false,
  isBlockedCommentForm: false,
  comments: []
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.BLOCK_COMMENT_FORM: {
      return {
        ...state,
        isBlockedCommentForm: true
      };
    }

    case ActionType.UNBLOCK_COMMENT_FORM: {
      return {
        ...state,
        isBlockedCommentForm: false,
        comments: action.payload
      };
    }

    case ActionType.SET_ERROR_COMMENT_FORM: {
      return {
        ...state,
        isErrorCommentForm: true
      };
    }

    default: {
      return state;
    }
  }
};

export default reviewReducer;
