
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let chefiko = {
  x: 180,
  y: 300,
  width: 40,
  height: 40,
  color: '#ff5733',
  targetX: 180,
  targetY: 300,
  speed: 2
};

canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  chefiko.targetX = e.clientX - rect.left - chefiko.width / 2;
  chefiko.targetY = e.clientY - rect.top - chefiko.height / 2;
});

function update() {
  let dx = chefiko.targetX - chefiko.x;
  let dy = chefiko.targetY - chefiko.y;
  let dist = Math.sqrt(dx * dx + dy * dy);
  if (dist > chefiko.speed) {
    chefiko.x += (dx / dist) * chefiko.speed;
    chefiko.y += (dy / dist) * chefiko.speed;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#c0c0c0'; ctx.fillRect(20, 100, 60, 40); // Fırın
  ctx.fillStyle = '#c0c0c0'; ctx.fillRect(320, 450, 60, 40); // Kasa
  ctx.fillStyle = chefiko.color;
  ctx.fillRect(chefiko.x, chefiko.y, chefiko.width, chefiko.height);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
