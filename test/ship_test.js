var expect = require('chai').expect;

describe('checkForShip', function () {
	var checkForShip = require('../game_logic/ship_methods').checkForShip;

	it('should correctly report no ship at a given players coordinate', function () {

		player = {
			ships: [
				{
					locations: [[0, 0]]
				}
			]
		};

		expect(checkForShip(player, [9, 9])).to.be.false;
	});

	it('should correctly report a ship located at the given coordinates', function () {

		player = {
			ships: [
				{
					locations: [[0, 0]]
				}
			]
		};

		expect(checkForShip(player, [0, 0])).to.deep.equal(player.ships[0]);
	});

	it('should handle ships located at more than one coordinate', function () {

		player = {
			ships: [
				{
					locations: [[0, 0], [0, 1]]
				}
			]
		};

		expect(checkForShip(player, [0, 1])).to.deep.equal(player.ships[0]);
		expect(checkForShip(player, [0, 0])).to.deep.equal(player.ships[0]);
		expect(checkForShip(player, [9, 9])).to.be.false;
	});

	it('should handle checking multiple ships', function () {

		player = {
			ships: [
				{
					locations: [[0, 0], [0, 1]]
				},
				{
					locations: [[1, 0], [1, 1]]
				},
				{
					locations: [[2, 0], [2, 1], [2, 2], [2, 3]]
				}
			]
		};

		expect(checkForShip(player, [0, 1])).to.deep.equal(player.ships[0]);
		expect(checkForShip(player, [0, 0])).to.deep.equal(player.ships[0]);
		expect(checkForShip(player, [1, 0])).to.deep.equal(player.ships[1]);
		expect(checkForShip(player, [1, 1])).to.deep.equal(player.ships[1]);
		expect(checkForShip(player, [2, 3])).to.deep.equal(player.ships[2]);
		expect(checkForShip(player, [9, 9])).to.be.false;
	});
});

describe("damageShip", function(){
	var damageShip = require("../game_logic/ship_methods.js").damageShip;
	var ship = {
		locations: [[0, 0]],
		damage: [],
	}

	it("records the new damage made to a ship", function(){
		damageShip(ship, [0,0]);
		expect(ship.damage).to.deep.include([0,0]);
	});
});

describe("playerTurn", function(){
	var playerTurn = require("../game_logic/ship_methods").playerTurn;
	var opponentPlayer;
	beforeEach(function(){
		opponentPlayer = {
			ships: [
				{
					locations: [[0, 0]],
					damage:[],
				}
			]
		};
	});

	it("reports that the player has hit the ship if the coordinates are right", function(){
		expect(playerTurn(opponentPlayer, [0,0])).to.be.true;
	});

	it("reports that the player hasn't hit the ship if the coordinates are wrong", function(){
		expect(playerTurn(opponentPlayer, [0,1])).to.be.false;
	});

	it("records the new damage made to a ship when there is only one ship", function(){
		playerTurn(opponentPlayer, [0,0]);
		expect(opponentPlayer.ships[0].damage).to.deep.include([0,0]);
	});

	it("doesn't record a damage if there is no ship at these coordinates", function(){
		playerTurn(opponentPlayer, [0,1]);
		expect(opponentPlayer.ships[0].damage).not.to.deep.include([0,1]);
	});
});

describe("playerTurn for multiple ships", function(){
	var playerTurn = require("../game_logic/ship_methods").playerTurn;
	var opponentPlayer;
	beforeEach(function(){
		opponentPlayer = {
			ships: [
				{
					locations: [[0, 0]],
					damage:[],
				},
				{
					locations: [[1, 1]],
					damage:[],
				}
			]
		};
	});

	it("records the new damage made to a ship when there are several ships", function(){
		playerTurn(opponentPlayer, [0,0]);

		expect(opponentPlayer.ships[0].damage[0]).to.deep.equal([0,0]);
	});

	it("doesn't record damage made to a ship when there are several ships if there is no ship at the coordinates", function(){
		playerTurn(opponentPlayer, [9,9]);

		expect(opponentPlayer.ships[1].damage[0]).to.equal();
	});
});
