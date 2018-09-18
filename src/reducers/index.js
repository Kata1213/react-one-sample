export const authenticationReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.authentication;
    default:
      return state;
  }
};