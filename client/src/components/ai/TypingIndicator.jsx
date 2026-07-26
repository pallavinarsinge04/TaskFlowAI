import { useEffect, useState } from "react";

function TypingAnimation({
  text = "",
  speed = 15,
  onComplete,
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIndex(0);
    setFinished(false);
  }, [text]);

  useEffect(() => {
    if (!text) return;

    if (index >= text.length) {
      if (!finished) {
        setFinished(true);
        onComplete?.();
      }
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedText((prev) => prev + text[index]);
      setIndex((prev) => prev + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [index, text, speed, finished, onComplete]);

  const skipAnimation = () => {
    setDisplayedText(text);
    setIndex(text.length);
    setFinished(true);
    onComplete?.();
  };

  return (
    <div
      className="typing-animation"
      onClick={skipAnimation}
      title="Click to finish typing"
    >
      <span>{displayedText}</span>

      {!finished && (
        <span className="typing-cursor">|</span>
      )}
    </div>
  );
}

export default TypingAnimation;