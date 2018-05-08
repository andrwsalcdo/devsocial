import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import AppRouter from "./routes/AppRouter";

const App = () => (
  <BrowserRouter>
    <Route component={AppRouter} />
  </BrowserRouter>
);

export default App;
