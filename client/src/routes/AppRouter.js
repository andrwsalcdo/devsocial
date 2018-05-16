import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Wrapper from "../components/layout/Wrapper";
import Navbar from "../components/layout/Navbar";
import Landing from "../components/layout/Landing";
import Footer from "../components/layout/Footer";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import Profiles from "../components/profiles/Profiles";
import Profile from "../components/profile/Profile";
import NotFound from "../components/not-found/NotFound";
import Dashboard from "../components/dashboard/Dashboard";
import CreateEditProfile from "../components/create-edit-profile/CreateEditProfile";
import AddEditExperience from "../components/add-credentials/AddEditExperience";
import AddEditEducation from "../components/add-credentials/AddEditEducation";
import Posts from "../components/posts/Posts";
import Post from "../components/post/Post";

import "../App.css";

const AppRouter = () => (
  <React.Fragment>
    <Wrapper>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <div className="container">
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile/:handle" component={Profile} />
        <Route exact path="/not-found" component={NotFound} />
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
          <PrivateRoute exact path="/feed" component={Posts} />
          <PrivateRoute exact path="/post/:id" component={Post} />
        </Switch>
      </div>
    </Wrapper>
    <Footer />
  </React.Fragment>
);

export default AppRouter;
