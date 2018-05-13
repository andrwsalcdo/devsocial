import isEmpty from "./isEmpty";
import moment from "moment";

export const updateProfileForm = profileData => {
  // Bring skills array back to CSV
  const skillsCSV = profileData.skills.join(",");

  // If profileData field doesnt exist, make empty string
  profileData.company = !isEmpty(profileData.company)
    ? profileData.company
    : "";
  profileData.website = !isEmpty(profileData.website)
    ? profileData.website
    : "";
  profileData.location = !isEmpty(profileData.location)
    ? profileData.location
    : "";
  profileData.githubusername = !isEmpty(profileData.githubusername)
    ? profileData.githubusername
    : "";
  profileData.bio = !isEmpty(profileData.bio) ? profileData.bio : "";
  profileData.social = !isEmpty(profileData.social) ? profileData.social : {};
  profileData.twitter = !isEmpty(profileData.social.twitter)
    ? profileData.social.twitter
    : "";
  profileData.facebook = !isEmpty(profileData.social.facebook)
    ? profileData.social.facebook
    : "";
  profileData.linkedin = !isEmpty(profileData.social.linkedin)
    ? profileData.social.linkedin
    : "";
  profileData.youtube = !isEmpty(profileData.social.youtube)
    ? profileData.social.youtube
    : "";
  profileData.instagram = !isEmpty(profileData.social.instagram)
    ? profileData.social.instagram
    : "";

  // Set component fields state
  return {
    handle: profileData.handle,
    company: profileData.company,
    website: profileData.website,
    location: profileData.location,
    status: profileData.status,
    skills: skillsCSV,
    githubusername: profileData.githubusername,
    bio: profileData.bio,
    twitter: profileData.twitter,
    facebook: profileData.facebook,
    linkedin: profileData.linkedin,
    youtube: profileData.youtube,
    instagram: profileData.instagram
  };
};

export const updateExpForm = (experience, id) => {
  // find the experience in the array via id
  const [exp] = experience.filter(ex => ex._id === id);

  // if (exp.length > 0 || exp !== undefined) {
  const from = moment(exp.from, ["yyyy-MM-dd", moment.HTML5_FMT.DATE]);
  const to = moment(exp.to, ["yyyy-MM-dd", moment.HTML5_FMT.DATE]);

  // // if experinece form field doesn't exists, use empty string
  exp.location = !isEmpty(exp.location) ? exp.location : "";
  exp.from = !isEmpty(exp.from) ? from._d.toDateString() : "";
  exp.to = !isEmpty(exp.to) ? to._d.toDateString() : "";
  exp.current = exp.current === true ? exp.current : (exp.current = false);
  exp.description = !isEmpty(exp.description) ? exp.description : "";

  return {
    company: exp.company,
    title: exp.title,
    location: exp.location,
    from: exp.from,
    to: exp.to,
    current: exp.current,
    description: exp.description,
    // hack: having problems with moment. this helps the user
    // with the dates, just in case they forget.
    originalFrom: exp.from,
    originalTo: exp.to
  };
};
