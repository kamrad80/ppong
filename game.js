const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Параметры игры
const paddleWidth = 80;
const paddleHeight = 10;
const ballSize = 10;
let paddleX = (canvas.width - paddleWidth) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let ballDX = 2; // Скорость мяча по X
let ballDY = -2; // Скорость мяча по Y
let score = 0;
let rightPressed = false;
let leftPressed = false;

// Управление
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
    else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
    else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
}

// Отрисовка платформы
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

// Отрисовка мяча
function drawBall() {
    ctx.beginPath();
    ctx.rect(ballX, ballY, ballSize, ballSize);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

// Отрисовка счёта
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Счёт: " + score, 8, 20);
}

// Логика игры
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очистка экрана
    drawPaddle();
    drawBall();
    drawScore();

    // Движение платформы
    if (rightPressed && paddleX < canvas.width - paddleWidth) paddleX += 5;
    if (leftPressed && paddleX > 0) paddleX -= 5;

    // Движение мяча
    ballX += ballDX;
    ballY += ballDY;

    // Отскок от стен
    if (ballX + ballSize > canvas.width || ballX < 0) ballDX = -ballDX;
    if (ballY < 0) ballDY = -ballDY;

    // Отскок от платформы
    if (
        ballY + ballSize > canvas.height - paddleHeight &&
        ballX > paddleX &&
        ballX < paddleX + paddleWidth
    ) {
        ballDY = -ballDY;
        score++;
    }

    // Проигрыш
    if (ballY + ballSize > canvas.height) {
        alert("Игра окончена! Счёт: " + score);
        document.location.reload();
    }

    requestAnimationFrame(draw);
}

draw(); // Запуск игры
