// Doctype javascript

/* Attempt 1
//module to create the gameboard
const board = (function(){
let gameBoard = new Array(9); //3x3 grid


//iterate through array to create div for each element
for(let i=0;i<gameBoard.length;i++){
    const div = document.createElement("div");
    div.classList.add("grid-item"); //add grid-item class for css styling
    div.setAttribute("id","square"+ i); //give each square a unique ID
    document.getElementById("grid-container").appendChild(div); //add the new div to the page
    //add eventlistener to allow square to be selected (still withing steup for loop)
    const squareID = document.getElementById(div.id);
    
    
    squareID.addEventListener("click",() =>{
        console.log(game.activePlayer);
        //check if square has already been played
        if(gameBoard[i]=="X" || board.gameBoard[i]=="O"){
            alert("this square is not free"); //alert user that square cannot be played again
        }
        else{
            gameBoard[i]=game.activePlayer.marker;
            //console.table(gameBoard);
            squareID.textContent=gameBoard[i]; //display value stored in array (x or o)
            game.remainingMoves-=1; //reduce number of remaining moves each time a turn is played
            
            //check for a winner then swap to next player if no winner after previous turn
            game.checkWinner(); 
            if(game.winnerDeclared==false){
                if(game.remainingMoves>0){
                    game.nextPlayer(); 
                }
                else if(game.remainingMoves==0){
                    game.drawn();
                }
            }
        }
    });

    const startGameBtn = document.getElementById("startGame");
    startGameBtn.addEventListener("click", ()=>{
       gameBoard[i]="";
       squareID.textContent="";
    });
}

return{gameBoard}
})();



//factory function (I think?) to create new players
function newPlayer(name, marker){
    
    let score = 0;
    //function to be called to add to score when game won
    const increaseScore = () => score++;
    //function to retrieve current score;
    const getScore = () => score;

    return {name, marker, score, getScore, increaseScore};
}

const game = (()=>{

    //declare the players

    const player1=newPlayer(document.querySelector("playerOneName"),"X");
    const player2=newPlayer(document.querySelector("playerTwoName"), "O");

    //initial game state
    let activePlayer = player1;
    let winnerDeclared = false;
    let remainingMoves = 9;  

    //winning conditions

    const winningCombo=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

    function checkWinner(){
        //loop through the winningCombo array to check if there's a match for the current player
        winningCombo.forEach((item)=>{
            if(board.gameBoard[item[0]] === this.activePlayer.marker && board.gameBoard[item[1]] === this.activePlayer.marker && board.gameBoard[item[2]] === this.activePlayer.marker){
                console.log(this.activePlayer.name + " wins!");
                this.winnerDeclared=true;
            }
        });
    }

    //switch to the next player
    function nextPlayer(){
        if(this.activePlayer===player1){
            this.activePlayer=player2;
        }
        else{
            this.activePlayer=player1;
        }
    }
    
    //actions if game is drawn
    function drawn(){
        console.log("Game is a draw!");
    }
    
   
    return{activePlayer,checkWinner,nextPlayer,winnerDeclared, remainingMoves, drawn}
})();
*/


//Attempt 2
//get page elements

    const startButton = document.getElementById("startGame");
    let playerOne="";
    let playerTwo="";
    
//factory function to create player
function newPlayer(name, marker){
    //hidden variable storing score
    let score = 0;
    //function to be called to add to score when game won
    const increaseScore = () => score++;
    //function to retrieve current score;
    const getScore = () => score;

    return {name, marker, score, getScore, increaseScore};
}





let winnerDeclared = false;
let activePlayer = "";
let remainingMoves = 9;

startButton.addEventListener("click",()=>{
    drawBoard();
    console.log("start button");
    let playerOneInput = document.getElementById("playerOneName").value;
    let playerTwoInput = document.getElementById("playerTwoName").value;
    console.log(playerOneInput);

    playerOne = newPlayer(playerOneInput, "X");
    playerTwo = newPlayer(playerTwoInput, "O");
    activePlayer = playerOne;
    
});

/*const handleClick=()=>{
    makeMove();
}*/

let gameBoard = new Array(9);
//draw the board
function drawBoard(){
    //array for board. 9 elements for 3x3 grid. 3 columns set in css file
    gameBoard=new Array(9);
    console.table(gameBoard);
    const squares = document.querySelectorAll(".grid-item");
    squares.forEach((square) => {
    square.remove();
    });
    for(let i=0;i<gameBoard.length;i++){
        const div = document.createElement("div"); //create new div in each iteration of loop, 9 in total
        div.classList.add("grid-item"); //add grid-item class for css styling
        div.setAttribute("id","square"+ i); //give each square a unique ID
        div.textContent = gameBoard[i]; //display the move stored in the square
        document.getElementById("grid-container").appendChild(div); //add the new div to the page
        //add event listeners to each square
        div.addEventListener("click", ()=>{
            makeMove(i,div);
        })
    };
}



    //winning combinations to be compared against
    const winningCombo=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

    function checkWinner(){
        //loop through the winningCombo array to check if there's a match for the current player
        winningCombo.forEach((item)=>{
            if(gameBoard[item[0]] === activePlayer.marker && gameBoard[item[1]] === activePlayer.marker && gameBoard[item[2]] === activePlayer.marker){
                console.log(activePlayer.name + " wins!");
                winnerDeclared=true;
                //endGame();
            }
        });
    }

    function declareDraw(){
        console.log("draw");
    }

    /*function endGame(){
        console.log("endGame runs");
        for(let i=0;i<gameBoard.length;i++){
            const div=document.getElementById("square"+i);
            div.removeEventListener("click",handleClick);
        }
    }*/

    function makeMove(i,div){
        console.log("makeMove runs");
        console.table[gameBoard];
        if(gameBoard[i]==playerOne.marker || gameBoard[i]==playerTwo.marker){
            alert("this square is not free"); //alert user that square cannot be played again
        }
        else{
            gameBoard[i]=activePlayer.marker;
            //console.table(gameBoard);
            div.textContent=gameBoard[i]; //display value stored in array (x or o)
            remainingMoves-=1; //reduce number of remaining moves each time a turn is played
            checkWinner();
            if(winnerDeclared==false){
                if(remainingMoves>0){
                    switchPlayer();
                }
                else{
                    declareDraw();
                    //endGame();
                }
            }
        }
    }
    //switch active player
    function switchPlayer(){
        console.log("switched");
        if(activePlayer==playerOne){
            activePlayer=playerTwo;
        }
        else{
            activePlayer=playerOne;
        }
    }