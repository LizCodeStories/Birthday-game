const birthdayGame = {
  score: 0
};

function preload() {
  this.load.image('background', 'IMG_0043.JPG');

  this.load.image('present', 'present.png');
  this.load.image('josh', 'josh2.png');
}

function create() {
  // Add background
  this.add.image(0, 0, 'background').setOrigin(0, 0);
  // move background down
  this.add.image(0, 0, 'background').setOrigin(0, 0).setScrollFactor(1, 0);
// 

  // Add player
  const josh = this.add.sprite(400, 600, 'josh');
  josh.setScale(0.5); // Set the scale to 50% (half the original size)
  josh.setCollideWorldBounds(true);

  // Create a group for presents
  this.presentsGroup = this.physics.add.group();

  // Set a timer to create a present every second
  this.time.addEvent({
    delay: 1000,
    callback: createPresent,
    callbackScope: this,
    loop: true
  });
}

function update() {
  // Player control
  const cursors = this.input.keyboard.createCursorKeys();
  if (cursors.left.isDown) {
    this.player.setVelocityX(-160);
  } else if (cursors.right.isDown) {
    this.player.setVelocityX(160);
  } else {
    this.player.setVelocityX(0);
  }

  // Jumping mechanics
  if (this.player.body.touching.down && cursors.up.isDown) {
    this.player.setVelocityY(-330);
  }

  // Collision detection
  this.physics.collide(this.player, this.presentsGroup, collectPresent, null, this);
}

function collectPresent(player, present) {
  present.disableBody(true, true);
  birthdayGame.score += 1;

  if (birthdayGame.score >= 10) {
    this.add
      .text(400, 300, 'Happy Birthday!', {
        fontSize: '64px',
        fill: '#ffffff'
      })
      .setOrigin(0.5);
  }
}

function createPresent() {
  const y = Phaser.Math.Between(0, this.height);
  const present = this.physics.add.sprite(
    Phaser.Math.Between(100, 700),
    y,
    'present'
  );
  present.setCollideWorldBounds(true);
  present.setBounce(1);

  this.presentsGroup.add(present);
}


const config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 800,
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);
