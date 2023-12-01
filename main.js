

//Moving the Player Paddle


const paddle = document.getElementById('playerPaddle');
let movingLeft = false;
let movingRight = false;

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
        let speedY = 0;
        let brickHitCooldown = false;
  
        function updateBallPosition() {
            if (!gameRunning) {
                return;
            }

            x += speedX;
            y += speedY;

            // Check collision with walls
            if (x < 0 || x  + ball.clientWidth > gameContainer.clientWidth ) {
                speedX = -speedX;
            }

            if (y < 0 || y + ball.clientHeight > gameContainer.clientHeight) {
                speedY = -speedY;
            }

            ball.style.left = x + 'px';
            ball.style.top = y + 'px';
        }
        function updateGame() {


            for (const brick of bricks) {
                if (!brickHitCooldown && isCollision(ball, brick)) {
                    brick.style.display = 'none'; // Hide the brick
                    brickHitCooldown = true; // Set cooldown
                    setTimeout(() => {
                        brickHitCooldown = false;
                    }, 200); // Adjust the delay as needed
                    speedY = -speedY; // Reverse ball's vertical direction
                }
            }
        requestAnimationFrame(updateGame);
    }

        function isCollision(element1, element2) {
            const rect1 = element1.getBoundingClientRect();
            const rect2 = element2.getBoundingClientRect();
    
            return (
                rect1.x < rect2.x + rect2.width &&
                rect1.x + rect1.width > rect2.x &&
                rect1.y < rect2.y + rect2.height &&
                rect1.y + rect1.height > rect2.y
            );
        }

        function handleSpaceKey(event) {
            if (event.code === 'Space') {
                if (!gameRunning) {
                    // Start the game on the first space key press
                    gameRunning = true;
                    // Move the ball upward when space key is pressed
                    speedY = -4; // spead of the ball
                    gameLoop();
                } 
            }
        }

        function gameLoop() {
            updateBallPosition();
            if (gameRunning) {
                requestAnimationFrame(gameLoop);
            }
        }
        updateGame()
    


        // Add event listener for the space key
        document.addEventListener('keydown', handleSpaceKey);