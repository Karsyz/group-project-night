// styling for the emoji buttons
// creates a border around the emoji that the player and compy have selected

//document selector variables
const playerRock = document.querySelector('#playerRock')
const playerPaper = document.querySelector('#playerPaper')
const playerScissors = document.querySelector('#playerScissors')
const compyRock = document.querySelector('#compyRock')
const compyPaper = document.querySelector('#compyPaper')
const compyScissors = document.querySelector('#compyScissors')

// player event listeners
document.querySelector('#rock').addEventListener('click', playerRockSel)
document.querySelector('#paper').addEventListener('click', playerPaperSel)
document.querySelector('#scissors').addEventListener('click', playerScissorsSel)

// button styling reset
function btnrst() {
    playerRock.classList = ""
    playerPaper.classList = ""
    playerScissors.classList = ""
    compyRock.classList = ""
    compyPaper.classList = ""
    compyScissors.classList = ""
}

// player button styling functionality 
function playerRockSel() {
    btnrst()
    playerRock.classList.add("playerSel")
}

function playerPaperSel() {
    btnrst()
    playerPaper.classList.add("playerSel")
}

function playerScissorsSel() {
    btnrst()
    playerScissors.classList.add("playerSel")
}

// compy button styling functionality 
function compyButton(data) {
    switch (data) {
      case 'rock':
          compyRock.classList.add("compySel")
          break;
      case 'paper':
          compyPaper.classList.add("compySel")
          break;
      case 'scissors':
          compyScissors.classList.add("compySel")
          break;
      default: console.log("Something is wrong with the compy button styling functionality.")
          break;
    }
}

