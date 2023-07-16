let gameStarted = false;
let gameRunning = false;
let josh;
let present;
let score = 0;
let scoreText;
let cursors;
let gameOver = false;
let gameWin = false;
let presentVisible = true;
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 1220;
canvas.height = 730;
canvas.style.display = 'block';
canvas.style.background = 'cover no-repeat, center center';

// Drawing all the images
const background = new Image();
background.src = 'IMG_0382 2.jpg';
const backgroundWidth = 1260;
const backgroundHeight = 790;

const joshImage = new Image();
joshImage.src = 'joshua2.png';
const joshWidth = 200;
const joshHeight = 200;
let joshY = 400;
let joshX = 400;
let joshYSpeed = 0;
const joshGravity = 1;
const joshJumpForce = -30;

const presentImage = new Image();
presentImage.src = 'Present.png';
const presentWidth = 100;
const presentHeight = 100;
let presentY = 0;
let presentX = 800;
const presentSpeed = 7;

const bottleImage = new Image();
bottleImage.src = 'bottle2.png';
const bottleWidth = 30;
const bottleHeight = 100;
let bottleY = 0;
let bottleX = 800;
const bottleSpeed = 11;


 drawBackground = () => {
  ctx.drawImage(background, 0, 0, backgroundWidth, backgroundHeight);
}

 drawJosh = () => {
  ctx.save(); 

  if (joshX + joshWidth / 2 < canvas.width / 2) {
   
    ctx.scale(-1, 1); 
    ctx.drawImage(joshImage, -joshX - joshWidth, joshY, joshWidth, joshHeight);
  } else {
 
    ctx.drawImage(joshImage, joshX, joshY, joshWidth, joshHeight);
  }

  ctx.restore(); 
}



  drawBottle = () => {
    ctx.drawImage(bottleImage, bottleX, bottleY, bottleWidth, bottleHeight);
    bottleY += bottleSpeed;
  
   
    if (bottleY > canvas.height) {
      bottleY = -bottleHeight;
      bottleX = Math.random() * (canvas.width - bottleWidth); // Randomize bottle's X position
    }
  
    
    if (
      joshY < bottleY + bottleHeight &&
      joshY + joshHeight > bottleY &&
      joshX < bottleX + bottleWidth &&
      joshX + joshWidth > bottleX
    ) {

      handleBottleCollision();
    }
  }

  

 drawPresent = () => {
    ctx.drawImage(presentImage, presentX, presentY, presentWidth, presentHeight);
    presentY += presentSpeed;
    presentX -= presentSpeed;
  
    if (presentY > canvas.height) {
      presentY = -presentHeight;
    }
    if (presentX < 0) {
      presentX = canvas.width;
    }
    
   
    if (
      joshY < presentY + presentHeight &&
      joshY + joshHeight > presentY &&
      joshX < presentX + presentWidth &&
      joshX + joshWidth > presentX
    ) 
    presentVisible = true;
    {
    
      collectPresent();
    }
  
    
    if (presentY > canvas.height) {
      presentY = -presentHeight;
    }
 
  ctx.font = '30px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText(`Points: ${score}`, 10, 50);
  }

 drawGameOverText = () =>{
    ctx.font = '60px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('Game Over', 300, 300);
  }
  
  
  collectPresent = () => {
  
    if (!presentVisible) {
      return;
    }
    presentY = -presentHeight; 
    score++; 
  
    presentVisible = false; 
  
    if (score >= 50) {
      gameWin = true;
      gameOver = true;
    } else if (score === 0) {
      
      gameOver = true;
    }
  }
  
  
  updateJosh = () => {
    
    joshYSpeed += joshGravity;
    joshY += joshYSpeed;

    if (joshY > canvas.height - joshHeight) {
      joshY = canvas.height - joshHeight;
      joshYSpeed = 0;
    }
  
 
    if (joshX < 0) {
      joshX = 0;
    }
  
  
    if (joshX > canvas.width - joshWidth) {
      joshX = canvas.width - joshWidth;
    }
  }

handleJump = () => {
  if (joshY === canvas.height - joshHeight) {
 
    joshYSpeed = joshJumpForce;
  }
}


  document.addEventListener('keydown', function(event) {
    if (event.code === 'ArrowUp' || event.code === 'Space') {
      handleJump();
    }
    if (event.code === 'ArrowLeft') {
      joshX -= 70;
      if (joshX < 0) {
        joshX = 0;
      }
    }
    if (event.code === 'ArrowRight') {
      joshX += 70;
      if (joshX > canvas.width - joshWidth) {
        joshX = canvas.width - joshWidth;
      }
    }
  });


  
    
    
    // Villan collision
     handleBottleCollision = () => {
      // Subtract 3 points from the score when Josh catches the bottle
      score -= 3;
      if (score < 0) {
        score = 0;
      }
    
  
      bottleY = -bottleHeight;
      bottleX = Math.random() * (canvas.width - bottleWidth); 
    }
    
    

    animate = () => {
      if (!gameRunning) {
        return; 
      }
      drawBackground();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBackground();
    
      if (!gameOver && !gameWin) {
        drawJosh();
        drawPresent();
        drawBottle();
        updateJosh();
        requestAnimationFrame(animate);
      } else {
        if (gameWin) {
  
          ctx.font = '60px Arial';
          ctx.fillStyle = 'white';
          ctx.fillText('Happy Birthday Josh!', 300, 300);
        } else {
          if (gameOver) {
          drawGameOverText();
          gameRunning = false;
        }
      }

        bottleY = -bottleHeight;
        presentY = -presentHeight;
      }
    }
    
    

document.addEventListener('keydown', function(event) {
  if (event.code === 'ArrowUp' || event.code === 'Space') {
    handleJump();
  }
});

document.addEventListener('keydown', function(event) {
  if (event.code === 'ArrowLeft') {
    joshX -= 70;
  }
  if (event.code === 'ArrowRight') {
    joshX += 70;
  }
});


scoreText = document.createElement('div');
document.body.appendChild(scoreText);



startGame = () => {
  if (!gameStarted) {
    gameStarted = true;
    gameRunning = true; 
    drawBackground();
    animate();

    startButton.classList.add('animating');
    const title = document.querySelector('.title');
    title.style.display = 'none';
  }
}


toggleInstructions = () => {
  const instructionsContainer = document.querySelector('.instructions-container');
  if (instructionsContainer.style.display === 'none') {
    instructionsContainer.style.display = 'block';
  } else {
    instructionsContainer.style.display = 'none';
  }
}


const startButton = document.getElementById('start');
startButton.addEventListener('click', startGame);



startButton.addEventListener('click', function() {
  startButton.style.display = 'none';
});



drawBackground(); 
animate();

