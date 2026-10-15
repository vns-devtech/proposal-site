import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  type: 'heart' | 'petal' | 'sparkle';
  color: string;
}

interface BackgroundCanvasProps {
  onSecretHeartClick?: (message: string) => void;
}

const SECRET_COMPLIMENTS = [
  "Secret Note #1: You look breathtaking today, even if you just woke up. 🌸",
  "Secret Note #2: I still get butterflies every time your name lights up my screen. 🦋",
  "Secret Note #3: You're my favorite thought before falling asleep and when waking up. 💫",
  "Secret Note #4: Thank you for choosing to be silly with me. 🤭💗",
  "Secret Note #5: You are my greatest adventure and sweetest peace. 💍"
];

export const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({ onSecretHeartClick }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const clickCountRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];
    const colors = ['#FFC6D4', '#FF6F91', '#E8DDF8', '#FFF8F1', '#FFE082'];

    // Helper to draw a heart
    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha: number) => {
      c.save();
      c.translate(x, y);
      c.globalAlpha = alpha;
      c.fillStyle = color;
      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(0, topCurveHeight);
      c.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      c.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size * 1.3);
      c.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
      c.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      c.closePath();
      c.fill();
      c.restore();
    };

    // Helper to draw a soft rose petal
    const drawPetal = (c: CanvasRenderingContext2D, x: number, y: number, size: number, rot: number, color: string, alpha: number) => {
      c.save();
      c.translate(x, y);
      c.rotate(rot);
      c.globalAlpha = alpha;
      c.fillStyle = color;
      c.beginPath();
      c.ellipse(0, 0, size * 0.5, size * 0.8, 0, 0, Math.PI * 2);
      c.fill();
      c.restore();
    };

    // Helper to draw a 4-point sparkle
    const drawSparkle = (c: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha: number) => {
      c.save();
      c.translate(x, y);
      c.globalAlpha = alpha;
      c.fillStyle = color;
      c.beginPath();
      c.moveTo(0, -size);
      c.quadraticCurveTo(0, 0, size, 0);
      c.quadraticCurveTo(0, 0, 0, size);
      c.quadraticCurveTo(0, 0, -size, 0);
      c.quadraticCurveTo(0, 0, 0, -size);
      c.closePath();
      c.fill();
      c.restore();
    };

    // Initialize 30 peaceful background particles
    const particleCount = window.innerWidth < 768 ? 16 : 32;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 12 + 8,
        speedY: -(Math.random() * 0.6 + 0.3),
        speedX: (Math.random() - 0.5) * 0.4,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.45 + 0.25,
        type: i % 3 === 0 ? 'heart' : i % 3 === 1 ? 'petal' : 'sparkle',
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    // Interactive burst function
    const spawnBurst = (clickX: number, clickY: number) => {
      for (let i = 0; i < 8; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 1;
        particles.push({
          x: clickX,
          y: clickY,
          size: Math.random() * 10 + 6,
          speedY: Math.sin(angle) * speed - 1.2,
          speedX: Math.cos(angle) * speed,
          rotation: Math.random() * Math.PI,
          rotationSpeed: (Math.random() - 0.5) * 0.05,
          opacity: 0.9,
          type: Math.random() > 0.5 ? 'heart' : 'sparkle',
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const handleCanvasClick = (e: MouseEvent) => {
      spawnBurst(e.clientX, e.clientY);
      clickCountRef.current += 1;
      if (clickCountRef.current % 3 === 0 && onSecretHeartClick) {
        const index = (Math.floor(clickCountRef.current / 3) - 1) % SECRET_COMPLIMENTS.length;
        onSecretHeartClick(SECRET_COMPLIMENTS[index]);
      }
    };

    window.addEventListener('click', handleCanvasClick);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        // Wrap around top screen
        if (p.y < -30) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 20;
        if (p.x > width + 30) p.x = -20;

        if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.opacity);
        } else if (p.type === 'petal') {
          drawPetal(ctx, p.x, p.y, p.size, p.rotation, p.color, p.opacity);
        } else {
          drawSparkle(ctx, p.x, p.y, p.size * 0.7, p.color, p.opacity);
        }
      }

      // Keep burst particles count bounded
      if (particles.length > 55) {
        particles.splice(0, particles.length - 45);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [onSecretHeartClick]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  );
};
