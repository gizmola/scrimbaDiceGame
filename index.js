// Create variables for the game state
let player1Score = 0
let player2Score = 0
let player1Turn = true
let turns = 0
let maxScore = 30

//Sound
let context = null;
let trumpetAudio = new Audio("/sounds/trumpets.wav");
let cheerAudio = new Audio("/sounds/cheers.wav");
let diceAudio = new Audio("/sounds/dice_roll.mp3");

// Create variables to store references to the necessary DOM nodes
const round = document.getElementById("round")
const player1Dice = document.getElementById("player1Dice")
const player2Dice = document.getElementById("player2Dice")
const player1Scoreboard = document.getElementById("player1Scoreboard")
const player2Scoreboard = document.getElementById("player2Scoreboard")
const message = document.getElementById("message")
const rollBtn = document.getElementById("rollBtn")
const resetBtn = document.getElementById("resetBtn")

function showResetButton() {
    rollBtn.style.display = "none"
    resetBtn.style.display = "block"
}

/* Hook up a click event listener to the Roll Dice Button. */
 rollBtn.addEventListener("click", function() {
    turns++
    if (turns == 1) {
        trumpetAudio.play();    
    }
    diceAudio.play();

    round.textContent = `Round ${(Math.floor(turns / 2) + 1)}`
    const randomNumber = getRandomNumber(6)

    if (player1Turn) {
        player1Score += randomNumber
        player1Dice.innerHTML = getDiceImage(randomNumber)
        message.textContent = "Player 2 Turn"
        player1Dice.classList.remove("active")
        player2Dice.innerHTML = '<i class="fas fa-dice"></i>'
        player2Dice.classList.add("active")
        player1Scoreboard.innerHTML = `<span class="rolling">${player1Score}</span>`
        
    } else {
        player2Score += randomNumber
        player2Dice.innerHTML = getDiceImage(randomNumber)
        message.textContent = "Player 1 Turn"
        player2Dice.classList.remove("active")
        player1Dice.innerHTML = '<i class="fas fa-dice"></i>'
        player1Dice.classList.add("active")
        player2Scoreboard.innerHTML = `<span class="rolling">${player2Score}</span>`
    }
    if (turns % 2 === 0) {
        if (checkForWinner()) {
            showResetButton()
        }
    }    
    player1Turn = !player1Turn
})

function checkForWinner() {
    if (player1Score > maxScore || player2Score > maxScore) {
        if (player1Score === player2Score) {
           message.textContent = "Extra Rounds !!!!"
           return false 
        } else if (player1Score > player2Score) {
           message.textContent = "Player 1 Won 🥳"
        } else {
           message.textContent = "Player 2 Won 🎉" 
        }
        cheerAudio.play();
        return true     
    }
    return false
}
 
resetBtn.addEventListener("click", function(){
    reset()
})

function getRandomNumber(max) {
    return Math.floor(Math.random() * max) + 1  
}

function getDiceImage(diceNumber) {
    return `<img alt="Picture of a Dice face with the number ${diceNumber} showing" width="100" height="100" src="/images/dice_${diceNumber}.png">`;
}

function reset() {
    player1Score = 0
    player2Score = 0
    turns = 0
    round.textContent = "Get Ready to Play!"
    // See who goes 1st
    if (getRandomNumber(2) === 1) {
        player1Turn = true
        message.textContent = "Player 1 Turn"
        player2Dice.classList.remove("active")
        player1Dice.classList.add("active")
    } else {
        player1Turn = false
        message.textContent = "Player 2 Turn"
        player1Dice.classList.remove("active")
        player2Dice.classList.add("active")
    }
        
    player1Scoreboard.textContent = 0
    player2Scoreboard.textContent = 0
    player1Dice.innerHTML = '<i class="fas fa-dice"></i>'
    player2Dice.innerHTML = '<i class="fas fa-dice"></i>'
     
    resetBtn.style.display = "none"
    rollBtn.style.display = "block"
       
}

/*
function audioInit() {
  try {
    //let soundBuffer = null;  
    // Fix up for prefixing
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    context = new AudioContext();
  } catch(e) {
    alert('Web Audio API is not supported in this browser');
  }
}

function loadSound(soundBuffer, url) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  // Decode asynchronously
  request.onload = function() {
    context.decodeAudioData(request.response, function(buffer) {
        soundBuffer = buffer;
    }, function() {
        console.log('Unable to load sound')
    });
  }
  request.send();
}

function playSound(buffer) {
  let source = context.createBufferSource(); // creates a sound source
  source.buffer = buffer;                    // tell the source which sound to play
  source.connect(context.destination);       // connect the source to the context's destination (the speakers)
  source.start(0)                            // play the source                                            
}
*/

// Initialize
reset();

