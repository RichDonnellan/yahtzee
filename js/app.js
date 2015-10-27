console.log('Script initialized.'); // Initial log to confirm script is working

// ======= Game object begin =========
var game = {
  maxPlayers: 1, // set max players option
  players: [], // players array will contain Player object(s)
  currentPlayer: {},
  dice: [], // dice array will contain 5 Die objects
  TOTALDICE: 5,
  rollsLeft: 3, // max amount of rolls
  MAXROUND: 14, // 13 rounds PLUS one to allow last round to be played
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
    // Set global click events
    $('#add-btn').on('click', game.addPlayer); // call add player method if button clicked
    $('#start-btn').on('click', game.startGame); // call add player method
    $('#roll-btn').on('click', game.rollDice); // call roll dice method if button clicked
    //$('#new-btn').on('click', game.newGame); // call new game method if button clicked
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
    if (game.rollsLeft !== 0) {
    $('.dice').addClass('choose'); // add pointer cursor
      console.log('Clicked'); // check button wiring
      $.each(game.dice, function(index) {
        if (!game.dice[index].held) {
          game.dice[index].roll();
          $('#die' + index).html(diePip);
        }
      });
      game.rollsLeft--;
      $('#rolls-left').text(game.rollsLeft);
    } else {
      alert('You must score your turn before you can roll again.')
    }
    $('.dice').off('click', game.chooseDice);
    $('.dice').on('click', game.chooseDice); // call roll dice method if button clicked
    $('#score-card').off('click', 'button', game.populateScore); // call populate score method on score card categories
    $('#score-card').on('click', 'button', game.populateScore); // call populate score method on score card categories
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
    console.log('Calling nextRound function.');

    game.rollsLeft = 3;
    $('#rolls-left').text(game.rollsLeft);
    $('.player-score').text(game.currentPlayer.score);
    $('#upperSub').text(game.currentPlayer.scoreCard.upperSub);
    $('#lowerSub').text(game.currentPlayer.scoreCard.lowerSub);
    $('.dice').removeClass('held').text('');
    $.each(game.dice, function(index) {
      game.dice[index].held = false;
      game.dice[index].value = null;
    });
    game.currentPlayer.round++;
    console.log('Round:', game.currentPlayer.round);
    $('.dice').off('click', game.chooseDice).removeClass('choose');
    $('#score-card').off('click', 'button', game.populateScore); // call populate score method on score card categories

    if (game.currentPlayer.round === game.MAXROUND) {
      game.getWinner();
    }

    // if(game.players[1].round === game.MAXROUND) {
    //   game.getWinner();
    // } else if (game.currentPlayer === game.players[0]) {
    //   game.currentPlayer.round++;
    //   game.currentPlayer = game.players[1];
    // } else {
    //   game.currentPlayer.round++;
    //   game.currentPlayer = game.players[0];
    // }
    // $('#score-card button').each(function(index) {
    //   console.log("==========", $(this).hasClass("disabled"),this.id);
    //   switch (this.id) {
    //     case "ones":
    //       if(($(this).hasClass("disabled")) && (game.currentPlayer.scoreCard.ones.chosen == false)){
    //         $(this).removeClass("disabled");
    //       }
    //       game.changeScoreCard("ones");
    //     case "twos":
    //       if(($(this).hasClass("disabled")) && (game.currentPlayer.scoreCard.twos.chosen == false)){
    //         $(this).removeClass("disabled");
    //       }
    //       game.changeScoreCard("twos");
    //     case "threes":
    //       if(($(this).hasClass("disabled")) && (game.currentPlayer.scoreCard.threes.chosen == false)){
    //         $(this).removeClass("disabled");
    //       }
    //       game.changeScoreCard("threes");
    //     case "fours":
    //       if(($(this).hasClass("disabled")) && (game.currentPlayer.scoreCard.fours.chosen == false)){
    //         $(this).removeClass("disabled");
    //       }
    //       game.changeScoreCard("fours");
    //     case "fives":
    //       if(($(this).hasClass("disabled")) && (game.currentPlayer.scoreCard.fives.chosen == false)){
    //         $(this).removeClass("disabled");
    //       }
    //       game.changeScoreCard("fives");
    //     case "sixes":
    //       if(($(this).hasClass("disabled")) && (game.currentPlayer.scoreCard.sixes.chosen == false)){
    //         $(this).removeClass("disabled");
    //       }
    //       game.changeScoreCard("sixes");
    //     case "threeOfAKind":
    //       if(($(this).hasClass("disabled")) && (game.currentPlayer.scoreCard.threeOfAKind.chosen == false)){
    //         $(this).removeClass("disabled");
    //       }
    //       game.changeScoreCard("threeOfAKind");
    //     case "fourOfAKind":
    //       if(($(this).hasClass("disabled")) && (game.currentPlayer.scoreCard.fourOfAKind.chosen == false)){
    //         $(this).removeClass("disabled");
    //       }
    //       game.changeScoreCard("fourOfAKind");
    //     case "smStraight":
    //       if(($(this).hasClass("disabled")) && (game.currentPlayer.scoreCard.smStraight.chosen == false)){
    //         $(this).removeClass("disabled");
    //       }
    //       game.changeScoreCard("smStraight");
    //     case "lgStraight":
    //       if(($(this).hasClass("disabled")) && (game.currentPlayer.scoreCard.lgStraight.chosen == false)){
    //         $(this).removeClass("disabled");
    //       }
    //       game.changeScoreCard("lgStraight");
    //     case "fullHouse":
    //       if(($(this).hasClass("disabled")) && (game.currentPlayer.scoreCard.fullHouse.chosen == false)){
    //         $(this).removeClass("disabled");
    //       }
    //       game.changeScoreCard("fullHouse");
    //     case "yahtzee":
    //       if(($(this).hasClass("disabled")) && (game.currentPlayer.scoreCard.yahtzee.chosen == false)){
    //         $(this).removeClass("disabled");
    //       }
    //       game.changeScoreCard("yahtzee");
    //     case "chance":
    //       if(($(this).hasClass("disabled")) && (game.currentPlayer.scoreCard.chance.chosen == false)){
    //         $(this).removeClass("disabled");
    //       }
    //       game.changeScoreCard("chance");
    //       break;
    //     default:
    //     break;
    //
    //   }
      // switch (this.id) {
      //   case 'ones':
      //     if($(this).hasClass('disabled') && !game.currentPlayer.scoreCard.ones.chosen) {
      //       $(this).removeClass('disabled');
      //     }
      //     break;
      //   default:
      //
      // }

    // });
  },

  // Trigger score card population
  populateScore: function() {
    console.log('Clicked');
    var self = this.id,
        square = game.currentPlayer.scoreCard;
    //console.log(this.id);
    switch (this.id) {
      case 'ones':
        for (var i = 0; i < game.TOTALDICE; i++) {
          if (game.dice[i].value === 1) {
            console.log('add ' + self);
            square[self].value++;
          }
        }
        break;
      case 'twos':
        for (var i = 0; i < game.TOTALDICE; i++) {
          if (game.dice[i].value === 2) {
            console.log('add ' + self);
            square[self].value += 2;
          }
        }
        break;
      case 'threes':
        for (var i = 0; i < game.TOTALDICE; i++) {
          if (game.dice[i].value === 3) {
            console.log('add ' + self);
            square[self].value += 3;
          }
        }
        break;
      case 'fours':
        for (var i = 0; i < game.TOTALDICE; i++) {
          if (game.dice[i].value === 4) {
            console.log('add ' + self);
            square[self].value += 4;
          }
        }
        break;
      case 'fives':
        for (var i = 0; i < game.TOTALDICE; i++) {
          if (game.dice[i].value === 5) {
            console.log('add ' + self);
            square[self].value += 5;
          }
        }
        break;
      case 'sixes':
        for (var i = 0; i < game.TOTALDICE; i++) {
          if (game.dice[i].value === 6) {
            console.log('add ' + self);
            square[self].value += 6;
          }
        }
        break;
        case 'threeOfAKind':
          for (var i = 0; i < game.TOTALDICE; i++) {
            if (game.dice[i].value === 6) {
              console.log('add ' + self);
              //square.sixes.value += 6;
            }
          }
          break;
      case 'fullHouse':
        var fhUnique = [];
        for (var i = 0; i < game.TOTALDICE; i++) {
          fhUnique.push(game.dice[i].value);
        }
        fhUnique = fhUnique.sort();
        // [0]===[1] [2]===[3]===[4]
        if ((fhUnique[0] === fhUnique[1]) && (fhUnique[2] === fhUnique[3] && fhUnique[2] === fhUnique[4]) || (fhUnique[0] === fhUnique[1] && fhUnique[0] === fhUnique[2]) && (fhUnique[3] && fhUnique[4])) {
          console.log('add ' + self);
          square[self].value = 25;
        }
        break;
      case 'smStraight':
        var smUnique = [];
        for (var i = 0; i < game.TOTALDICE; i++) {
          smUnique.push(game.dice[i].value);
        }
        smUnique = smUnique.removeDuplicates().join('');
        console.log(smUnique);
        if (smUnique.indexOf('1234') !== -1 || smUnique.indexOf('2345') !== -1 || smUnique.indexOf('3456') !== -1) {
          console.log('add ' + self);
          square[self].value = 30;
        }
        break;
      case 'lgStraight':
        var lgUnique = [];
        for (var i = 0; i < game.TOTALDICE; i++) {
          lgUnique.push(game.dice[i].value);
        }
        lgUnique = lgUnique.sort().join('');
        console.log(lgUnique);
        if (lgUnique.indexOf('12345') !== -1 || lgUnique.indexOf('23456') !== -1) {
          console.log('add ' + self);
          square[self].value = 40;
        }
        break;
      case 'yahtzee':
        var yatzUnique = [];
        for (var i = 0; i < game.TOTALDICE; i++) {
          yatzUnique.push(game.dice[i].value);
        }
        yatzUnique = yatzUnique.allValuesSame();
        if (yatzUnique) {
          console.log('add ' + self);
          square[self].value = 50;
        }
          break;
      // case 'yahtzee':
      //   var yahtzeeCounter = 1,
      //       match = game.dice[0].value;
      //
      //   for (var i = 0; i < game.TOTALDICE; i++) {
      //     if (game.dice[i].value !== match) {
      //       // console.log('add yahtzee');
      //       // square.yahtzee = 50;
      //       break;
      //     } else {
      //       yahtzeeCounter++;
      //     }
      //   }
      //   if (yahtzeeCounter === game.TOTALDICE) {
      //     square[self].value = 50;
      //   }
      //   break;
      case 'chance':
        for (var i = 0; i < game.TOTALDICE; i++) {
          console.log('add ' + self);
          square[self].value += game.dice[i].value;
        }
        break;
      default:
        break;
    }

    square[self].chosen = true;
    console.log(square[self].value);
    $('#' + self + '-total').html(square[self].value);
    $(this).addClass('disabled');
    game.currentPlayer.upperSubTotal();
    game.currentPlayer.lowerSubTotal();
    game.currentPlayer.updateScore();
    game.nextRound();

  },

  // newGame: function () {
  //   game.players = [];
  //   $('#players-display').fadeOut();
  // },

  // Get winner functionality
  getWinner: function() {
    console.log('Game Over', game.currentPlayer.score);
    alert('Game Over', game.currentPlayer.score);
    // if (game.players.length === 1) {
    //   alert('Your score is: ' + player.score);
    // } else {
    //   console.log(Math.max.apply(null, game.players));
    // }
  //   if (game.players[0].score > game.players[1].score) {
  //     console.log('Player',game.players[0].name);
  //   } else if(game.players[0].score < game.players[1].score) {
  //     console.log('Player',game.players[1].name);
  //   } else {
  //     console.log('Tie');
  // }

},
changeScoreCard: function(scoreBox){
  console.log("changeScore",$(scoreBox +"-total"),  game.currentPlayer.scoreCard[scoreBox].value.toString());
  $("#" + scoreBox + "-total").html(game.currentPlayer.scoreCard[scoreBox].value.toString());
}
};

