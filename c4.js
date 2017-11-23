


function Board(){

  let grid = [
    [" 1 ", " 2 ", " 3 ", " 4 ", " 5 ", " 6 "],
    ["| |", "| |", "| |", "| |", "| |", "| |"],
    ["| |", "| |", "| |", "| |", "| |", "| |"],
    ["| |", "| |", "| |", "| |", "| |", "| |"],
    ["| |", "| |", "| |", "| |", "| |", "| |"],
    ["| |", "| |", "| |", "| |", "| |", "| |"]
  ];
  let turn = 0;

  this.turn = turn;
  this.grid = grid;

}

Board.prototype.print = (() => {
  return grid;
});

Board.prototype.checkTurn = ((pTurn) => {
  if(pTurn == 0){
    board.turn ++;
    return 0;
  }
  else if (pTurn == 1){
    board.turn --;
    return 1;
  }
  else if(pTurn !== 0 && pTurn !== 1){
    console.log("error!");
  }
});

Board.prototype.run = ((chunk, board) => {

  chunk.trim();

  if(chunk == 1 || chunk == 2 || chunk == 3 || chunk == 4 || chunk == 5 || chunk == 6){
    let turn = board.checkTurn(board.turn);
    let victory = false;


    if(turn == player1.turn){
      console.log("Player 1's turn");
      let piece = new Piece(player1.piece, chunk);
      let xoDrop = piece.drop(piece, board.grid);

      checkVertical(board.grid, player1.piece);
      checkHorizontal(board.grid, player1.piece);
      checkDiagonal(board.grid, player1.piece, xoDrop);
    }

    else if (turn = player2.turn){
      console.log("Player 2's turn");
      let piece = new Piece(player2.piece, chunk);
      let xoDrop = piece.drop(piece, board.grid); // I can't send the entirety of the board object without errors.... why?

      checkVertical(board.grid, player2.piece);
      checkHorizontal(board.grid, player2.piece);
      checkDiagonal(board.grid, player2.piece, xoDrop);
    }

  }

  else if(chunk.toString() == "end"){
    console.log("quit!");
    return;
  }

  else
    console.log("This is not a valid input, please try again");
});

function checkVertical(board, piece){
  let vic = false;
  for (let i = 0; i < board.length; i++){
    vic = getColumn(board, piece, i);
  }
  //console.log("checkVertical vic: " + vic);
  if (vic == true){
    console.log("vert = true!");
  }
}

function getColumn(board, piece, i){
  let col = [];
  for (let j = 1; j < board.length; j++){
    col[j - 1] = board[j][i];
  }

  let vic = vertVictory(col, piece);
  if(vic == true){
    console.log("VIC IS TRUE");
    return true;
  }

}

function vertVictory(col, piece){
  let counter = 1;

  for (let i = 0; i < col.length; i++){

    if(col[i] == piece){
      counter ++;
    }

    if(counter == 4){
      console.log(piece + "wins vertical!");
      return true;
    }

    if (col[i] !== piece){
      counter = 0;
    }
  }
}

function checkHorizontal(board, piece){
  let counter = 0;
  let row = [];

  for(let i = 1; i < board.length; i++){
    row[i - 1] = getRow(board, i);
  }

  for(let j = 0; j < row.length; j++){
    let victory = rowVictory(row[j], piece);
    if(victory == true){
        console.log("Victory is true");
    }
  }
}

function getRow(board, i){
  return board[i];
}

function rowVictory(row, piece){
  let counter = 0;

  for(let i = 0; i < row.length; i ++){
    if(row[i] == piece){
      counter++;
    }
    if(counter >= 4){
      console.log(piece + " Wins!");
      return true;
    }
    if(row[i] !== piece){
      counter = 0;
    }
  }
}

function checkDiagonal(board, piece, drop){
  let diag = [];

  console.log("drop zone: " + drop[0] + drop[1]);

  diag = getDiag(board, drop);

  console.log("upLeft - downRight: " + diag[0]);
  console.log("upRight - downLeft: " + diag[1]);

  diagVictory(board, piece, diag[0], diag[1]);

}

function getDiag(board, drop){

  let upLeft = [];
  let downLeft = [];
  let upRight = [];
  let downRight = [];

  let sum = [];

  for(let i = 0; i < board.length; i++){

    //Upleft diag


    if(board[drop[0]-i] && board[drop[0]-i][drop[1]-i]){
      upLeft[i] = board[drop[0] - i][drop[1] - i];
    }
    //downLeft diag
    if(board[drop[0]+i] && board[drop[0]+i][drop[1]-i]){
      downLeft[i] = board[drop[0] + i][drop[1] - i];
    }
    //upRight diag
    if(board[drop[0]-i] && board[drop[0]-i][drop[1]+i]){
      upRight[i] = board[drop[0] - i][drop[1] + i];
    }
    //downRight diag
    if(board[drop[0]+i] && board[drop[0]+i][drop[1]+i]){
      downRight[i] = board[drop[0] + i][drop[1] + i];
    }

  }

    upLeft.shift();
    upRight.shift();
    upLeft.reverse();
    upRight.reverse();

  sum[0] = upLeft.concat(downRight);
  sum[1] = upRight.concat(downLeft);

  return sum;
}

function diagVictory(board, piece, diag1, diag2){

  let counter1 = 0;
  let counter2 = 0;

  for (let i = 0; i < diag1.length; i++){
    if(diag1[i] == piece){
      counter1++;
    }
    if(counter1 >= 4){
      console.log(piece + " has a vertical victory!");
    }
    if(diag1[i] !== piece){
      counter1 = 0;
    }
  }

  for(let j = 0; j < diag2.length; j++){
    if(diag2[j] == piece){
      counter2++;
    }
    if(counter2 >= 4){
      console.log(piece + " wins a vertical!");
    }
    if(diag2[j] !== piece){
      counter2 = 0;
    }
  }
}

function Piece(type, input){
  this.type = type;
  this.input = input;
}

Piece.prototype.drop = ((piece, board) => {

  let placed = false;
  let placement = [];

  for(let i = 0; i < board.length; i++){
    if(piece.input - 1 == i){
      if(board[1][i] == "| |"){
        board[1][i] = piece.type;
        placement[0] = 1;
        placement[1] = i;

        for(let j = 0; j < 5; j++){
          if(board[j + 1][i] == "| |") {
            board[j + 1][i] = piece.type;
            board[j][i] = "| |";
            placed = true;
            placement[0] = j + 1;
            placement[1] = i;
          }
        }
      }

      else if(board[1][i] !== "| |"){
        console.log("space taken");
      }
    }
  }
  console.log(board);
  return placement;
});


function Player(piece, turn){
  this.piece = piece;
  this.turn = turn;
}

Player.prototype.input = ((board, callback) => {
  console.log("do some input: ");
  process.stdin.setEncoding('utf8');

  process.stdin.on('readable', () => {
    const chunk = process.stdin.read();
    if (chunk !== null){
      callback(chunk, board);
    }
  });
});

//Activators
let board = new Board();

console.log(board.grid);

let player1 = new Player("|X|", 0);
let player2 = new Player("|O|", 1);

player1.input(board, board.run);
