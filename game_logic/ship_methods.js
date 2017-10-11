function checkForShip(player, coordinates){
  var matchingCoordinates;
  player.ships.forEach(function(ship){
    matchingCoordinates = ship.locations.filter(function(location){
      return location[0] === coordinates[0] && location[1] === coordinates[1];
    });
    console.log("matchingCoordinates",matchingCoordinates);
    console.log("something in array?",matchingCoordinates.length !== 0);
    if (matchingCoordinates) {
      console.log("here");
      return true;
    }
  });
  return false;
};

module.exports.checkForShip = checkForShip;
