const mongoose = require("mongoose");
const Profile = require("../models/Profile");
const User = require("../models/User");
const validateProfileInput = require("../validation/profile");
const validateExperienceInput = require("../validation/experience");
const validateEducationInput = require("../validation/education");

const currentProfile = (req, res) => {
  let errors = {};

  Profile.findOne({ user: req.user.id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "This user does not have a profile";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
};

const allProfiles = (req, res) => {
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles || profiles.length === 0) {
        errors.noprofile = "There aren't any profiles";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err =>
      res.status(404).json({ profile: "There aren't any profiles" })
    );
};

const profileByHandle = (req, res) => {
  let errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There isn't a profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
};

const profileByUserId = (req, res) => {
  let errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There isn't a profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There isn't a profile for this user" })
    );
};

const createEditProfile = (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body);
  //  check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Get Profile data fields
  const profileFields = {};
  profileFields.user = req.user.id;

  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.githubusername)
    profileFields.githubusername = req.body.githubusername;
  // Skills - split into array
  if (typeof req.body.skills !== "undefined") {
    profileFields.skills = req.body.skills.split(",");
  }
  // Social
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      // edit/update profile
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).then(profile => res.json(profile));
    } else {
      // create profile
      // check if handle exists
      Profile.findOne({ handle: profileFields.handle }).then(profile => {
        if (profile) {
          errors.handle = "This handle already exists";
          return res.status(400).json(errors);
        }
        // save new profile
        new Profile(profileFields).save().then(profile => res.json(profile));
      });
    }
  });
};

const addExperience = (req, res) => {
  const { errors, isValid } = validateExperienceInput(req.body);
  //  check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id }).then(profile => {
    const newExp = {
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };

    // add to front of experience array
    profile.experience = [newExp].concat(profile.experience);

    profile.save().then(profile => res.json(profile));
  });
};

const editExperience = (req, res) => {
  const { errors, isValid } = validateExperienceInput(req.body);
  //  check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // updated experience object
  const updateExp = {
    _id: req.params.exp_id,
    title: req.body.title,
    company: req.body.company,
    location: req.body.location,
    from: req.body.from,
    to: req.body.to,
    current: req.body.current,
    description: req.body.description
  };

  Profile.update(
    {
      user: req.user.id,
      "experience._id": req.params.exp_id
    },
    {
      $set: {
        "experience.$": updateExp
      }
    },
    { new: true }
  )
    .then(() => {
      res.json({ success: true });
    })
    .catch(err => res.status(400).json({ err: err }));
};

const deleteExperience = (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      profile.experience.remove({ _id: req.params.exp_id });
      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.json(err));
};

const addEducation = (req, res) => {
  const { errors, isValid } = validateEducationInput(req.body);
  //  check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id }).then(profile => {
    const newEdu = {
      school: req.body.school,
      degree: req.body.degree,
      fieldofstudy: req.body.fieldofstudy,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };

    // add to front of education array
    profile.education = [newEdu].concat(profile.education);

    profile.save().then(profile => res.json(profile));
  });
};

const editEducation = (req, res) => {
  const { errors, isValid } = validateEducationInput(req.body);
  //  check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // updated education object
  const updateEdu = {
    _id: req.params.edu_id,
    school: req.body.school,
    degree: req.body.degree,
    fieldofstudy: req.body.fieldofstudy,
    from: req.body.from,
    to: req.body.to,
    current: req.body.current,
    description: req.body.description
  };

  Profile.update(
    {
      user: req.user.id,
      "education._id": req.params.edu_id
    },
    {
      $set: {
        "education.$": updateEdu
      }
    },
    { new: true }
  )
    .then(() => {
      res.json({ success: true });
    })
    .catch(err => res.status(400).json({ err: err }));
};

const deleteEducation = (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      profile.education.remove({ _id: req.params.edu_id });
      profile
        .save()
        .then(profile => res.json(profile))
        .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
};

const deleteAccount = (req, res) => {
  Profile.findOneAndRemove({ user: req.user.id })
    .then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    })
    .catch(err => res.json(err));
};

module.exports = {
  currentProfile,
  allProfiles,
  profileByHandle,
  profileByUserId,
  createEditProfile,
  addExperience,
  editExperience,
  deleteExperience,
  addEducation,
  editEducation,
  deleteEducation,
  deleteAccount
};
