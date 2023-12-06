
const ball = document.getElementById('ball');
const gameContainer = document.getElementById('container');
const computedStyles = window.getComputedStyle(ball);
const bricks = document.querySelectorAll('.brick');
const scoreElement = document.getElementById('scores');
const gameOverMessage = document.getElementById('game-over-message');
const playAgainButton = document.getElementById('play-again-btn');
let brickStates;
let score = 0;
let gameRunning = false;
let x = 402; // Initial x position
let y = 600; // Initial y position
let speedX = 2 ;
let speedY = -6;
let brickHitCooldown = false;
let backgroundMusic = document.getElementById('backgroundMusic');
const paddle = document.getElementById('playerPaddle');
let movingLeft = false;
let movingRight = false;
let gameover = false;
const initialPaddlePosition = { // Intializing the Paddle position
    bottom: parseFloat(getComputedStyle(paddle).bottom),
    left: parseFloat(getComputedStyle(paddle).left)
};


//Moving the Player Paddle
document.addEventListener('keydown', function (event) {
    if (gameRunning) {
    if (event.key === 'ArrowLeft') {
        movingLeft = true;
    } else if (event.key === 'ArrowRight') {
        movingRight = true;
    }
}
});
document.addEventListener('keyup', function (event) {
    if (event.key === 'ArrowLeft') {
        movingLeft = false;
    } else if (event.key === 'ArrowRight') {
        movingRight = false;
    }
});
//Moving the Paddle right to left within the game Screen 
function movePaddle() {
    const currentPosition = parseFloat(window.getComputedStyle(paddle).left);

    if (movingLeft && currentPosition > 100 ) {
        paddle.style.left = currentPosition - 5 + 'px';
    }

    if (movingRight && currentPosition < (800 - 100)) {
        paddle.style.left = currentPosition + 5 + 'px';
    }
}

setInterval(movePaddle, 20);
 
        // update Ball position 
function updateBallPosition() {
            
            if (!gameRunning) {
                return;
            }

            let allBricksBroken = true;
    
            x += speedX;
            y += speedY;
    
            for (const brick of bricks) { // Detect collision on the bricks
                if (!brickHitCooldown && !brick.classList.contains('break') && isCollision(ball, brick)) {
                    brick.classList.add('break') ; // Hide the brick
                    brickHitCooldown = true;
                    score+=10; 
                    playSound('Sounds/Lego Break  Fall Apart - Sound Effect (HD).mp3'); // Play a sound for each brick that has been destroyed
                    
                    scoreElement.textContent = `Score: ${score}`;// Set cooldown
                    setTimeout(() => {
                        brickHitCooldown = false;
                    }, 200); 
                    speedY = -speedY;// Reverse ball's vertical direction
                }
                if (!brick.classList.contains('break')) { //Check of all the bricks have been destroyed 
                    allBricksBroken = false;
                }
            }

            if (allBricksBroken) {
                gameRunning = false; // Stop the game
                displayWinningMessage(); // Display winning message if all the bricks destroyed
                return;
            }
    
            // Check collision with walls
            if (x < 0 || x + ball.clientWidth > gameContainer.clientWidth) {
                speedX = -speedX;
            }
    
            if (y < 0 || y + ball.clientHeight > gameContainer.clientHeight) {
                speedY = -speedY;
            }
    
            if (!brickHitCooldown && isCollision(ball, paddle)) {
                speedY = -speedY; // Reverse ball's vertical direction
                y -= 20;
            }
            if (y + ball.clientHeight > gameContainer.clientHeight) {
                // Ball passed the paddle, game over
                gameOver();
                return;
            }
           
        
    
            ball.style.left = x + 'px';
            ball.style.top = y + 'px';
}

function isCollision(element1, element2) { // Collision Function
            const rect1 = element1.getBoundingClientRect();
            const rect2 = element2.getBoundingClientRect();
    
            return (
                rect1.x < rect2.x + rect2.width &&
                rect1.x + rect1.width > rect2.x &&
                rect1.y < rect2.y + rect2.height &&
                rect1.y + rect1.height  > rect2.y
            );
}

function handleSpaceKey(event) { // Check if the space key been pressed and if so start the game
            if (event.code === 'Space') {

                if (!gameRunning && !gameover) {
                    // Start the game on the first space key press
                
                    gameRunning = true;
                    // Move the ball upward when space key is pressed
                    speedY = -6; // spead of the ball
                    gameLoop();
                } else {
                    gameRunning = false;
                }
            }
}

function displayWinningMessage() {
            // Display your winning message or perform any actions
            // For example, you can show an element with an id 'win-message'
           
            const winMessageElement = document.getElementById('winningMessage');
            const buttonMessage = document.getElementById ('next-level')
            winMessageElement.style.display = 'block';
            buttonMessage.style.display = 'block'
}

function gameOver() { 
             gameRunning = false;
            gameover = true;
            playSound('Sounds/mixkit-arcade-game-opener-222.wav');
            gameRunning = false;
            gameOverMessage.style.display = 'block';
            playAgainButton.style.display = 'block';
}

function playAgain() {
            gameOverMessage.style.display = 'none';
            playAgainButton.style.display = 'none';
            gameover = false;
            resetGame();
}

function playSound(soundFile) {
            const sound = new Audio(soundFile);
            sound.play();
}

function resetGame() {
            // Reset ball and other game elements
            x = 402; // Initial x position
            y = 600; // Initial y position
            speedX = 2;
            speedY = -4;
        
            // Update paddle's initial position correctly
            paddle.style.bottom = initialPaddlePosition.bottom + 'px';
            paddle.style.left = initialPaddlePosition.left + 'px';
        
            // Ensure brickStates is initialized and set to true for all bricks
            brickStates = Array.from(document.querySelectorAll('.brick')).map(() => true);
        
            Array.from(document.querySelectorAll('.brick')).forEach((brick, index) => {
                brick.classList.remove('break'); // Remove 'break' class
            brickStates[index] = true; // Reset brick state
            brick.style.display = 'block'; // Show the brick
            });
            score=0; 
                    
            scoreElement.textContent = `Score: ${score}`;
        
            // Start the game
            gameRunning = true;
            gameLoop();
}

function gameLoop() {
           
            updateBallPosition();
            if (gameRunning) {
                requestAnimationFrame(gameLoop);
            }
}
    
    // Add event listener for the space key
document.addEventListener('keydown', handleSpaceKey);
