const gameContainer = document.getElementById("game-container");
const target = document.getElementById("target");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const gameOverScreen = document.getElementById("game-over");
const finalScoreElement = document.getElementById("final-score");
const restartButton = document.getElementById("sim");


let time = 30; // Tempo inicial em segundos


// Função para gerar posição aleatória
function getRandomPosition() {
  const containerWidth = gameContainer.offsetWidth;
  const containerHeight = gameContainer.offsetHeight;
  const targetSize = target.offsetWidth;

  const randomX = Math.floor(Math.random() * (containerWidth - targetSize));
  const randomY = Math.floor(Math.random() * (containerHeight - targetSize));

  return { x: randomX, y: randomY };
}

// Atualiza a posição do alvo
function moveTarget() {
  const position = getRandomPosition();
  target.style.left = `${position.x}px`;
  target.style.top = `${position.y}px`;
}

// Incrementa a pontuação ao clicar no alvo
target.addEventListener("click", () => {
  if (time > 0) {
    moveTarget();
  }
});

restartButton.addEventListener("click", endGame)
// Termina o jogo e exibe a tela de pontuação final
function endGame() {
  target.style.display = "none";
  gameOverScreen.classList.remove("hidden");
}

function startFireworks() {
  const canvas = document.getElementById("fireworksCanvas");
  const ctx = canvas.getContext("2d");
  canvas.classList.remove("hidden");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ["#ff5733", "#33ff57", "#5733ff", "#ffd700", "#ff33a6"];

  // Função para criar partículas
  function createParticles(x, y) {
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: x,
        y: y,
        dx: (Math.random() - 0.5) * 10,
        dy: (Math.random() - 0.5) * 10,
        radius: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
      });
    }
  }

  // Função para animar as partículas
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.dx;
      p.y += p.dy;
      p.alpha -= 0.01;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
        i--;
        continue;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${hexToRgb(p.color)},${p.alpha})`;
      ctx.fill();
    }

    if (particles.length > 0) {
      requestAnimationFrame(animate);
    } else {
      canvas.classList.add("hidden");
    }
  }

  // Clique ou chamar manualmente para criar fogos
  canvas.addEventListener("click", (e) => {
    createParticles(e.clientX, e.clientY);
    animate();
  });

  // Helper: converte HEX para RGB
  function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r},${g},${b}`;
  }

  // Inicia um fogo aleatório
  function randomFirework() {
    createParticles(
      Math.random() * canvas.width,
      Math.random() * canvas.height
    );
    animate();
  }

  // Dispara fogos automaticamente a cada 500ms
  for (let i = 0; i < 5; i++) {
    setTimeout(randomFirework, i * 500);
  }
}

// Integração com o botão
document.getElementById("sim").addEventListener("click", () => {
  startFireworks();
});

startGame();

