// Doctype javascript

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
    
    //function startGame(){
        const startGameBtn = document.getElementById("startGame");
        startGameBtn.addEventListener("click", ()=>{
            console.table(gameBoard);
            gameBoard =[];
            
            console.table(gameBoard);
        });
    //}

    squareID.addEventListener("click",() =>{
        console.log(game.activePlayer);
        //check if square has already been played
        if(gameBoard[i]=="X" || board.gameBoard[i]=="O"){
            alert("this square is not free"); //alert user that square cannot be played again
        }
        else{
            gameBoard[i]=game.activePlayer.marker;
            console.table(gameBoard);
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

    const player1=newPlayer(prompt("Enter Player 1 Name"),"X");
    const player2=newPlayer(prompt("Enter Player 2 Name"), "O");

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
//placeholder - how to create a new player

