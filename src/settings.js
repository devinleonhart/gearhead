const secrets = require('../development-secrets');
const environment = process.env.NODE_ENV;

// TODO Replace 'ProdSecretToken' with GitLab CI ENV variable.
exports.token = (environment === 'production' ? 'ProdSecretToken' : secrets.bot_secret);
