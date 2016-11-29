
// pop-up
customAlert("Game on!", 1000);
// ring bell for start
audioBell();
//loop through IDs 'cell0'-'cell8' and assign clickCell() to .onclick
for (let i = 0; i < 9; i++){
  document.getElementById("cell" + i).onclick=(function(){
    clickCell(i);
  })
}
//if reset is clicked:
document.getElementById("reset-btn").onclick = function(){
  resetBoard();
}

// player 1 goes first on page refresh, set it
pointerControl(1);
// initialize the variables for the cells
var cellStatus = [null, null, null, null, null, null, null, null, null]; // tracks the status of the board
// var p1Score = 0;
// var p2Score = 0;
// var goal = 3; // default game is best 2/3
var goesFirst = 0;  // player 1 goes first on first round
var roundDone = false; // set if round is complete
var gameDone = false;  // set if game is complete
var currentPlayer = 1; // 1 or 2


function resetBoard(){
  customAlert("Game on!", 1000); // show 'game on' alert for 1s
  audioBell(); // ring bell
  //reset the game board array var for a new game
  cellStatus = [null, null, null, null, null, null, null, null, null];
  // clear out the game board divs
  for (i = 0; i < 9; i++){
    document.getElementById("cell" + i).innerHTML = null;
  }
  // toggle who starts
  goesFirst = !goesFirst;
  // set current player based on goesFirst
  goesFirst ? currentPlayer = 2 : currentPlayer = 1;
  // restore pointer text after round win
  document.getElementById("pointerDiv").innerHTML = 'Your Turn!'
  // set current pointer
  pointerControl(currentPlayer);
  // reset the roundDone Boolean
  roundDone = false;
}

function clickCell(cellNum){
  if (roundDone){ // if the board is clicked and the game is over, reset it
    resetBoard();
  } else {
    if (!cellStatus[cellNum]){ // if this cell is null allow marking, otherwise skip
      audioClick(); // play the click sound
      setCell(cellNum, currentPlayer);  // set the cell var to the current player
      if (currentPlayer == 1) {
       document.getElementById("cell" + cellNum).innerHTML = '<img src="./images/x_red.png" class="red">'; // update the DOM
      }
      if (currentPlayer == 2) {
        document.getElementById("cell" + cellNum).innerHTML = '<img src="./images/o_red.png" class="black">'; // update the DOM
      }
      // see if the round is over
      switch (getRoundWinner()){ // getRoundWinner() checks for a complete round
        case 1: // player 1 has won
          celebrate(1);
          winPointer();
          break;
        case 2: // player 2 has won
          celebrate(2);
          winPointer();
          break;
        case 3: // draw
          audioAww();
          customAlert("Tie", 1500);
          pointerControl(0);
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
  document.getElementById("aww").play();
}

function audioBell() {
  document.getElementById("bell").play();
}
function audioBuzz() {
  document.getElementById("buzz").play();
}

function audioCheer() {
  document.getElementById("cheer").play();
}

function audioClick() {
  document.getElementById("click").play();
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
      document.getElementById("player1Pointer").style.display = 'none'; //hide
      document.getElementById("pointerDiv").style.display = 'none'; //hide
      document.getElementById("player2Pointer").style.display = 'none'; //hide
      break;
    case 1: // for player 1, left
      document.getElementById("player1Pointer").style.display = 'flex'; //show left pointer
      document.getElementById("pointerDiv").style.display = 'flex'; //show the middle
      document.getElementById("player2Pointer").style.display = 'none'; //hide right pointer
      break;
    case 2: // for player 2, right
      document.getElementById("player1Pointer").style.display = 'none'; //hide left pointer
      document.getElementById("pointerDiv").style.display = 'flex'; //show the middle
      document.getElementById("player2Pointer").style.display = 'flex'; //show right pointer
      break;
    default:
      break; // no action
  }
}

// alter the pointer to celebrate a win
function winPointer(){
  var pointText = document.getElementById("pointerDiv").innerHTML;
  pointerControl(0); // hide the pointer
  document.getElementById("pointerDiv").innerHTML = 'Winner!'; // new pointer text
  var flashPer = 500;
  var flashDur = 2000;
  var intId = setInterval(function(){
    pointerControl(currentPlayer);
    setTimeout(function(){
      pointerControl(0);
    },flashPer/2);
  }, flashPer);
  // when this fires, it stops the setInterval above
  setTimeout(function(){
    clearInterval(intId);
    setTimeout(function(){
      pointerControl(currentPlayer); // show the pointer as flashing stops
    },flashPer/2);
    },flashDur);
};

function celebrate(playerNumber){
  // if a winner was found, acknowledge the player
  audioCheer(); // play cheer
  customAlert("Player " + playerNumber + " wins!!!", 2000); // show pop up for 2s
}

// pass in a string to display in the pop up, and the duration to display
function customAlert(msg,duration){
  var popUp = document.getElementsByClassName("pop-up")[0];
  popUp.innerHTML = msg; // change the popUp text
  popUp.style.display = "flex"; // show the popUp
  setTimeout(function(){ // hide the pop-up after duration has passed
    popUp.style.display = 'none';
  },duration);
}
