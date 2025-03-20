import { useNavigate } from "react-router";
import { Button } from "../components/Button";
import { useEffect, useState } from "react";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh]">
      <div
        className={`transition-all duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="space-animation mb-8">
          <div className="stars flex justify-center">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="text-purple-300 text-3xl mx-1"
                style={{
                  animation: `pulse ${2 + i * 0.2}s infinite ${i * 0.1}s`,
                }}
              >
                ⭐
              </div>
            ))}
          </div>
          <div className="planet-container mt-4">
            <div className="planet h-32 w-32 bg-gradient-to-br from-indigo-500 via-purple-700 to-indigo-800 rounded-full mx-auto pulse relative">
              <div
                className="absolute w-8 h-8 bg-gray-700 rounded-full opacity-30"
                style={{ top: "20%", left: "15%" }}
              ></div>
              <div
                className="absolute w-12 h-12 bg-gray-700 rounded-full opacity-20"
                style={{ bottom: "25%", right: "10%" }}
              ></div>
            </div>
            <div className="orbit w-48 h-48 border border-gray-700 rounded-full mx-auto mt-[-88px] relative">
              <div
                className="satellite h-5 w-5 bg-gray-300 rounded-full absolute"
                style={{
                  top: "50%",
                  left: "0%",
                  animation: "orbit 8s linear infinite",
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="card max-w-lg w-full mt-8 text-center slide-up fade-in">
          <h1 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">
            Customer Portal
          </h1>
          <p className="mb-8 text-gray-400 leading-relaxed">
            Complete your profile to join our customer network. Enter your
            details through our sleek, secure interface.
          </p>
          <Button
            onClick={() => navigate("/customer-name")}
            className="w-full py-3 text-lg"
          >
            Begin Journey
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(72px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(72px) rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
