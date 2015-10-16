console.log('Script initialized.'); // Initial log to confirm script is working

// ======= Game object begin =========
var game = {
  maxPlayers: 2, // set max players option
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
    //$('#new-btn').on('click', game.newGame); // call new game method if button clicked
    // $('#score-card').one('click', 'button', game.populateScore); // call populate score method on score card categories
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
    $('.dice').addClass('choose'); // add pointer cursor
      console.log('Clicked'); // check button wiring

      $.each(game.dice, function(index) {
        if (!game.dice[index].held) {
          //$('.dice').addClass('animated swing');
          game.dice[index].roll();
          $('#die' + index).html(game.dice[index].value);
        }
      });

    game.rollsLeft--;
    $('#rolls-left').text(game.rollsLeft);
    $('.dice').off('click', game.chooseDice);
    $('.dice').on('click', game.chooseDice); // call roll dice method if button clicked
    // $('#score-card').off('click', 'button', game.populateScore); // call populate score method on score card categories
    $('#score-card').one('click', 'button', game.populateScore); // call populate score method on score card categories
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
    console.log('Calling function.');

    game.rollsLeft = 3;
    if(game.players[1].round === game.MAXROUND) {
      game.getWinner();
    } else if (game.currentPlayer === game.players[0]) {
      game.currentPlayer.round++;
      game.currentPlayer = game.players[1];
    } else {
      game.currentPlayer.round++;
      game.currentPlayer = game.players[0];
    }
    $('#score-card button').each(function(index) {
      console.log("==========", $(this).hasClass("disabled"),this.id);
      switch (this.id) {
        case "ones":
          if(($(this).hasClass("disabled")) && (game.currentPlayer.scoreCard.ones.chosen == false)){
            $(this).removeClass("disabled");
          }
        case "twos":
          if(($(this).hasClass("disabled")) && (game.currentPlayer.scoreCard.twos.chosen == false)){
            $(this).removeClass("disabled");
          }
        case "threes":
          if(($(this).hasClass("disabled")) && (game.currentPlayer.scoreCard.threes.chosen == false)){
            $(this).removeClass("disabled");
          }
        case "fours":
          if(($(this).hasClass("disabled")) && (game.currentPlayer.scoreCard.fours.chosen == false)){
            $(this).removeClass("disabled");
          }
        case "fives":
          if(($(this).hasClass("disabled")) && (game.currentPlayer.scoreCard.fives.chosen == false)){
            $(this).removeClass("disabled");
          }
        case "sixes":
          if(($(this).hasClass("disabled")) && (game.currentPlayer.scoreCard.sixes.chosen == false)){
            $(this).removeClass("disabled");
          }
        case "threeOfAKind":
          if(($(this).hasClass("disabled")) && (game.currentPlayer.scoreCard.threeOfAKind.chosen == false)){
            $(this).removeClass("disabled");
          }
        case "fourOfAKind":
          if(($(this).hasClass("disabled")) && (game.currentPlayer.scoreCard.fourOfAKind.chosen == false)){
            $(this).removeClass("disabled");
          }
        case "smStraight":
          if(($(this).hasClass("disabled")) && (game.currentPlayer.scoreCard.smStraight.chosen == false)){
            $(this).removeClass("disabled");
          }
        case "lgStraight":
          if(($(this).hasClass("disabled")) && (game.currentPlayer.scoreCard.lgStraight.chosen == false)){
            $(this).removeClass("disabled");
          }
        case "fullHouse":
          if(($(this).hasClass("disabled")) && (game.currentPlayer.scoreCard.fullHouse.chosen == false)){
            $(this).removeClass("disabled");
          }
        case "yahtzee":
          if(($(this).hasClass("disabled")) && (game.currentPlayer.scoreCard.yahtzee.chosen == false)){
            $(this).removeClass("disabled");
          }
        case "chance":
          if(($(this).hasClass("disabled")) && (game.currentPlayer.scoreCard.chance.chosen == false)){
            $(this).removeClass("disabled");
          }
          break;
        default:
        break;

      }
      // switch (this.id) {
      //   case 'ones':
      //     if($(this).hasClass('disabled') && !game.currentPlayer.scoreCard.ones.chosen) {
      //       $(this).removeClass('disabled');
      //     }
      //     break;
      //   default:
      //
      // }

    });
  },

  // Trigger score card population
  populateScore: function() {
    console.log('Clicked');

    //console.log(this.id);
    switch (this.id) {
      case 'ones':
        for (var i = 0, len = game.dice.length; i < len; i++) {
          if (game.dice[i].value === 1) {
            console.log('add ones');
            game.currentPlayer.scoreCard.ones.value++;
            $('#ones-total').html(game.currentPlayer.scoreCard.ones.value);
            $(this).addClass('disabled');
            game.currentPlayer.scoreCard.ones.chosen = true;
          }
        }
        game.currentPlayer.scoreCard.ones.chosen = true;
        console.log("change ones for", game.currentPlayer.name,game.currentPlayer.scoreCard.ones);
        $('#ones-total').html(game.currentPlayer.scoreCard.ones.value);
        game.currentPlayer.upperSubTotal();
        game.currentPlayer.updateScore();
        game.nextRound();
        break;
      case 'twos':
        for (var i = 0, len = game.dice.length; i < len; i++) {
          if (game.dice[i].value === 2) {
            console.log('add twos');
            game.currentPlayer.scoreCard.twos.value += 2;
            $('#twos-total').html(game.currentPlayer.scoreCard.twos.value);
            $(this).addClass('disabled');
            game.currentPlayer.scoreCard.twos.chosen = true;
          }
        }
        game.currentPlayer.scoreCard.twos.chosen = true;
        console.log(game.currentPlayer.scoreCard.twos.value);
        $('#twos-total').html(game.currentPlayer.scoreCard.twos.value);
        game.currentPlayer.upperSubTotal();
        game.currentPlayer.updateScore();
        game.nextRound();
        break;
      case 'threes':
        for (var i = 0, len = game.dice.length; i < len; i++) {
          if (game.dice[i].value === 3) {
            console.log('add threes');
            game.currentPlayer.scoreCard.threes.value += 3;
            $('#threes-total').html(game.currentPlayer.scoreCard.threes.value);
            $(this).addClass('disabled');
          }
        }
        game.currentPlayer.scoreCard.threes.chosen = true;
        console.log(game.currentPlayer.scoreCard.threes.value);
        $('#threes-total').html(game.currentPlayer.scoreCard.threes.value);
        game.currentPlayer.upperSubTotal();
        game.currentPlayer.updateScore();
        game.nextRound();
        break;
      case 'fours':
        for (var i = 0, len = game.dice.length; i < len; i++) {
          if (game.dice[i].value === 4) {
            console.log('add fours');
            game.currentPlayer.scoreCard.fours.value += 4;
            $('#fours-total').html(game.currentPlayer.scoreCard.fours.value);
            $(this).addClass('disabled');
          }
        }
        game.currentPlayer.scoreCard.fours.chosen = true;
        console.log(game.currentPlayer.scoreCard.fours.value);
        $('#fours-total').html(game.currentPlayer.scoreCard.fours.value);
        game.currentPlayer.upperSubTotal();
        game.currentPlayer.updateScore();
        game.nextRound();
        break;
      case 'fives':
        for (var i = 0, len = game.dice.length; i < len; i++) {
          if (game.dice[i].value === 5) {
            console.log('add fives');
            game.currentPlayer.scoreCard.fives.value += 5;
            $('#fives-total').html(game.currentPlayer.scoreCard.fives.value);
            $(this).addClass('disabled');
          }
        }
        game.currentPlayer.scoreCard.fives.chosen = true;
        console.log(game.currentPlayer.scoreCard.fives.value);
        $('#fives-total').html(game.currentPlayer.scoreCard.fives.value);
        game.currentPlayer.upperSubTotal();
        game.currentPlayer.updateScore();
        game.nextRound();
        break;
      case 'sixes':
        for (var i = 0, len = game.dice.length; i < len; i++) {
          if (game.dice[i].value === 6) {
            console.log('add sixes');
            game.currentPlayer.scoreCard.sixes.value += 6;
            $('#sixes-total').html(game.currentPlayer.scoreCard.sixes.value);
            $(this).addClass('disabled');
          }
        }
        game.currentPlayer.scoreCard.sixes.chosen = true;
        console.log(game.currentPlayer.scoreCard.sixes.value);
        $('#sixes-total').html(game.currentPlayer.scoreCard.sixes.value);
        game.currentPlayer.upperSubTotal();
        game.currentPlayer.updateScore();
        game.nextRound();
        break;
      case 'fullHouse':
        var unique = [];
        for (var i = 0, len = game.dice.length; i < len; i++) {
          unique.push(game.dice[i].value);
        }
        unique = unique.sort();
        console.log(unique);
        var u1 = unique[0]
        var y1 = unique[3]
        var u2 = unique[4]
        var y2 = unique[1]

          // if ( (u1 == unique[1] && u1 == unique[2] && y1 == unique[4]) || (u2 == unique[3] && u2 == unique[2] && y1 == unique[0]) ) {
          if ((unique[0] === unique[1] && unique[2] === unique[3] && unique[3] === unique[4]) || (unique[0] === unique[1] && unique[1] === unique[2] && unique[3] && unique[4])){
            console.log('add full house');
            game.currentPlayer.scoreCard.fullHouse.value = 25;
            $('#fh-total').html(game.currentPlayer.scoreCard.fullHouse.value);
            $(this).addClass('disabled');
          }
       game.currentPlayer.scoreCard.fives.fullHouse = true;
        console.log(game.currentPlayer.scoreCard.fullHouse.value);
        $('#fh-total').html(game.currentPlayer.scoreCard.fullHouse.value);
        game.currentPlayer.lowerSubTotal();
        game.currentPlayer.updateScore();
        game.nextRound();
        break;
      case 'smStraight':
        var unique = [];
        for (var i = 0, len = game.dice.length; i < len; i++) {
          unique.push(game.dice[i].value);
        }
        unique = unique.removeDuplicates().join('');
        console.log(unique);
          if ( unique == '1234' || unique == '2345' || unique == '3456') {
            console.log('add small straight');
            game.currentPlayer.scoreCard.smStraight.value = 30;
            $('#sm-total').html(game.currentPlayer.scoreCard.smStraight.value);
            $(this).addClass('disabled');
          }
          game.currentPlayer.scoreCard.smStraight.chosen = true;
        console.log(game.currentPlayer.scoreCard.smStraight.value);
        $('#sm-total').html(game.currentPlayer.scoreCard.smStraight.value);
        game.currentPlayer.lowerSubTotal();
        game.currentPlayer.updateScore();
        game.nextRound();
        break;
      case 'lgStraight':
        var unique = [];
        for (var i = 0, len = game.dice.length; i < len; i++) {
          unique.push(game.dice[i].value);
        }
        unique = unique.removeDuplicates().join('');
        console.log(unique);
          if ( unique == '12345' || unique == '23456') {
            console.log('add small straight');
            game.currentPlayer.scoreCard.lgStraight.value = 40;
            $('#lg-total').html(game.currentPlayer.scoreCard.lgStraight.value);
            $(this).addClass('disabled');
          }
          game.currentPlayer.scoreCard.lgStraight.chosen = true;
        console.log(game.currentPlayer.scoreCard.lgStraight.value);
        $('#lg-total').html(game.currentPlayer.scoreCard.lgStraight.value);
        game.currentPlayer.lowerSubTotal();
        game.currentPlayer.updateScore();
        game.nextRound();
        break;
      case 'yahtzee':
        var yahtzeeCounter = 1,
            match = game.dice[0].value;

          for (var i = 1; i < 5; i++) {
            if(game.dice[i].value !== match){
              // console.log('add yahtzee');
              // game.currentPlayer.scoreCard.yahtzee = 50;
               $('#yahtzee-total').html(game.currentPlayer.scoreCard.yahtzee.value);
              $(this).addClass('disabled');
              game.currentPlayer.scoreCard.yahtzee.chosen = true;
              game.nextRound();
              break;
            }
            else{
                yahtzeeCounter++;
            }
        }
        if(yahtzeeCounter == 5){
          game.currentPlayer.scoreCard.yahtzee.value = 50;
        }
        game.currentPlayer.scoreCard.yahtzee.chosen = true;
        console.log(game.currentPlayer.scoreCard.yahtzee).value;
        $('#yahtzee-total').html(game.currentPlayer.scoreCard.yahtzee.value);
        game.currentPlayer.lowerSubTotal();
        game.currentPlayer.updateScore();
        game.nextRound();
        break;
      case 'chance':
        for (var i = 0, len = game.dice.length; i < len; i++) {
          console.log('add chance');
          game.currentPlayer.scoreCard.chance.value += game.dice[i].value;
          $('#chance-total').html(game.currentPlayer.scoreCard.chance.value);
          $(this).addClass('disabled');
        }
        game.currentPlayer.scoreCard.chance.chosen = true;
        console.log(game.currentPlayer.scoreCard.chance.value);
        game.currentPlayer.lowerSubTotal();
        game.currentPlayer.updateScore();
        game.nextRound();
        break;
      default:
      break;
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
    if (game.players[0].score > game.players[1].score) {
      console.log('Player',game.players[0].name);
    } else if(game.players[0].score < game.players[1].score) {
      console.log('Player',game.players[1].name);
    } else {
      console.log('Tie');
  }
}
};

