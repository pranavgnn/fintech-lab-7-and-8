import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import Button from "../components/Button";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }[] = [];

    const createParticles = () => {
      const particleCount = Math.floor(window.innerWidth / 15);

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          speedX: Math.random() * 0.3 - 0.15,
          speedY: Math.random() * 0.3 - 0.15,
          color: `rgba(${Math.floor(Math.random() * 100) + 155}, ${
            Math.floor(Math.random() * 100) + 155
          }, 255, ${Math.random() * 0.3 + 0.2})`,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();

        // Update particle position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX = -particle.speedX;
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY = -particle.speedY;
        }

        // Draw connections
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(100, 100, 255, ${
                0.1 * (1 - distance / 150)
              })`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
            }
          }
        });
      });

      requestAnimationFrame(drawParticles);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      createParticles();
    };

    window.addEventListener("resize", handleResize);
    createParticles();
    drawParticles();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full -z-10"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[hsl(var(--background))] via-transparent to-[hsl(var(--background))] opacity-70 -z-5"></div>

      <div className="container mx-auto px-4 py-20 min-h-screen flex flex-col justify-center items-center">
        <div className="text-center max-w-3xl mx-auto fadeIn slideUp">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Customer Portal
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12">
            Simplify your customer management process with our sleek, modern
            interface designed for efficiency.
          </p>

          <div className="space-y-4">
            <Button
              className="w-full md:w-64 text-lg py-4"
              onClick={() => navigate("/customer-detail")}
            >
              Get Started
            </Button>

            <p className="text-gray-400 text-sm">
              Streamlined customer data collection system
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
