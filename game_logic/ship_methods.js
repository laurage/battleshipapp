function checkForShip (player, coordinates) {
	var shipPresent, ship;

	for (var i = 0; i < player.ships.length; i++) {
		ship = player.ships[i];

		shipPresent = ship.locations.filter(function (actualCoordinate) {
			return (actualCoordinate[0] === coordinates[0]) && (actualCoordinate[1] === coordinates[1]);
		})[0];
		if (shipPresent) {
			return ship;
		}
	}

	return false;
};

function damageShip(ship, damageCoordinates) {
	ship.damage.push(damageCoordinates);
	return ship;
};

function playerTurn(opponent, coordinates) {
 	var ship = checkForShip(opponent, coordinates);
	if (ship === false) {
		return false;
	}

	damageShip(ship, coordinates);
	return true;
}

module.exports.checkForShip = checkForShip;
module.exports.damageShip = damageShip;
module.exports.playerTurn = playerTurn;
