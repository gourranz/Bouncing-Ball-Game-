
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

    if (movingLeft && currentPosition > 80 ) {
        paddle.style.left = currentPosition - 5 + 'px';
    }

    if (movingRight && currentPosition < (800 - 80)) {
        paddle.style.left = currentPosition + 5 + 'px';
    }
}

setInterval(movePaddle, 20);