console.log('Script initialized.');

//======= game object begin =========//
var game = {
  players: [],
  //dice: [],
  //playerTurn: '',
  //rollNum: 0,
  //round: 0,
  //winner: null,

  // Create a new player object and add player to the players array
  addPlayer: function () {
    var newPlayer = new Player(), // create a new player
        $name = $('#name-input'); // get input

    console.log(this); // check this context => returns button (not what we want)
    console.log('Clicked'); // console to verify button wiring
    console.log($name.val()); // check input value
    newPlayer.name = $name.val(); // set object name property to input value
    $name.val(''); // clear input value

    game.players.push(newPlayer); // push entry to players array => Object
    console.log('A new player has been added: ' + game.players[0].name);
  },

  // Dice roll functionality
  rollDice: function () {

  },

  // Get winner functionality
  getWinner: function () {

  }

};
//======= game object end =========//

//======= player object begin =========//

function Player() {
  this.name = "";
  this.score = 0;
  this.pieces = {};
}

//======= player object begin =========//

$('#add-player').on('click', game.addPlayer); // call add player method
// //
// //   // Create dice object
// //   function Dice() {
// //       number = function() {
// //         return console.log(Math.floor((Math.random() * 6)) + 1);
// //       }
// //   }
