
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const moneyEl = document.getElementById('money');

let chefiko = { x: 180, y: 500, targetX: 180, targetY: 500, width: 40, height: 40, color: '#e74c3c', carrying: false };
let customer = { x: 160, y: 100, width: 40, height: 40, active: true, waiting: true };
let money = 0;
let goal = 0;

canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  chefiko.targetX = e.clientX - rect.left - chefiko.width / 2;
  chefiko.targetY = e.clientY - rect.top - chefiko.height / 2;
});

function update() {
  let dx = chefiko.targetX - chefiko.x;
  let dy = chefiko.targetY - chefiko.y;
  let dist = Math.sqrt(dx*dx + dy*dy);
  if (dist > 2) {
    chefiko.x += dx / dist * 2;
    chefiko.y += dy / dist * 2;
  }

  if (customer.active && chefiko.carrying && Math.abs(chefiko.x - customer.x) < 40 && Math.abs(chefiko.y - customer.y) < 40) {
    // Teslimat
    chefiko.carrying = false;
    customer.active = false;
    money += 25;
    goal++;
    moneyEl.textContent = money;
    document.getElementById('ui').innerHTML = `💰 Kasa: ₺${money} | Görev: ${goal}/3 müşteri memnun`;
    setTimeout(() => {
      customer.active = true;
      customer.waiting = true;
    }, 2000);
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Chefiko
  ctx.fillStyle = chefiko.color;
  ctx.fillRect(chefiko.x, chefiko.y, chefiko.width, chefiko.height);
  if (chefiko.carrying) {
    ctx.fillStyle = '#f1c40f';
    ctx.beginPath();
    ctx.arc(chefiko.x + 20, chefiko.y - 10, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  // Customer
  if (customer.active) {
    ctx.fillStyle = '#3498db';
    ctx.fillRect(customer.x, customer.y, customer.width, customer.height);
    ctx.fillStyle = '#000';
    ctx.fillText("🍕", customer.x + 10, customer.y - 5);
  }

  // Fırın
  ctx.fillStyle = '#d35400';
  ctx.fillRect(20, 450, 60, 40);
  ctx.fillStyle = '#000';
  ctx.fillText("Fırın", 30, 445);
}

canvas.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  // Sağ tıkla pizza al
  if (!chefiko.carrying) {
    chefiko.carrying = true;
  }
});

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
