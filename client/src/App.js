import React from "react";
import jwt_decode from "jwt-decode";
import setAuthorizationHeader from "./utils/setAuthorizationHeader";
import { setCurrentUser, logoutUser } from "./redux/actions/authActions";
import { clearCurrentProfile } from "./redux/actions/profileActions";
import { Provider } from "react-redux";
import store from "./redux/configureStore";
import { BrowserRouter, Route } from "react-router-dom";
import AppRouter from "./routes/AppRouter";

// check for token in ls
if (localStorage.jwt_ds) {
  setAuthorizationHeader(localStorage.jwt_ds);
  // decode token
  const decoded = jwt_decode(localStorage.jwt_ds);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(logoutUser());
    // clear current profile
    store.dispatch(clearCurrentProfile());
    // redirect to login
    window.location.href = "/login";
  }
}

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Route component={AppRouter} />
    </BrowserRouter>
  </Provider>
);

export default App;