// ======= Player object begin =========
function Player() {
  this.name = '';
  this.round = 1;
  this.scoreCard = {
    ones: { value: 0 , chosen: false},
    twos: { value: 0 , chosen: false},
    threes: { value: 0 , chosen: false},
    fours: { value: 0 , chosen: false},
    fives: { value: 0 , chosen: false},
    sixes: { value: 0 , chosen: false},
    threeOfAKind:{ value: 0 , chosen: false},
    fourOfAKind: { value: 0 , chosen: false},
    fullHouse: { value: 0 , chosen: false},
    fullHouse: { value: 0 , chosen: false},
    lgStraight: { value: 0 , chosen: false},
    yahtzee: { value: 0 , chosen: false},
    chance: { value: 0 , chosen: false},
    upperSub: 0,
    lowerSub: 0
  };
  this.score = 0;
}

Player.prototype.upperSubTotal = function() {
  this.scoreCard.upperSub = this.scoreCard.ones.value + this.scoreCard.twos.value + this.scoreCard.threes.value + this.scoreCard.fours.value + this.scoreCard.fives.value + this.scoreCard.sixes.value;
}
Player.prototype.lowerSubTotal = function() {
  this.scoreCard.lowerSub = this.scoreCard.threeOfAKind.value + this.scoreCard.fourOfAKind.value + this.scoreCard.fullHouse.value + this.scoreCard.fullHouse.value + this.scoreCard.lgStraight.value + this.scoreCard.yahtzee.value + this.scoreCard.chance.value;
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

Array.prototype.removeDuplicates = function (){
  var temp=new Array();
  this.sort();
  for(i=0;i<this.length;i++){
    if(this[i]==this[i+1]) {continue}
    temp[temp.length]=this[i];
  }
  return temp;
}

game.init(); // Initialize game
