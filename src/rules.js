// For Shadowrun related rolls.

const roll = function(dicePool, threshold, limit) {
  const rolledDice = new Array(dicePool).fill().map(() => Math.round(Math.random() * (6 - 1)) + 1).sort((a, b) => a - b);
  let hits = rolledDice.filter((num) => num > 4).length;
  let limited = false;
  let result = "Success";
  let reaction = ":smirk_cat: :beer:";

  if(threshold > limit) {
    return `The threshold of the test exceeds the limit and is impossible. :crying_cat_face:`;
  }

  if(hits > limit) {
    limited = true;
    hits = limit;
  }

  if (hits < threshold) {
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
  return `${result}! [${rolledDice.join('] [')}] ${limited ? "[Limited]" : ""} ${reaction}`;
};

const availability = function(cha, negotiate, connection) {
  return `Rolling with CHA + Negotiate: ${cha + negotiate} limit of 3 + Connection: ${3 + connection}
    ${roll()}
  `;
};

exports.availability = availability;
exports.roll = roll;
