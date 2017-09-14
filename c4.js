
var readline = require('readline');

  let grid = [
    [" 1 ", " 2 ", " 3 ", " 4 ", " 5 ", " 6 "],
    ["| |", "| |", "| |", "| |", "| |", "| |"],
    ["| |", "| |", "| |", "| |", "| |", "| |"],
    ["| |", "| |", "| |", "| |", "| |", "| |"],
    ["| |", "| |", "| |", "| |", "| |", "| |"],
    ["| |", "| |", "| |", "| |", "| |", "| |"]
  ];

let turn = 0;

function Board(){

}

Board.prototype.turn = ((player1, player2) => {
  if(turn == 0){
    turn ++;
    let input1 = player1.input(player1.piece);
    let piece = new Piece(player1.piece, input1);
    return piece;
  }
  else if(turn == 1){
    turn --;
    let input2 = player2.input(player2.piece);
    let piece = new Piece(player2.piece, input2);
    return piece;
  }
  else console.log("ERROR: Turns Broken");
  //return piece;
});

Board.prototype.update = (() => {
  console.log(grid);
});

Board.prototype.checkVictory = ((p1, p2) => {
  let victory = false;
  let counter = 0;
  let anchor = undefined;

  for(i = 1; i < grid.length; i++){
    for(j = 0; j < 6; j++){
      if(grid[i][j] == p1 || grid[i][j] == p2){
        sweeper(i, j, p1, p2);
      }
    }
  }



  if (counter == 4){
    victory = true;
    return victory;
  }

});

function sweeper(v1, v2){
  let counter = 0;
  let dud = undefined;
  let copy1 = v1;
  let copy2 = v2;

  // Sweeper will sift through everything around the anchor to find connections
  for(i = 0; i < 4; i++){
    for(j = v1 - 1; j < v1 + 2; j++){
      for(k = v2 - 1; k < v2 + 2; k++){
        if(grid[i][j] == grid[v1][v2]){
          console.log("skip overlap");
        }
        //else if(grid[j][k] == checked){
          //console.log("already checked");
        //}
        else if(grid[j][k] == p1){
          console.log("connection found");
          counter++;
          v1 = j;
          v2 = k;
        }
        else {
          console.log("No connections found");
        }
      }
    }
  }



}

function Piece(type, lane){
  this.type = type;
  this.lane = lane;
}

Piece.prototype.drop = ((piece, input) => {
  grid[1][input] = piece;

for(i = 1; i < grid.length -1; i++){
  if(grid[i + 1][input] == "| |"){
    grid[i + 1][input] = piece;
    grid[i][input] = "| |";
  }
  else if (grid[i + 1][input] == null){
    console.log("bottom out!");
    return;
  }
}


});


function Player(piece){
  this.piece = piece;
}

Player.prototype.input = ((piece) => {
//  console.log(piece + ", choose a lane 1-6");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("Where would you place your piece?", function(answer){
    // TODO: Log answer in database
    console.log("Thank you for your valuable feedback: ", answer);
    // YOU NEED TO UPDATE THE BOARD HERE INSTEAD OF MAIN.
    rl.close();
    // To add to that, putting main here will cause it NOT be called again until the input is finished.
  });
});

function main() {
  let player1 = new Player("|X|");
  let player2 = new Player("|O|");
  let board = new Board();
  let victory = false;

  let piece = (board.turn(player1, player2));

  console.log(piece);

  piece.drop(piece.type,piece.lane);
  //board.update();
  //let victor = board.checkVictory();

  if (victory == false){
  //  main();
  }
}

main();
