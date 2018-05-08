const initialState = {
  isAuthenticated: false,
  user: {}
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default authReducer;
