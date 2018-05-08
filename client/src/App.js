import React from "react";
import jwt_decode from "jwt-decode";
import setAuthorizationHeader from "./utils/setAuthorizationHeader";
import { setCurrentUser } from "./redux/actions/authActions";
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
}

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Route component={AppRouter} />
    </BrowserRouter>
  </Provider>
);

export default App;
