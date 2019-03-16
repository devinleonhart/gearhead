// For Shadowrun related rolls.

const roll = function(dicePool, difficulty) {
  const rolledDice = new Array(dicePool).fill().map(() => Math.round(Math.random() * (6 - 1)) + 1).sort((a, b) => a - b);
  const hits = rolledDice.filter((num) => num > 4).length;
  let result = "Success";
  let reaction = ":smirk_cat: :beer:";
  if (hits < difficulty) {
    result = "Failure";
    reaction = ":scream_cat:";
  }
  if(rolledDice.filter((num) => num === 1).length >= Math.ceil(dicePool / 2)) {
    if(hits === 0) {
      result += " + Critical Glitch";
      reaction = ":scream_cat: :skull:";
    }
    else {
      result += " + Glitch";
      reaction = ":joy_cat: :bomb:";
    }
  }
  return `${result}! [${rolledDice.join('] [')}] ${reaction}`;
};

const availability = function(cha, negotiate, connection) {
  return `You just told me you have CHA: ${cha}, Negotiate: ${negotiate}, and Connection: ${connection}`;
};

exports.availability = availability;
exports.roll = roll;
