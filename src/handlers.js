const rules = require('./rules');

const prefix = '/gh';

module.exports = (client) => {
  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
  
  client.on('message', msg => {
    if (!msg.content.startsWith(prefix)) { return; }

    const args = msg.content.slice(prefix.length+1).split(' ');

    const command = args.shift().toLowerCase();

    if (command === 'a') {
      if (args.length !== 3) {
        return msg.channel.send(`Expected {CHA} {Negotiate} {Connection}`);
      }
      if (args[0] && args[1] && args[2] ) {
        msg.channel.send(rules.availability(args[0], args[1], args[2]));
      }
    }
  });
}
