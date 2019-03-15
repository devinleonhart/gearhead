// For Shadowrun related rolls.
const availability = function(cha, negotiate, connection) {
  return `You just told me you have CHA: ${cha}, Negotiate: ${negotiate}, and Connection: ${connection}`;
};

exports.availability = availability;
