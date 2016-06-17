
// document ready:
$(function(){
  // hide the right pointer
  $('#player2Pointer').hide();

  // if a cell is clicked:  (how to make DRY?)
  $('#cell0').click(function(){
    clickCell(0);
  });
  $('#cell1').click(function(){
    clickCell(1);
  });
  $('#cell2').click(function(){
    clickCell(2);
  });
  $('#cell3').click(function(){
    clickCell(3);
  });
  $('#cell4').click(function(){
    clickCell(4);
  });
  $('#cell5').click(function(){
    clickCell(5);
  });
  $('#cell6').click(function(){
    clickCell(6);
  });
  $('#cell7').click(function(){
    clickCell(7);
  });
  $('#cell8').click(function(){
    clickCell(8);
  });
  //if reset is clicked:
  $('#resetBtn').click(function(){
    resetBoard();
  });
  //change the mouse pointer

});


// initialize the variables for the cells
var cellStatus = [null, null, null, null, null, null, null, null, null];
var p1Score = 0;
var p2Score = 0;
var goal = 3; // default game is best 2/3
var goesFirst = 0;  // player 1 goes first on first round
var roundDone = false; // set if round is complete
var gameDone = false;  // set if game is complete
var currentPlayer = 1; // 1 or 2


function resetBoard(){
  customAlert("Game on!", 1000);
  audioBell();
  //reset the game board for a new game
  cellStatus = [null, null, null, null, null, null, null, null, null];
  // update the DOM
  for (i = 0; i < 9; i++){ // iterate through all cells of the board.
    $('#cell' + i).html('<p></p>');
  }
  // toggle who starts first
  goesFirst = !goesFirst;
  // set current player to start the game
  goesFirst ? currentPlayer = 2 : currentPlayer = 1;
  // set current pointer
  pointerControl(currentPlayer);
  // reset the roundDone Boolean
  roundDone = false;
  // change whose turn it is
  // changePlayer();
}

function clickCell(cellNum){
  if (roundDone){ // if the board is clicked and the game is over, reset it
    resetBoard();
  } else {
    if (!cellStatus[cellNum]){ // if this cell is null allow marking, otherwise skip
      audioClick(); // play the click sound
      setCell(cellNum, currentPlayer);  // set the cell var to the current player
      if (currentPlayer == 1) {
       $('#cell' + cellNum).html('<img src="./images/x_red.png" class="red">'); // update the DOM
      }
      if (currentPlayer == 2) {
        $('#cell' + cellNum).html('<img src="./images/o_red.png" class="black">'); // update the DOM
      }
      // see if the round is over
      switch (getRoundWinner()){ // getRoundWinner() checks for a complete round
        case 1: // player 1 has won
          celebrate(1);
          break;
        case 2: // player 2 has won
          celebrate(2)
          break;
        case 3: // draw
          audioAww();
          customAlert("Tie", 1500);
          break;
        default: // keep playing
          changePlayer();  // now it's the other player's turn
          break;
      }
    } else {
      audioBuzz(); // play buzz sound from <audio> if the selected cell was occupied
    }
  }
}

//////////////////////////////////////////////////////
//      Sounds
//////////////////////////////////////////////////////
function audioAww() {
  $("#aww")[0].play(); // audio from HTML <audio>
}

function audioBell() {
  $("#bell")[0].play(); // audio from HTML <audio>
}
function audioBuzz() {
  $("#buzz")[0].play(); // audio from HTML <audio>
}

function audioCheer() {
  $("#cheer")[0].play(); // audio from HTML <audio>
}

function audioClick() {
  $("#click")[0].play(); // audio from HTML <audio>
}

// mark a cell as occupied
function setCell(cell, playerNumber){
  cellStatus[cell] = playerNumber;
}

