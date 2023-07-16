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
  ctx.save(); // Save the current canvas state

  if (joshX + joshWidth / 2 < canvas.width / 2) {
    // If Josh is moving to the left, flip the image horizontally
    ctx.scale(-1, 1); // Flip horizontally
    ctx.drawImage(joshImage, -joshX - joshWidth, joshY, joshWidth, joshHeight);
  } else {
    // Otherwise, draw Josh normally
    ctx.drawImage(joshImage, joshX, joshY, joshWidth, joshHeight);
  }

  ctx.restore(); // Restore the previous canvas state
}



  drawBottle = () => {
    ctx.drawImage(bottleImage, bottleX, bottleY, bottleWidth, bottleHeight);
    bottleY += bottleSpeed;
  
    // Reset bottle position if it goes off the screen
    if (bottleY > canvas.height) {
      bottleY = -bottleHeight;
      bottleX = Math.random() * (canvas.width - bottleWidth); // Randomize bottle's X position
    }
  
    // Check for collision between Josh and the bottle
    if (
      joshY < bottleY + bottleHeight &&
      joshY + joshHeight > bottleY &&
      joshX < bottleX + bottleWidth &&
      joshX + joshWidth > bottleX
    ) {
      // Collision detected
      handleBottleCollision();
    }
  }

  

 drawPresent = () => {
    ctx.drawImage(presentImage, presentX, presentY, presentWidth, presentHeight);
    presentY += presentSpeed;
    presentX -= presentSpeed;
  
    // Reset present position if it goes off the screen
    if (presentY > canvas.height) {
      presentY = -presentHeight;
    }
    if (presentX < 0) {
      presentX = canvas.width;
    }
    
    // Check for collision between Josh and the present
    if (
      joshY < presentY + presentHeight &&
      joshY + joshHeight > presentY &&
      joshX < presentX + presentWidth &&
      joshX + joshWidth > presentX
    ) 
    presentVisible = true;
    {
      // Collision detected
      collectPresent();
    }
  
    // Reset present position if it goes off the screen
    if (presentY > canvas.height) {
      presentY = -presentHeight;
    }
    // Draw score text on canvas
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
    // Only allow score to increment if present is visible
    if (!presentVisible) {
      return;
    }
    presentY = -presentHeight; // Move the present off-screen
    score++; // Increment the score
  
    presentVisible = false; // Mark present as collected
  
    if (score >= 50) {
      // Win condition
      gameWin = true;
      gameOver = true;
    } else if (score === 0) {
      // Game over condition
      gameOver = true;
    }
  }
  
  
  updateJosh = () => {
    // Apply gravity to Josh's vertical speed
    joshYSpeed += joshGravity;
    joshY += joshYSpeed;
  
    // Prevent Josh from going below the ground
    if (joshY > canvas.height - joshHeight) {
      joshY = canvas.height - joshHeight;
      joshYSpeed = 0;
    }
  
    // Prevent Josh from going off the left side of the screen
    if (joshX < 0) {
      joshX = 0;
    }
  
    // Prevent Josh from going off the right side of the screen
    if (joshX > canvas.width - joshWidth) {
      joshX = canvas.width - joshWidth;
    }
  }
  // Add the handleJump function to handle jumping
handleJump = () => {
  if (joshY === canvas.height - joshHeight) {
    // Only allow jumping if Josh is on the ground
    joshYSpeed = joshJumpForce;
  }
}

  
  // Update the keydown event listener to handle left and right movement with boundary checks
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

  // Needs work?
  
    
    
    // Villan collision
     handleBottleCollision = () => {
      // Subtract 3 points from the score when Josh catches the bottle
      score -= 3;
      if (score < 0) {
        score = 0;
      }
    
    
      // Reset bottle position
      bottleY = -bottleHeight;
      bottleX = Math.random() * (canvas.width - bottleWidth); // Randomize bottle's X position
    }
    
    

    animate = () => {
      if (!gameRunning) {
        return; // Exit the function if the game is not running
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
          // Draw "Happy birthday Josh" text
          ctx.font = '60px Arial';
          ctx.fillStyle = 'white';
          ctx.fillText('Happy Birthday Josh!', 300, 300);
        } else {
          if (gameOver) {
          drawGameOverText();
          gameRunning = false;
        }
      }
    
        // Clear the bottle and present
        bottleY = -bottleHeight;
        presentY = -presentHeight;
      }
    }
    
    
// Set up keyboard input
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


// Set up score display 
scoreText = document.createElement('div');
document.body.appendChild(scoreText);



// Function to start the game
startGame = () => {
  if (!gameStarted) {
    gameStarted = true;
    gameRunning = true; // Set the game to running state
    drawBackground();
    animate();
    
    // Add animating class to start button
    startButton.classList.add('animating');
    const title = document.querySelector('.title');
    title.style.display = 'none';
  }
}

// Function to toggle the visibility of the instructions
toggleInstructions = () => {
  const instructionsContainer = document.querySelector('.instructions-container');
  if (instructionsContainer.style.display === 'none') {
    instructionsContainer.style.display = 'block';
  } else {
    instructionsContainer.style.display = 'none';
  }
}



// Add event listener to the start button
const startButton = document.getElementById('start');
startButton.addEventListener('click', startGame);


// hide the start button when the user clicks on it
startButton.addEventListener('click', function() {
  startButton.style.display = 'none';
});



drawBackground(); // Add this line to call the drawBackground() function
animate();

