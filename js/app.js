console.log('Script initialized.'); // Initial log to confirm script is working

//======= Game object begin =========//
var game = {
  players: [],
  dice: [],
  //playerTurn: '',
  //rollsLeft: 3,
  //round: 0,
  //winner: null,

  // Create a new player object and add player to the players array
  addPlayer: function () {
    var newPlayer = new Player(), // create a new player
        $name = $('#name-input'); // get input

    console.log('Clicked'); // console to verify button wiring
    console.log($name.val()); // check input value
    if ($name.val() === '') {
      alert('Please type your name for a more personalized experience.');
    } else {
        newPlayer.name = $name.val(); // set object name property to input value
        $name.val(''); // clear input value
        game.players.push(newPlayer); // push entry to players array => Object
        console.log('A new player has been added.'); // confirmation message
      }
    //if (game.players.length > 2) {
      //alert('Sorry. A max of two players is supported at this time.');
    //}
  },

  // Start game functionality
  startGame: function () {
    $.each(game.players, function(index) {
      $('#players-display').append('<span>' + game.players[index].name + ': ' + game.players[index].score + '</span>');
    });
    console.log(firstPlayer);
  },

  // Dice roll functionality
  rollDice: function () {},

  // Get winner functionality
  getWinner: function () {},

  // Get next player functionality
  nextPlayer: function () {
    var firstPlayer = game.players[0];
    console.log(firstPlayer);
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

$('#name-input').on('keypress', function (e) {
  if (e.which === 13) {
    game.addPlayer();
  }
}); // call add player method if hitting enter after input

$('#add-player').on('click', game.addPlayer); // call add player method if button clicked
$('#start-game').on('click', game.startGame); // call add player method


//   // Create dice object
//   function Dice() {
//       number = function() {
//         return console.log(Math.floor((Math.random() * 6)) + 1);
//       }
//   }
