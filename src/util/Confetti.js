import confetti from "canvas-confetti";

export function celebrate() {
  // Configura el efecto de confeti
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 20, spread: 360, ticks: 20, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  function confettiLoop() {
    if (Date.now() > animationEnd) return;

    confetti({
      ...defaults,
      particleCount: 30,
      angle: randomInRange(55, 125),
      decay: randomInRange(0.6, 0.8),
      colors: ["#FF0000", "#00FF00", "#0000FF"],
      origin: { x: Math.random(), y: Math.random() - 0.2 },
    });

    requestAnimationFrame(confettiLoop);
  }

  // Inicia el efecto de confeti
  confettiLoop();
}