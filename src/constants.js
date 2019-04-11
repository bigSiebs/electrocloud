module.exports = {
  AUTHORIZATION_URL: `https://soundcloud.com/connect?client_id=${process.env.SOUNDCLOUD_CLIENT_ID}&response_type=code_and_token&scope=non-expiring&display=next&redirect_uri=${process.env.SOUNDCLOUD_REDIRECT_URI}`,
  CONFIG_FILENAME: 'user-preferences',
};
