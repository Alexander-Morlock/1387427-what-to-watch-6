export const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SEND_AUTHORIZATION: `SEND_AUTHORIZATION`,
  LOG_OUT: `LOG_OUT`
};

export const requiredAuthorization = (data) => ({
  type: ActionType.REQUIRED_AUTHORIZATION,
  payload: data
});

export const sendAuthorization = (response) => ({
  type: ActionType.SEND_AUTHORIZATION,
  payload: response
});

export const logOut = (response) => ({
  type: ActionType.LOG_OUT,
  payload: response
});