// ======= Player object begin =========
function Player() {
  this.name = '';
  this.round = 1;
  this.scoreCard = {
    ones: { value: 0, chosen: false},
    twos: { value: 0, chosen: false},
    threes: { value: 0, chosen: false},
    fours: { value: 0, chosen: false},
    fives: { value: 0, chosen: false},
    sixes: { value: 0, chosen: false},
    threeOfAKind:{ value: 0, chosen: false},
    fourOfAKind: { value: 0, chosen: false},
    fullHouse: { value: 0, chosen: false},
    smStraight: { value: 0, chosen: false},
    lgStraight: { value: 0, chosen: false},
    yahtzee: { value: 0, chosen: false},
    chance: { value: 0, chosen: false},
    upperSub: 0,
    lowerSub: 0
  };
  this.score = 0;
}

Player.prototype.upperSubTotal = function() {
  this.scoreCard.upperSub = this.scoreCard.ones.value + this.scoreCard.twos.value + this.scoreCard.threes.value + this.scoreCard.fours.value + this.scoreCard.fives.value + this.scoreCard.sixes.value;

}
Player.prototype.lowerSubTotal = function() {
  this.scoreCard.lowerSub = this.scoreCard.threeOfAKind.value + this.scoreCard.fourOfAKind.value + this.scoreCard.fullHouse.value + this.scoreCard.smStraight.value + this.scoreCard.lgStraight.value + this.scoreCard.yahtzee.value + this.scoreCard.chance.value;
}
Player.prototype.updateScore = function() {
  this.score = this.scoreCard.upperSub + this.scoreCard.lowerSub;
}


