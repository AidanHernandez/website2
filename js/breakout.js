rulesBtn = document.getElementById('rules-btn')
colorBtn = document.getElementById('color-btn')
rules = document.getElementById('rules')
closeBtn = document.getElementById('close-btn')
canvas = document.getElementById('canvas')
ctx = canvas.getContext('2d')
score = 0
color_change_paddle = 0;
color_change = 0
brickRowCount = 9
brickColumnCount = 5
pause = 1;
pause2 = 0;
// Create ball properties
ball = {
    x: canvas.width / 2,
    y: (canvas.height+50) / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4,
}

// Create Paddle Properties
paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0,
}

// Create brick properties
brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
}

// Create bricks
bricks = []
for(i = 0; i < brickRowCount; i++) {
    bricks[i] = []
    for(j = 0; j < brickColumnCount; j++){
        x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX
        y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY
        // '...' will add everything in from brickInfo (Spread operator)
        bricks[i][j] = {x, y, ...brickInfo}
    }
}

// Draw ball on canvas
function drawBall() {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2)
    ctx.fillStyle = '#70AE6E'
    ctx.fill()
    ctx.closePath()
}

// Draw paddle on canvas
function drawPaddle() {
    ctx.beginPath()
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h)
    if (color_change_paddle == 1)
    {
        ctx.fillStyle = '#ffffff'
    }
    else{
        ctx.fillStyle = '#843B62'
    }
    
    ctx.fill()
    ctx.closePath()
}

//pause
function drawPause(){
    if(pause == 1)
    {
    ctx.font = '25px Comic Sans'
    ctx.fillStyle = '#000000'
    ctx.fillText(`pRess any button to start the game`, canvas.width- 500, 300)
    }
}
// Draw score on canvas
function drawScore() {
    ctx.font = '25px Comic Sans'
    ctx.fillStyle = '#F17105'
    ctx.fillText(`Score: ${score}`, canvas.width-100, 30)
}

// Draw bricks on canvas
function drawBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath()
            ctx.rect(brick.x,brick.y,brick.w,brick.h)
            ctx.fillStyle = brick.visible ? '#032B43' : 'transparent';
            ctx.fill()
            ctx.closePath()
        })
    })
}

// Draw everything
function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    drawPause()
    drawPaddle()
    drawBall()
    drawScore()
    drawBricks()
}

draw()



//Move paddle on canvas
function movePaddle(){
    paddle.x = paddle.x + paddle.dx

    //wall detection
    if (paddle.x < 0){
        paddle.x = 0
    }
    if (paddle.x +paddle.w>canvas.width){
        paddle.x = canvas.width-paddle.w
    }
}

window.addEventListener('click', () => {
    pause = 0;

    console.log("huh");
    console.log(pause);
    if(pause2 <1)
    {
        showAllBricks()
        score = 0
        pause2++
        update()
    }
});

window.addEventListener('keyup', () => {
    pause = 0;
    console.log("huh");
    console.log(pause);
    if(pause2 <1)
    {
        showAllBricks()
        score = 0
        pause2++
        update()
    }
});

//keyboard event

function keyDown(e){

    if(e.key == 'ArrowRight' || e.key == 'Right'){
        paddle.dx = paddle.speed
    }
    if(e.key == 'ArrowLeft' || e.key == 'Left'){
        paddle.dx = -paddle.speed
    }
}

//keyup event
function keyUp(e){
    if(e.key == 'ArrowRight' || e.key == 'Right'){
        paddle.dx=0
    }
    if(e.key == 'ArrowLeft' || e.key == 'Left'){
        paddle.dx=0
    }
}

function keyDown(e){
    //console.log(e.key)
    if(e.key == 'ArrowRight' || e.key == 'Right'){
        paddle.dx = paddle.speed
    }
    if(e.key == 'ArrowLeft' || e.key == 'Left'){
        paddle.dx = -paddle.speed
    }
}


function moveBall(){
    ball.x =ball.x+ball.dx
    ball.y = ball.y+ball.dy

    //wall collison(top)
    if(ball.y + ball.size < 0){
        ball.dy = -1 * ball.dy
    }

    //wall colision(right)
    if (ball.x+ball.size>canvas.width){
        ball.dx = -1 * ball.dx
    }
     //wall collison(bottoom)
    if(ball.y + ball.size > canvas.height){
        ball.dy = -1 * ball.dy


        ball.x =canvas.width / 2,
        ball.y =(canvas.height+50) / 2,
        pause2 = 0
        pause = 1
    }
    //wall colision(left)
    if (ball.x+ball.size<0){
        ball.dx = -1 * ball.dx
    }
    //paddle collision
    if (
        ball.x - ball.size > paddle.x &&
        ball.x + ball.size < paddle.x + paddle.w &&
        ball.y + ball.size > paddle.y
    ){
        ball.dy = -1 * ball.dy
    }

    //brick collision
    bricks.forEach(column =>{
        column.forEach(brick =>{
            if(brick.visible){
                if(
                    ball.y - ball.size < brick.y  + brick.h && ball.x - ball.size > brick.x && ball.x + ball.size < brick.x + brick.w&&
                    ball.y+ball.size > brick.y
                )
                {
                    ball.dy = -ball.dy
                    brick.visible = false
                    increaseScore()
                }
            }
        })
    })

}


//increase score
function increaseScore(){
    score++

    if (score == brickRowCount * brickColumnCount){
        score=0
        showAllBricks()
    }
}

function showAllBricks(){
    bricks.forEach(column =>{
        column.forEach(brick => {
            brick.visible = true
        })
    })
}
//keyboard event handler
document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)
// Update the canvas drawing and animation
function update(){
    if(pause == 0)
    {
    moveBall()
    movePaddle()
    draw()
    requestAnimationFrame(update)
    }
    else{
        draw()
    }
}

update()
// Rules open and close
rulesBtn.addEventListener('click', () => {
    rules.classList.add('show')
})

closeBtn.addEventListener('click', () => {
    rules.classList.remove('show')
})

colorBtn.addEventListener('click', () => {
    

    color_change = color_change + 1;
    console.log(color_change % 2, "paddle", color_change_paddle);
    if (color_change % 2 == 1)
    {
        document.body.style.backgroundColor = "black";
        document.getElementById("canvas").style.background="#3b3b3b";
        color_change_paddle = 1;
        document.getElementById("color-btn").style.background="#ffffff";
        document.getElementById("color-btn").style.color="black";
    }
    else{
        color_change_paddle = 0;
        document.body.style.backgroundColor = "#aaf0d1";
        document.getElementById("canvas").style.background="#ffffff";
    
        document.getElementById("color-btn").style.background="black";
        document.getElementById("color-btn").style.color="white";
    }
    
})
