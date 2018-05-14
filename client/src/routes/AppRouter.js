import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Wrapper from "../components/layout/Wrapper";
import Navbar from "../components/layout/Navbar";
import Landing from "../components/layout/Landing";
import Footer from "../components/layout/Footer";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import Dashboard from "../components/dashboard/Dashboard";
import CreateEditProfile from "../components/create-edit-profile/CreateEditProfile";
import AddEditExperience from "../components/add-credentials/AddEditExperience";
import AddEditEducation from "../components/add-credentials/AddEditEducation";

import "../App.css";

const AppRouter = () => (
  <React.Fragment>
    <Wrapper>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <div className="container">
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute
            exact
            path="/create-profile"
            component={CreateEditProfile}
          />
          <PrivateRoute
            exact
            path="/edit-profile"
            component={CreateEditProfile}
          />
          <PrivateRoute
            exact
            path="/add-experience"
            component={AddEditExperience}
          />
          <PrivateRoute
            exact
            path="/experience/:_id"
            component={AddEditExperience}
          />
          <PrivateRoute
            exact
            path="/add-education"
            component={AddEditEducation}
          />
          <PrivateRoute
            exact
            path="/education/:_id"
            component={AddEditEducation}
          />
        </Switch>
      </div>
    </Wrapper>
    <Footer />
  </React.Fragment>
);

export default AppRouter;
