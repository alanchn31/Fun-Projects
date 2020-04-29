//Global App Controller
import welcomeString from './test';

console.log(`Welcome to ${welcomeString}`)

 let activePlayer, gamePlaying, boardResult


function init(){
    gamePlaying = true;
    activePlayer = prompt("Who shall go first? 'X' or 'O'? ");
    boardResult=['','','','','','','','',''];
    for (let i= document.images.length; i-->0;){
        document.images[i].parentNode.removeChild(document.images[i]);
    }
    alert(`Player ${activePlayer} shall go first`);
}

init();

function gameEnd(){
    alert(`Game Over, Player ${activePlayer} has won the game!`)
    let startBool = confirm("Start new game?");
    if (startBool){
        init()
    } else{
        alert("Good game. Thank you for playing.")
    }
}

function checkWin(activePlayer){
    for (let elem of [0,1,2]){
        let winCondition1 = (
            boardResult[elem] === activePlayer && 
            boardResult[elem+3] === activePlayer &&
            boardResult[elem+6] === activePlayer
        );

        console.log(`winCondition1: ${winCondition1}`)
        console.log(`elem: ${elem}`)

        let winCondition2 = (
            boardResult[elem*3] === activePlayer && 
            boardResult[elem*3+1] === activePlayer &&
            boardResult[elem*3+2] === activePlayer
        );

        if (winCondition1 || winCondition2){
            gameEnd();
        }

    }

    let winCondition3 = (
        boardResult[0] === activePlayer && 
        boardResult[4] === activePlayer &&
        boardResult[8] === activePlayer
    )

    let winCondition4 = (
        boardResult[2] === activePlayer && 
        boardResult[4] === activePlayer &&
        boardResult[6] === activePlayer
    )

    if (winCondition3 || winCondition4){
        gameEnd();
    }

}

document.querySelectorAll('.cell').forEach(e => e.addEventListener('click', (event) => {
    if (gamePlaying){
    //get id of cell that is clicked on
    let cellClicked = event.target.id;
    if (boardResult[parseInt(cellClicked.slice(-1))] !== ''){
        alert("This cell is taken, please try again")
    } else{
        console.log(typeof  parseInt(cellClicked.slice(-1)));
        console.log(`ID: ${event.target.id} clicked`)

        //Add Picture to the cell clicked:
        let img = document.createElement('img');
        img.src = `png/${activePlayer}.png`;
        document.getElementById(event.target.id).appendChild(img);
        boardResult[parseInt(cellClicked.slice(-1))] = activePlayer;
        console.log(boardResult)


        //Check Winning Condition:
        checkWin(activePlayer)

        //Switch Player:
        activePlayer = (activePlayer === 'X'? 'O' : 'X')
    }    
    }
}))



    

    


