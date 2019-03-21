const settings = require('../settings.js');
const rules = require('../rules');

const commands = [
  {
    name: 'a',
    helpText: 'Make an availability roll.',
    parameters: ['CHA', 'Negotiate', 'Connection'],
    callback: (cha, negotiate, connection) => {
      return rules.roll(parseInt(cha), parseInt(negotiate), parseInt(connection));
    },
  },
  {
    name: 'r',
    helpText: 'Make a skill roll.',
    parameters: ['dicepool', 'threshold', 'limit'],
    callback: (dicepool, threshold, limit) => {
      return rules.roll(parseInt(dicepool), parseInt(threshold), parseInt(limit));
    },
  },
];

module.exports = (requestedCommand, args) => {

  if (requestedCommand === "help") {
    const helpText = (command) => {
      const paramsList = command.parameters.map(paramName => `{${paramName}}`).join(' ');
      const usage = `Usage: ${settings.prefix} ${command.name} ${paramsList}`;
      return `**${command.name}**: ${command.helpText}\n${usage}`;
    };
    return `Available commands:\n${commands.map(command => helpText(command)).join("\n")}`;
  }

  const command = commands.find((command) => command.name === requestedCommand);

  if (!command) {
    throw new Error(
      `${requestedCommand} isn't a recognized command. Use ${settings.prefix} help for a listing of all commands`
    );
  }

  if (args.length !== command.parameters.length) {
    const paramsHelpString =
      command.parameters.map((paramName) => `{${paramName}}`).join(' ');
    throw new Error(`Expected ${paramsHelpString}`);
  }

  return command.callback.apply(null, args);
};
