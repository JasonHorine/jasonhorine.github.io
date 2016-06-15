
// document ready:
$(function(){
  // hide the right pointer
  $('#player2Pointer').hide();

  // if a cell is clicked:
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

});
// if a cell is clicked:



// initialize the variable for the cells
var cellStatus = [null, null, null, null, null, null, null, null, null];
var p1Score = 0;
var p2Score = 0;
var goal = 3; // default game is best 2/3
var goesFirst = 0;  // player 1 goes first on first round
var roundDone = false; // set if round is complete
var gameDone = false;  // set if game is complete
var currentPlayer = 1; // 1 or 2


function resetBoard(){
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
  // reset the roundDone Boolean
  roundDone = false;
}

function clickCell(cellNum){
  if (roundDone){ // if the board is clicked and the game is over, reset it
    resetBoard();
  } else {
    if (!cellStatus[cellNum]){ // if this cell is null allow marking, otherwise skip
      setCell(cellNum, currentPlayer);  // set it to the current player
      if (currentPlayer == 1) {
       $('#cell' + cellNum).html('<img src="./images/x_red.png" class="green">'); // update the DOM
      }
      if (currentPlayer == 2) {
        $('#cell' + cellNum).html('<img src="./images/o_red.png" class="black">'); // update the DOM
      }
      // see if the round is over
      switch (getRoundWinner()){
        case 1: // player 1 has won
          celebrate(1);
          break;
        case 2: // player 2 has won
          celebrate(2)
          break;
        case 3: // draw
          alert("A draw  :(");
          break;
        default: // keep playing
          break;
      }

      changePlayer();  // now it's the other player's turn
    }
  }
}

// function playTo(rounds){
//   // if score != 0:0 but game is not finished
//   if ((!p1Score || !p2Score) && ((p1Score != goal) || (p2Score != goal))) {
//     // prompt are you sure?
//     var roundsPrompt = prompt ("Are you sure?  The game will reset.");
//       // yes: set goal to (rounds), else do nothing and return
//     if (roundsPrompt){
//       goal = rounds;
//     }
//   // else set goal to (rounds), reset game, return
//   } else {
//     goal = rounds;
//     resetGame();
//   }
// }



// function resetGame(){
//   //if score = 0:0 or either score won the game, allow reset without prompt
//   if ((!p1Score && !p2Score) || (p1Score == goal) || (p2Score == goal)){
//     // call resetBoard()
//     resetBoard();
//     //if there was a score, prompt to make sure.
//   } else {
//     //prompt: are you sure?
//     var resetAnswer = prompt("Reset the game?");
//       //Yes: call resetBoard() and clear the scores
//     if (resetAnswer){
//       resetBoard();
//       p1Score = 0;
//       p2Score = 0;
//     }
//   }
// }

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

// function getGameWinner(){
//   // if there is a winner, return 1 or 2.  If no winner, return 0.
//   if (p1Score == rounds){
//     return 1;
//   } else if (p2Score == rounds){
//     return 2;
//   } else {
//     return 0;
//   }
// }

function changePlayer(){
  if (currentPlayer == 1){ // if 1 is current
    currentPlayer = 2; // change it to 2
    $('#player1Pointer').hide(); // hide left pointer
    $('#player2Pointer').show(); // show right pointer
  } else if (currentPlayer == 2){ // if 2 is current
    currentPlayer = 1; // change it to 1
    $('#player1Pointer').show(); // show left pointer
    $('#player2Pointer').hide(); // hide right pointer
  }
}
function celebrate(playerNumber){
  // if a winner if found acknowledge the player and increment score
  alert("Player " + playerNumber + " wins!!!");
}



// pseudo code:

