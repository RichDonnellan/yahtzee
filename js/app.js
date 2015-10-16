console.log('Script initialized.'); // Initial log to confirm script is working

// ======= Game object begin =========
var game = {
  maxPlayers: 4, // set max players option
  players: [], // players array will contain Player object(s)
  currentPlayer: {},
  dice: [], // dice array will contain 5 Die objects
  rollsLeft: 3, // max amount of rolls
  MAXROUND: 13, // max rounds
  categories: [],
  winner: false,

  // Initialize it all baby
  init: function() {
    $('#add-player').hide().fadeIn(1500); // Hide and fadeIn add player button
    $('#dice-board, #roll-dice, #score-card, #start-game, #score-wrapper, #new-game').hide(); // hide elements until called for
    $('#name-input').on('keypress', function(e) { // allow keyboard entry (enter) to add player
      if (e.which === 13) {
        game.addPlayer();
      }
    });
    // Set click events
    $('#add-btn').on('click', game.addPlayer); // call add player method if button clicked
    $('#start-btn').on('click', game.startGame); // call add player method
    $('#roll-btn').on('click', game.rollDice); // call roll dice method if button clicked
    $('#new-btn').on('click', game.newGame); // call new game method if button clicked
    $('#score-card button').one('click', game.populateScore);
  },

  // Create a new player object and add player to the players array
  addPlayer: function() {
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

  createDice: function() {
    while (game.dice.length < 5) {
      var newDie = new Die(); // create a new die
      game.dice.push(newDie); // push entry to dice array => Object
      console.log('Die created.'); // confirmation message
    }
  },

  // Start game functionality
  startGame: function() {
    // $('#add-btn').off('click', game.addPlayer); // remove add player click event
    // $('#start-btn').off('click', game.startGame); // remove start game click event
    $('#add-player, #start-game').fadeOut(300);
    $('#dice-board').delay(400).fadeIn(1000);
    $('#roll-dice').delay(500).fadeIn(1000);
    $('#rolls-left').html(game.rollsLeft); // insert remaining rolls
    $.each(game.players, function(index) {
      $('#players-display').append('<div class="player-info"><span class="player-name">' + game.players[index].name + ':</span> ' + '<span class="player-score">' + game.players[index].score + '</span></div>');
    });
    $('#score-card').delay(350).fadeIn(1000);
    $('#score-wrapper').delay(500).fadeIn(1000);
    //$('#new-game').delay(2000).fadeIn();
    game.currentPlayer = game.players[0];
    game.createDice(); // create die objects
  },

  // Dice roll functionality
  rollDice: function() {
    $('.dice').addClass('choose');
    if (game.rollsLeft === 0) {
      console.log('Next round.');
      //game.nextRound();
    } else {
      console.log('Clicked'); // check button wiring

      $.each(game.dice, function(index) {
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

  chooseDice: function() {
    var diceID = ($(this).attr('id').substr(3, 1));
    console.log('Die:', diceID);
    if (!(game.dice[diceID].held)) {
      game.dice[diceID].held = true;
      console.log('Die held.');
      console.log('Held:', game.dice[diceID].held);
    } else {
      game.dice[diceID].held = false;
      console.log('Die released.');
      console.log('Held:', game.dice[diceID].held);
    }
    $(this).toggleClass('held');
  },

  nextRound: function() {
    var count = 0;
    if (game.players.length === 1) {
      game.playerTurn.round++;
      game.dice = [];
      game.rollsLeft = 3;
      $('#rolls-left').html(game.rollsLeft);
      console.log('Round:', game.playerTurn.round);
    } else {
      game.playerTurn++;
    }
  },

  populateScore: function() {
    console.log('Clicked');
    //console.log(this.id);
    switch (this.id) {
      case 'ones':
        for (var i = 0, len = game.dice.length; i < len; i++) {
          if (game.dice[i].value === 1) {
            console.log('add ones');
            game.currentPlayer.scoreCard.ones++;
            $(this).addClass('disabled');
          }
        }
        console.log(game.currentPlayer.scoreCard.ones);
        game.currentPlayer.upperSubTotal();
        game.currentPlayer.updateScore();
        break;
      case 'twos':
        for (var i = 0, len = game.dice.length; i < len; i++) {
          if (game.dice[i].value === 2) {
            console.log('add twos');
            game.currentPlayer.scoreCard.twos += 2;
            $(this).addClass('disabled');
          }
        }
        console.log(game.currentPlayer.scoreCard.twos);
        game.currentPlayer.upperSubTotal();
        game.currentPlayer.updateScore();
        break;
      case 'threes':
        for (var i = 0, len = game.dice.length; i < len; i++) {
          if (game.dice[i].value === 3) {
            console.log('add threes');
            game.currentPlayer.scoreCard.threes += 3;
            $(this).addClass('disabled');
          }
        }
        console.log(game.currentPlayer.scoreCard.threes);
        game.currentPlayer.upperSubTotal();
        game.currentPlayer.updateScore();
        break;
      case 'fours':
        for (var i = 0, len = game.dice.length; i < len; i++) {
          if (game.dice[i].value === 4) {
            console.log('add fours');
            game.currentPlayer.scoreCard.threes += 4;
            $(this).addClass('disabled');
          }
        }
        console.log(game.currentPlayer.scoreCard.fours);
        game.currentPlayer.upperSubTotal();
        game.currentPlayer.updateScore();
        break;
      case 'fives':
        for (var i = 0, len = game.dice.length; i < len; i++) {
          if (game.dice[i].value === 5) {
            console.log('add fives');
            game.currentPlayer.scoreCard.fives += 5;
            $(this).addClass('disabled');
          }
        }
        console.log(game.currentPlayer.scoreCard.fives);
        game.currentPlayer.upperSubTotal();
        game.currentPlayer.updateScore();
        break;
      case 'sixes':
        for (var i = 0, len = game.dice.length; i < len; i++) {
          if (game.dice[i].value === 6) {
            console.log('add sixes');
            game.currentPlayer.scoreCard.sixes += 6;
            $(this).addClass('disabled');
          }
        }
        console.log(game.currentPlayer.scoreCard.sixes);
        game.currentPlayer.upperSubTotal();
        game.currentPlayer.updateScore();
        break;
      default:

    }

  },

  // newGame: function () {
  //   game.players = [];
  //   $('#players-display').fadeOut();
  // },

  // Get winner functionality
  getWinner: function() {
    console.log('Winner!');
    // if (game.players.length === 1) {
    //   alert('Your score is: ' + player.score);
    // } else {
    //   console.log(Math.max.apply(null, game.players));
    // }
  }
};

// ======= Player object begin =========
function Player() {
  this.name = '';
  this.round = 1;
  this.scoreCard = {
    ones: 0,
    twos: 0,
    threes: 0,
    fours: 0,
    fives: 0,
    sixes: 0,
    threeOfAKind: 0,
    fourOfAKind: 0,
    fullHouse: 0,
    smStraight: 0,
    lgStraight: 0,
    yahtzee: 0,
    chance: 0,
    upperSub: 0,
    lowerSub: 0
  };
  this.score = 0;
}

Player.prototype.upperSubTotal = function() {
  this.scoreCard.upperSub = this.scoreCard.ones + this.scoreCard.twos + this.scoreCard.threes + this.scoreCard.fours + this.scoreCard.fives + this.scoreCard.sixes;
}
Player.prototype.lowerSubTotal = function() {
  this.scoreCard.lowerSub = this.scoreCard.threeOfAKind + this.scoreCard.fourOfAKind + this.scoreCard.fullHouse + this.scoreCard.smStraight + this.scoreCard.lgStraight + this.scoreCard.yahtzee + this.scoreCard.chance;
}
Player.prototype.updateScore = function() {
  this.score = this.scoreCard.upperSub + this.scoreCard.lowerSub;
}


// ======= Die object begin =========
function Die() {
  this.value = null;
  this.held = false;
  this.roll = function() {
    //console.log('Rolling: ', this);
    this.value = Math.floor((Math.random() * 6)) + 1;
    console.log('Die value:', this.value);
  };
}


//======= Category object begin =========//
function Category() {
  this.name = null;
  this.value = null;
  this.chosen = false;
}

game.init(); // Initialize game
