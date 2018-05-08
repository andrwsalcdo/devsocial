import React from "react";
import { Route } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Landing from "../components/layout/Landing";
import Footer from "../components/layout/Footer";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import "../App.css";

const AppRouter = () => (
  <React.Fragment>
    <Navbar />
    <Route exact path="/" component={Landing} />
    <div className="container">
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
    </div>
    <Footer />
  </React.Fragment>
);

export default AppRouter;
