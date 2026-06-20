import { useEffect, useState } from "react";

const Pomodoro = () => {
  const [seconds, setSeconds] = useState(1500);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) =>
        prev > 0 ? prev - 1 : 0
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(seconds / 60);

  const remaining = seconds % 60;

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-6">

      <h2 className="text-2xl font-bold mb-3">
        🍅 Pomodoro Timer
      </h2>

      <div className="text-5xl font-bold">
        {minutes}:
        {remaining.toString().padStart(2, "0")}
      </div>

    </div>
  );
};

export default Pomodoro;