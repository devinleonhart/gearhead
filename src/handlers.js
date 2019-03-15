const rules = require('./rules');

module.exports = (client) => {
  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
  
  client.on('message', msg => {
    if (msg.content === '/gh availability') {
      msg.reply(rules.availability());
    }
  });
}
