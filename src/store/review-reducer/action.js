export const ActionType = {
  BLOCK_COMMENT_FORM: `BLOCK_COMMENT_FORM`,
  UNBLOCK_COMMENT_FORM: `UNBLOCK_COMMENT_FORM`,
  SET_ERROR_COMMENT_FORM: `SET_ERROR_COMMENT_FORM`
};

export const blockCommentForm = () => ({
  type: ActionType.BLOCK_COMMENT_FORM
});

export const unBlockCommentForm = (comments) => ({
  type: ActionType.UNBLOCK_COMMENT_FORM,
  payload: comments
});

export const setErrorCommentForm = () => ({
  type: ActionType.SET_ERROR_COMMENT_FORM
});
