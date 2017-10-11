expect = require('chai').expect;

describe("checkForShip", function() {
  var checkForShip = require("../game_logic/ship_methods").checkForShip;
  xit("should correctly report no ship for a given players coordinate", function(){
    player = {
      ships: [
        {
          locations: [[0,9], [0,0]]
        }
      ]
    };
    expect(checkForShip(player, [9,9])).to.be.false;
  });

  it("should correctly report a ship for a given players coordinate", function(){
    player = {
      ships: [
        {
          locations: [[0,9], [0,0]]
        }
      ]
    };
    // expect(checkForShip(player, [0,9])).to.be.true;
    expect(checkForShip(player, [0,0])).to.be.true;
  });

  xit("should correctly report a ship for a given players coordinate, when the player owns several ships", function(){
    player = {
      ships: [
        {
          locations: [[0,9], [0,0]]
        },
        {
          locations: [[1,2], [3,4]]
        }
      ]
    };
    expect(checkForShip(player, [0,9])).to.be.true;
    expect(checkForShip(player, [0,0])).to.be.true;
    expect(checkForShip(player, [1,2])).to.be.true;
    expect(checkForShip(player, [3,4])).to.be.true;
    expect(checkForShip(player, [9,9])).to.be.false;
  });
});
