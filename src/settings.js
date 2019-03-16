const environment = process.env.NODE_ENV;

const settings = {};

if(environment === 'production') {
  settings.token = process.env.GEARHEAD_PROD_KEY;
} else {
	const secrets = require('../development-secrets');
	settings.token = secrets.bot_secret
}

module.exports = settings;
