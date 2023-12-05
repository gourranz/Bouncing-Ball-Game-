

//Moving the Player Paddle


const paddle = document.getElementById('playerPaddle');
let movingLeft = false;
let movingRight = false;
const initialPaddlePosition = {
    bottom: parseFloat(getComputedStyle(paddle).bottom),
    left: parseFloat(getComputedStyle(paddle).left)
};


//
document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        movingLeft = true;
    } else if (event.key === 'ArrowRight') {
        movingRight = true;
    }
});

document.addEventListener('keyup', function (event) {
    if (event.key === 'ArrowLeft') {
        movingLeft = false;
    } else if (event.key === 'ArrowRight') {
        movingRight = false;
    }
});

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

const ball = document.getElementById('ball');
const gameContainer = document.getElementById('container');
const computedStyles = window.getComputedStyle(ball);
const bricks = document.querySelectorAll('.brick');
const scoreElement = document.getElementById('scores');
const gameOverMessage = document.getElementById('game-over-message');
const playAgainButton = document.getElementById('play-again-btn');
let brickStates;


let score = 0;

//Generating the bricks

/*function generateBricks(rows, cols) {
    const bricks = [];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const brick = document.createElement('div');
            brick.className = 'brick';
            gameContainer.appendChild(brick);
            bricks.push(brick);
        }
    }

    return bricks;
}
*/

//const bricks = generateBricks(5, 5);

        let gameRunning = false;
        let x = 402; // Initial x position
        let y = 600; // Initial y position
        let speedX = 2 ;
        let speedY = -4;
        let brickHitCooldown = false;
        let backgroundMusic = document.getElementById('backgroundMusic');
        
        function startBackgroundMusic() {
            backgroundMusic.play();
        }
        
        function stopBackgroundMusic() {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
        }
  
        function updateBallPosition() {
            playSound('./Sounds/chase-8-bit-73312.mp3');
            if (!gameRunning) {
                return;
            }

            let allBricksBroken = true;
    
            x += speedX;
            y += speedY;
    
            for (const brick of bricks) {
                if (!brickHitCooldown && !brick.classList.contains('break') && isCollision(ball, brick)) {
                    brick.classList.add('break') ; // Hide the brick
                    brickHitCooldown = true;
                    score+=10; 
                    
                    scoreElement.textContent = `Score: ${score}`;// Set cooldown
                    setTimeout(() => {
                        brickHitCooldown = false;
                    }, 200); // Adjust the delay as needed
                    speedY = -speedY;
                 // Reverse ball's vertical direction
                }
                if (!brick.classList.contains('break')) {
                    allBricksBroken = false;
                }
            }

            if (allBricksBroken) {
                gameRunning = false; // Stop the game
                displayWinningMessage();
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
        function isCollision(element1, element2) {
            const rect1 = element1.getBoundingClientRect();
            const rect2 = element2.getBoundingClientRect();
    
            return (
                rect1.x < rect2.x + rect2.width &&
                rect1.x + rect1.width > rect2.x &&
                rect1.y < rect2.y + rect2.height &&
                rect1.y + rect1.height  > rect2.y
            );
        }

        function handleSpaceKey(event) {
            if (event.code === 'Space') {

                if (!gameRunning) {
                    // Start the game on the first space key press
                startBackgroundMusic();

                    gameRunning = true;
                    // Move the ball upward when space key is pressed
                    speedY = -4; // spead of the ball
                    gameLoop();
                } 
            }
        }
        function displayWinningMessage() {
            // Display your winning message or perform any actions
            // For example, you can show an element with an id 'win-message'
           
            const winMessageElement = document.getElementById('next-level-message');
            const buttonMessage = document.getElementById ('next-level')
            winMessageElement.style.display = 'block';
            buttonMessage.style.display = 'block'
        }
        function gameOver() {
             gameRunning = false;
            stopBackgroundMusic();
            playSound('Sounds/mixkit-arcade-game-opener-222.wav');
            gameRunning = false;
            gameOverMessage.style.display = 'block';
            playAgainButton.style.display = 'block';
        }
        function playAgain() {
            gameOverMessage.style.display = 'none';
            playAgainButton.style.display = 'none';
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


         /*function updateGame() {
             
            const paddleY = parseFloat(window.getComputedStyle(paddle).left)

            */
            

         /*   if (!brickHitCooldown && isCollision(ball, paddle)) {
                brickHitCooldown = true;
                ballSpeedY = -ballSpeedY; // Reverse ball's vertical direction
            } */


    // Update paddle position on the screen
           // paddle.updateDisplay();

    // Repeat the update function