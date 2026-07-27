import { useEffect, useRef } from "react";

export default function CursorEffect() {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: -999, y: -999 });
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    function onMouseMove(e) {
      const prev = mouse.current;

      if (
        Math.hypot(e.clientX - prev.x, e.clientY - prev.y) > 10 &&
        Math.random() < 0.65
      ) {
        spawnParticle(e.clientX, e.clientY);
      }

      mouse.current = {
        x: e.clientX,
        y: e.clientY,
      };
    }

    window.addEventListener("mousemove", onMouseMove);

    function spawnParticle(x, y) {
      particles.current.push({
        x: x + random(-8, 8),
        y: y + random(-8, 8),

        width: random(8, 13),
        height: random(10, 15),

        rotation: random(-0.25, 0.25),
        rotationSpeed: random(-0.01, 0.01),

        vx: random(-0.25, 0.25),
        vy: random(-1.2, -0.4),

        opacity: random(0.4, 0.8),

        life: 1,
        decay: random(0.015, 0.03),
      });
    }

    function drawDocument(p) {
      ctx.save();

      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      ctx.globalAlpha = p.opacity * p.life;

      // document body
      ctx.fillStyle = "#60a5fa";
      ctx.fillRect(
        -p.width / 2,
        -p.height / 2,
        p.width,
        p.height
      );

      // folded corner
      ctx.fillStyle = "#dbeafe";

      ctx.beginPath();
      ctx.moveTo(p.width / 2 - 4, -p.height / 2);
      ctx.lineTo(p.width / 2, -p.height / 2);
      ctx.lineTo(p.width / 2, -p.height / 2 + 4);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((p) => {
        drawDocument(p);

        p.x += p.vx;
        p.y += p.vy;

        p.rotation += p.rotationSpeed;

        p.life -= p.decay;
      });

      particles.current = particles.current.filter(
        (p) => p.life > 0
      );

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}