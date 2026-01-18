"use client";
import { useEffect, useRef } from "react";

export default function ThreeBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let stars = [];
    
    let mouse = { x: undefined, y: undefined };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      for (let i = 0; i < 3; i++) {
        particles.push(new Particle(mouse.x, mouse.y));
      }
    };

    const handleClick = (e) => {
      for (let i = 0; i < 35; i++) {
        particles.push(new Particle(e.clientX, e.clientY, true));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleClick);

    resize();

    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.2,
        speed: Math.random() * 0.4
      });
    }

    class Particle {
      constructor(x, y, isExplosion = false) {
        this.x = x;
        this.y = y;
        this.size = isExplosion ? Math.random() * 6 + 2 : Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * (isExplosion ? 12 : 3);
        this.speedY = (Math.random() - 0.5) * (isExplosion ? 12 : 3);
        this.color = isExplosion ? "#00f2ff" : `hsl(${180 + Math.random() * 20}, 100%, 50%)`;
        this.alpha = 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.015;
        if (this.size > 0.1) this.size -= 0.05;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.shadowBlur = 12;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const animate = () => {
      ctx.fillStyle = "rgba(10, 10, 10, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = "white";
      stars.forEach(star => {
        ctx.globalAlpha = 0.35;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        star.y += star.speed;
        if (star.y > canvas.height) star.y = 0;
      });

      ctx.save();
      ctx.globalAlpha = 0.12;
      ctx.font = "600 56px Poppins, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#ffffff";
      ctx.fillText("Choice Technology", canvas.width / 2, canvas.height / 2);
      ctx.restore();

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].alpha <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 bg-[#0a0a0a]"
    />
  );
}
