const environment = process.env.NODE_ENV;

const settings = {
  // when debugging, use a different prefix to avoid conflicting with the
  // production instance of Gearhead
  prefix: "/gh",
};

if (environment === "production") {
  settings.DISCORD_SECRET_KEY_SR = process.env.DISCORD_SECRET_KEY_SR;
} else if (environment === "test") {
  settings.DISCORD_SECRET_KEY_SR = "dummy key";
} else if (environment === "development") {
  require("dotenv").config();
  settings.DISCORD_SECRET_KEY_SR = process.env.DISCORD_SECRET_KEY_SR;
}

module.exports = settings;