function getRoundWinner(){
  // check to see whether a winner or tie exists
  // check rows.  If a set is found return the player who created the set.  3 = draw
  if ((cellStatus[0] == cellStatus[1] && cellStatus[1] == cellStatus[2]) &&
    (cellStatus[0] != null)){
    roundDone = true;
    return cellStatus[0];
  } else if ((cellStatus[3] == cellStatus[4] && cellStatus[4] == cellStatus[5]) &&
    (cellStatus[3] != null)){
    roundDone = true;
    return cellStatus[3];
  } else if ((cellStatus[6] == cellStatus[7] && cellStatus[7] == cellStatus[8]) &&
    (cellStatus[6] != null)){
    roundDone = true;
    return cellStatus[6];
  }
  // check columns.  If a set is found return the player who created the set
  if ((cellStatus[0] == cellStatus[3] && cellStatus[3] == cellStatus[6]) &&
    (cellStatus[0] != null)){
    roundDone = true;
    return cellStatus[0];
  } else if ((cellStatus[1] == cellStatus[4] && cellStatus[4] == cellStatus[7]) &&
    (cellStatus[1] != null)){
    roundDone = true;
    return cellStatus[1];
  } else if ((cellStatus[2] == cellStatus[5] && cellStatus[5] == cellStatus[8]) &&
    (cellStatus[2] != null)){
    roundDone = true;
    return cellStatus[2];
  }
  // check diagonals.  If a set is found return the player who created the set
  if ((cellStatus[0] == cellStatus[4] && cellStatus[4] == cellStatus[8]) &&
    (cellStatus[4] != null)){
    roundDone = true;
    return cellStatus[0];
  } else if ((cellStatus[2] == cellStatus[4] && cellStatus[4] == cellStatus[6]) &&
    (cellStatus[4] != null)){
    roundDone = true;
    return cellStatus[2];
  }
  //check for a draw (null not found in cellStatus array)
  if (cellStatus.indexOf(null) == -1){
    roundDone = true;
    return 3;
  }
}

function changePlayer(){
  if (currentPlayer == 1){ // if 1 is current
    currentPlayer = 2; // change it to 2
  } else { // if 2 is current
    currentPlayer = 1; // change it to 1
  }
  pointerControl(currentPlayer); // change the pointer
}

// control visibility of the pointer:
// 0: turn off
// 1: player 1
// 2: player 2
function pointerControl(player){
  switch (player){
    case 0: // hide all
      $('#player1Pointer').hide(); // hide left pointer
      $('#player2Pointer').hide(); // show right pointer
      $('#pointerDiv').hide(); // show the text div
      break;
    case 1: // for player 1, left
      $('#player1Pointer').show(); // hide left pointer
      $('#player2Pointer').hide(); // show right pointer
      $('#pointerDiv').show(); // show the text div
      break;
    case 2: // for player 2, right
      $('#player1Pointer').hide(); // hide left pointer
      $('#player2Pointer').show(); // show right pointer
      $('#pointerDiv').show(); // show the text div
      break;
    default:
      break; // no action
  }
}

// alter the pointer to celebrate a win
function winPointer(){
  var originalText = $('#pointerDiv').html; // store the pointerDiv text
  $('#pointerDiv').html('<div id="pointerDiv" class="turnPointer">Winner!</div>');
  var intervalID = setInterval(function(){ // start flashing and preserve ID

  })
  setTimeout(function(){ // delay to stop flashing
    clearInterval(intervalID); // use the ID to stop flashing
  }, 2000); // 2s delay
  $('#pointerDiv').html(originalText); // return to original text
}

function celebrate(playerNumber){
  // if a winner was found, acknowledge the player
  audioCheer(); // play cheer
  customAlert("Player " + playerNumber + " wins!!!", 2000); // show pop up for 2s
}

function customAlert(msg,duration){
  $('.pop-up').html(msg); // change the text in the pop-up div
  $('.pop-up').show(); // make the pop-up visible
  setTimeout(function(){ // hide the pop-up after duration has passed
    $('.pop-up').hide();
  },duration);
}
