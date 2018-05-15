const fetchGithub = (username, count, sort, clientId, clientSecret) => {
  const mainUrl = `https://api.github.com/`;
  const clientKeys = `&client_id=${clientId}&client_secret=${clientSecret}`;
  return fetch(
    `${mainUrl}users/${username}/repos?per_page=${count}&sort=${sort}${clientKeys}`
  );
};

export default fetchGithub;
