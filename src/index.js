const settings = require('./settings');
const Discord = require('discord.js');
const token = settings.token;
const client = new Discord.Client();

const handlers = require('./handlers')(client);

client.login(token);
