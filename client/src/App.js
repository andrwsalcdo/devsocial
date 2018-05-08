import React from "react";
import { Provider } from "react-redux";
import store from "./redux/configureStore";
import { BrowserRouter, Route } from "react-router-dom";
import AppRouter from "./routes/AppRouter";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Route component={AppRouter} />
    </BrowserRouter>
  </Provider>
);

export default App;
