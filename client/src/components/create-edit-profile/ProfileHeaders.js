import React from "react";

const CreateProfileHeader = () => (
  <React.Fragment>
    <h1 className="display-4 text-center">Create Your Profile</h1>
    <p className="lead text-center">
      Let's get some info to make your profile stand out{" "}
    </p>
  </React.Fragment>
);

const EditProfileHeader = () => (
  <React.Fragment>
    <h1 className="display-4 text-center">Edit Your Profile</h1>
  </React.Fragment>
);

export { CreateProfileHeader, EditProfileHeader };