// ======= Die object begin =========
function Die() {
  this.value = null;
  this.held = false;
  this.roll = function() {
    var openSVG = '<svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">';
        openG = '<g fill="#000">',
        pip = '',
        closeG = '</g>',
        closeSVG = '</svg>',
        diePip = '',
        one = '<circle cx="39.5" cy="39.5" r="7.5"/>',
        two = '<circle cx="60.5" cy="17.5" r="7.5"/><circle cx="18.5" cy="61.5" r="7.5"/>',
        three = '<circle cx="60.5" cy="17.5" r="7.5"/><circle cx="39.5" cy="39.5" r="7.5"/><circle cx="18.5" cy="61.5" r="7.5"/>',
        four = '<circle cx="18.5" cy="17.5" r="7.5"/><circle cx="60.5" cy="17.5" r="7.5"/><circle cx="18.5" cy="61.5" r="7.5"/><circle cx="60.5" cy="61.5" r="7.5"/>',
        five = '<circle cx="18.5" cy="17.5" r="7.5"/><circle cx="60.5" cy="17.5" r="7.5"/><circle cx="39.5" cy="39.5" r="7.5"/><circle cx="18.5" cy="61.5" r="7.5"/><circle cx="60.5" cy="61.5" r="7.5"/>',
        six = '<circle cx="18.5" cy="17.5" r="7.5"/><circle cx="60.5" cy="17.5" r="7.5"/><circle cx="18.5" cy="39.5" r="7.5"/><circle cx="60.5" cy="39.5" r="7.5"/><circle cx="18.5" cy="61.5" r="7.5"/><circle cx="60.5" cy="61.5" r="7.5"/>';
    //console.log('Rolling: ', this);
    this.value = Math.floor((Math.random() * 6)) + 1;
    switch (this.value) {
      case 1:
        pip = one;
        break;
      case 2:
        pip = two;
        break;
      case 3:
        pip = three;
        break;
      case 4:
        pip = four;
        break;
      case 5:
        pip = five;
        break;
      case 6:
        pip = six;
        break;
      default:
        break;
    }
    diePip = openSVG + openG + pip + closeG + closeSVG;
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
  var temp = [];
  this.sort();
  for (i = 0; i < this.length; i++) {
    if (this[i] === this[i + 1]) {continue}
    temp[temp.length] = this[i];
  }
  return temp;
}

Array.prototype.allValuesSame = function() {
  for (var i = 1; i < this.length; i++) {
    if (this[i] !== this[0]) {
      return false;
    } else {
      return true;
    }
  }
}

game.init(); // Initialize game
