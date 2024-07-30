const tiles = document.querySelectorAll(".box")
const header = document.querySelector("#option-title")
const playerOptionX = document.querySelector("#option-x")
const playerOptionO = document.querySelector("#option-o")
const restartButton = document.querySelector("#restart-instruction")

let player = ""
let aiPlayer = ""
let gameStarted = false
let gamePaused = false

const inputTiles = ["", "", "", "", "", "", "", "", ""]

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

// Colocar a peça do jogador no quadrado em que ele clicar

tiles.forEach((tile, index) => {
    tile.addEventListener("click", () => clickBox(tile, index))
})

function clickBox(tile, index) {
    if (player == "") {
        shakeHeader()
        return
    }
    if (tile.textContent == "" && gamePaused == false){
        gameStarted = true
        updateBox(tile, index)
        
        if (checkWinCondition() == false) {
            changePlayer()
            //setTimeout(() => enemyBehavior(), 10) 
        }
    }
}

// Escolher a peça primeiro

function shakeHeader() {
    header.classList.add("shake")
    setTimeout(() => header.classList.remove("shake"), 500)
}

// Revezar entre os turnos

function changePlayer() {
    player = (player == "X") ? "O" : "X"
}

// Atualizar o grid

function updateBox(tile, index) {
    tile.textContent = player
    inputTiles[index] = player
    if (player == "X"){
        tile.classList.add("player-x")
    }
    else {
        tile.classList.add("player-o")
    }
}

// Verificar condições de vitória, e declarar quem ganhou

function checkWinCondition() {
    for (const [a, b, c] of winConditions) {
        if (inputTiles[a] == player && inputTiles[b] == player && inputTiles[c] == player) {
            declareWinner([a, b, c])
            return true
        }
    }
    
    if (inputTiles.every(tile => tile != "")) {
        header.textContent = "Empate!"
        gamePaused = true
        showRestartInstruction()
        return true
    }
    
    return false
}

function declareWinner(winningIndices) {
    header.textContent = `${player} ganhou!`
    gamePaused = true

    winningIndices.forEach((index) => tiles[index].style.backgroundColor = "var(--box-winning)")
    showRestartInstruction()
}

// Escolher qual símbolo quer ser

function choosePlayer(selectedPlayer) {
    if (gameStarted == false) {
        player = selectedPlayer
        aiPlayer = player === "X" ? "O" : "X"

        if (player == "X") {
            playerOptionX.classList.add("player-active")
            playerOptionO.classList.remove("player-active")
        }
        else {
            playerOptionO.classList.add("player-active")
            playerOptionX.classList.remove("player-active")
        }
    }
}

// Recomeçar jogo

function showRestartInstruction() {
    document.getElementById("restart-instruction").style.visibility = "visible"
}

function restartGame() {
    if (gamePaused) {
        inputTiles.fill("")
        tiles.forEach(tile => {
            tile.textContent = ""
            tile.classList.remove("player-x")
            tile.classList.remove("player-o")
            tile.style.backgroundColor = ""
            playerOptionX.classList.remove("player-active")
            playerOptionO.classList.remove("player-active")
        })

        gamePaused = false
        gameStarted = false
        player = ""
        aiPlayer = ""
        header.textContent = "Escolha"
        document.getElementById("restart-instruction").style.visibility = "hidden"
    }
}

restartButton.addEventListener("click", restartGame)

// 