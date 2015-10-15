console.log('Script initialized.'); // Initial log to confirm script is working

//======= Game object begin =========//
var game = {
  maxPlayers: 4, // set max players option
  players: [], // players array will contain Player object(s)
  playerTurn: {},
  dice: [], // dice array will contain 5 Die objects
  rollsLeft: 3, // max amount of rolls
  MAXROUND: 13, // max rounds
  winner: false,

  // Initialize the game
  init: function () {
    $('#add-player').hide().fadeIn(1500); // Hide and fadeIn add player button
    $('#dice-board, #roll-dice, #score-card, #start-game, #score-wrapper, #new-game').hide(); // hide elements until called for
    $('#name-input').on('keypress', function (e) { // allow keyboard entry (enter) to add player
      if (e.which === 13) {
        game.addPlayer();
      }
    });
  // Set click events
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

  createDice: function () {
    while (game.dice.length < 5) {
      var newDie = new Die(); // create a new die
      game.dice.push(newDie); // push entry to dice array => Object
      console.log('Die created.'); // confirmation message
    }
  },

  // Start game functionality
  startGame: function () {
    // $('#add-btn').off('click', game.addPlayer); // remove add player click event
    // $('#start-btn').off('click', game.startGame); // remove start game click event
    $('#add-player, #start-game').fadeOut(300);
    $('#dice-board').delay(400).fadeIn(1000);
    $('#roll-dice').delay(500).fadeIn(1000);
    $('#rolls-left').html(game.rollsLeft);
    $.each(game.players, function(index) {
      $('#players-display').append('<div class="player-info"><span class="player-name">' + game.players[index].name + ':</span> ' + '<span class="player-score">' + game.players[index].score + '</span></div>');
    });
    $('#score-card').delay(350).fadeIn(1000);
    $('#score-wrapper').delay(500).fadeIn(1000);
    //$('#new-game').delay(2000).fadeIn();
    game.playerTurn = game.players[0];
    game.createDice(); // create die objects
  },

  // Dice roll functionality
  rollDice: function () {
    $('.dice').addClass('choose');
    if (game.rollsLeft === 0) {
      console.log('Get next player');
      game.nextRound();
    } else {
        console.log('Clicked'); // check button wiring

        $.each(game.dice, function (index) {
          if (!game.dice[index].held) {
            //$('.dice').addClass('animated swing');
            game.dice[index].roll();
            $('#die' + index).html(game.dice[index].value);
          }
        });
      }
      game.rollsLeft--;
      $('#rolls-left').text(game.rollsLeft);
      $('.dice').off('click', game.chooseDice);
      $('.dice').on('click', game.chooseDice); // call roll dice method if button clicked
  },

  chooseDice: function () {
    // if (!game.rollsLeft === 0) {
      //console.log($(this));
      var diceID = ($(this).attr('id').substr(3,1));
      console.log('Die:', diceID);
      if (!(game.dice[diceID].held)) {
        game.dice[diceID].held = true;
        console.log('Die held.');
        console.log('Held:',game.dice[diceID].held);
      } else {
          game.dice[diceID].held = false;
          console.log('Die released.');
          console.log('Held:',game.dice[diceID].held);
        }
        $(this).toggleClass('held');
      //}
  },

  nextRound: function () {
    var count = 0;
    if (game.playerTurn.round === game.MAXROUND) {
      game.getWinner();
    } else if (game.players.length === 1) {
      game.playerTurn.round++;
      game.rollsLeft = 3;
      $('#rolls-left').html(game.rollsLeft);
      console.log('Round:', game.playerTurn.round);
    } else {
      game.playerTurn++;
    }
  },

  // newGame: function () {
  //   game.players = [];
  //   $('#players-display').fadeOut();
  // },

  // Get winner functionality
  getWinner: function () {
    console.log('Winner!');
    // if (game.players.length === 1) {
    //   alert('Your score is: ' + player.score);
    // } else {
    //   console.log(Math.max.apply(null, game.players));
    // }
  }
};

//======= game object end =========//

//======= player object begin =========//

function Player() {
  this.name = '';
  this.score = 0;
  this.keep = {};
  this.round = 1;
}

//======= player object end =========//

//======= die object begin =========//
function Die() {
  this.value = null;
  this.held = false;
  this.roll = function() {
    //console.log('Rolling: ', this);
    this.value = Math.floor((Math.random() * 6)) + 1;
    console.log('Die value:', this.value);
  };
}
//======= die object end =========//

//======= category object begin =========//
function Category() {
  this.name = null;
  this.value = null;
  this.chosen = false;
}
//======= category object end =========//

game.init();


//if die has class .held
//don't roll on subsequent rolls
//toggle class disabled
