import isEmpty from "./isEmpty";

const updateForm = profileData => {
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

export default updateForm;
