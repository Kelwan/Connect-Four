


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
      let turnCheck = piece.drop(piece, board.grid);

      checkVertical(board.grid, player1.piece);
      checkHorizontal(board.grid, player1.piece);
      checkDiagonal(board.grid, player1.piece);
    }

    else if (turn = player2.turn){
      console.log("Player 2's turn");
      let piece = new Piece(player2.piece, chunk);
      let turnCheck = piece.drop(piece, board.grid); // I can't send the entirety of the board object without errors.... why?

      checkVertical(board.grid, player2.piece);
      checkHorizontal(board.grid, player2.piece);
      checkDiagonal(board.grid, player2.piece);
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

  for(let row = 1; row <= 5; row++){
    let col = [];
    for(let column = 0; column < 6; column++){
      col.push(board[row][column]);
      console.log(col[column][2]);
    }
    checkColumn(col, piece);
  }
}

function checkColumn(col, piece){
  for(let row = 0; row < col.length + 1; row++){
  }
  console.log(col[1][1]);
}

function checkHorizontal(board, piece){
  for(let i = 1; i <= 5; i++){
    checkRow(board[i], piece);
  }
}

function checkRow(row, piece){
  let counter = 0;
  //console.log("Current row: " + row);
  for(let i = 0; i < row.length; i++){
    if (row[i] == piece){
      counter++;
      //console.log(piece + " = " + counter);
    }
    else if(counter == 4){
      console.log(piece + "wins");
    }
    else if (row[i] !== piece){
      counter = 0;
    }
  }
}

function checkDiagonal(diag, piece){

}

function Piece(type, input){
  this.type = type;
  this.input = input;
}


Piece.prototype.drop = ((piece, board) => {

  let placed = false;

  for(let i = 0; i < board.length; i++){

    if(piece.input - 1 == i /*&& board[1][i] == "| |"*/){

      if(board[1][i] == "| |"){
        board[1][i] = piece.type;

        for(let j = 0; j < 5; j++){
          if(board[j + 1][i] == "| |"){
            board[j + 1][i] = piece.type;
            board[j][i] = "| |";
            placed = true;
          }
        }
      }
      else if(board[1][i] !== "| |"){
        console.log("space taken");

      }
    }
  }

  console.log(board);

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



let board = new Board();

console.log(board.grid);

let player1 = new Player("|X|", 0);
let player2 = new Player("|O|", 1);

player1.input(board, board.run);
