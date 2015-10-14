console.log('Script initialized.'); // Initial log to confirm script is working



//======= Game object begin =========//
var game = {
  maxPlayers: 4, // number of players option
  players: [],
  dice: [],
  //playerTurn: '',
  rollsLeft: 3, // max amount of rolls
  //round: 13, // max rounds
  //winner: null,

  // Initialize the game
  init: function () {
    $('#add-player').hide().fadeIn(1500); // Hide and fadeIn add player button
    $('#dice-board').hide(); // Hide the dice board until game started
    $('#score-card, #roll-dice').hide(); // Hide the score card until game started
    $('#start-game').hide(); // Hide start button until players are added
    $('#players-display').hide(); // Hide players until start game is called
    $('#new-game').hide(); // Hide new game button until game is started
    $('#name-input').on('keypress', function (e) { // allow keyboard entry to add player
      if (e.which === 13) {
        game.addPlayer();
      }
    }); // call add player method if hitting enter after input

    $('#add-btn').on('click', game.addPlayer); // call add player method if button clicked
    $('#start-btn').on('click', game.startGame); // call add player method
    $('#roll-btn').on('click', game.rollDice); // call roll dice method if button clicked
    $('#new-btn').on('click', game.newGame); // call new game method if button clicked
  },

  // Create a new player object and add player to the players array
  addPlayer: function () {
    var newPlayer = new Player(), // create a new player
        $name = $('#name-input'); // get input

    console.log('Clicked'); // console to verify button wiring
    console.log($name.val()); // check input value
    if ($name.val() === '') {
      alert('Please type your name for a more personalized experience.');
    } else if (game.players.length < game.maxPlayers) {
        newPlayer.name = $name.val(); // set object name property to input value
        $name.val(''); // clear input value
        game.players.push(newPlayer); // push entry to players array => Object
        console.log('A new player has been added.'); // confirmation message
        $('#start-game').fadeIn(1000);
      } else {
        alert('Sorry. A max of ' + game.maxPlayers + ' players is supported at this time.');
      }
  },

  // Start game functionality
  startGame: function () {
    $('#rolls-left').append(game.rollsLeft);
    $('#add-btn').off('click', game.addPlayer); // remove add player click event
    $('#start-btn').off('click', game.startGame); // remove start game click event
    $('#add-player, #start-game').fadeOut();
    $('#dice-board').delay(250).fadeIn(1000);
    $.each(game.players, function(index) {
      $('#players-display').append('<span class="player-name">' + game.players[index].name + ':</span> ' + '<span class="player-score">' + game.players[index].score + '</span>').fadeIn();
    });
    $('#score-card').delay(1200).fadeIn(1000);
    $('#new-game').delay(2000).fadeIn();
  },

  newGame: function () {
    game.players = [];
    $('#players-display').fadeOut();
  },

  createDice: function () {

  },

  // Dice roll functionality
  rollDice: function () {
    if (game.rollsLeft === 0) {
      console.log('Get next player');
      alert('Get next player ...');
    } else {
        console.log('Clicked');
        game.rollsLeft--;
        $('#rolls-left').text(game.rollsLeft);
      }
  },

  // Get winner functionality
  getWinner: function () {
    if (game.players.length === 1) {
      alert('Your score is: ' + player.score);
    } else {
      console.log(Math.max.apply(null, game.players));
    }
  },

  // Get next player functionality
  nextPlayer: function () {
  }

};
//======= game object end =========//

//======= player object begin =========//

function Player() {
  this.name = "";
  this.score = 0;
  this.pieces = {};
}

//======= player object end =========//

//======= die object begin =========//
function Die () {
  this.value = null;
  this.roll = function () {
    this.value = Math.floor((Math.random() * 6)) + 1;
    return this.value;
  };
}
//======= die object end =========//

game.init();
