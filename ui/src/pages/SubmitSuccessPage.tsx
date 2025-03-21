import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import Button from "../components/Button";
import PageTransition from "../components/PageTransition";

const SubmitSuccessPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Confetti effect
    const createConfetti = () => {
      const confettiCount = 200;
      const colors = ["#3498db", "#9b59b6", "#e74c3c", "#2ecc71", "#f1c40f"];

      for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";

        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.animationDelay = Math.random() * 5 + "s";
        confetti.style.backgroundColor =
          colors[Math.floor(Math.random() * colors.length)];

        document.getElementById("confetti-container")?.appendChild(confetti);
      }

      // Clean up confetti after animation
      setTimeout(() => {
        const container = document.getElementById("confetti-container");
        if (container) {
          container.innerHTML = "";
        }
      }, 10000);
    };

    createConfetti();
  }, []);

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center relative overflow-hidden">
      <div
        id="confetti-container"
        className="absolute inset-0 pointer-events-none"
      >
        <style>
          {`
            .confetti {
              position: absolute;
              width: 10px;
              height: 10px;
              top: -10px;
              opacity: 0;
              transform: translateY(0) rotate(0);
              animation: confetti-fall 5s ease-out forwards;
              border-radius: 2px;
            }
            
            @keyframes confetti-fall {
              0% {
                opacity: 1;
                transform: translateY(0) rotate(0);
              }
              100% {
                opacity: 0;
                transform: translateY(100vh) rotate(720deg);
              }
            }
          `}
        </style>
      </div>

      <PageTransition>
        <div className="max-w-2xl mx-auto text-center card px-8 py-12 z-10 backdrop-blur-md bg-opacity-70">
          <div className="w-20 h-20 rounded-full bg-green-500 text-white flex items-center justify-center mx-auto mb-6 animate-pulse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            Submission Successful!
          </h1>

          <p className="text-gray-300 text-lg mb-8">
            Thank you for providing your customer information. Your details have
            been successfully submitted.
          </p>

          <div className="p-4 bg-gray-800/70 rounded-lg mb-8 inline-block">
            <p className="text-gray-300">
              Submission Reference:{" "}
              <span className="font-mono text-blue-400 font-medium">
                CUS-{Math.random().toString(36).substring(2, 10).toUpperCase()}
              </span>
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Submitted on: {new Date().toLocaleDateString()} at{" "}
              {new Date().toLocaleTimeString()}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button onClick={() => navigate("/")} className="min-w-[160px]">
              Return to Home
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate("/customer-detail")}
              className="min-w-[160px]"
            >
              Submit Another
            </Button>
          </div>
        </div>
      </PageTransition>
    </div>
  );
};

export default SubmitSuccessPage;
