import { useRef, useState } from "react";
import {
  FaPaperPlane,
  FaPaperclip,
  FaMicrophone,
  FaStop,
} from "react-icons/fa";

function MessageInput({
  onSend,
  loading = false,
  onFileUpload,
}) {
  const [message, setMessage] = useState("");
  const [listening, setListening] = useState(false);

  const textareaRef = useRef(null);
  const fileRef = useRef(null);

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  let recognition = null;

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const text =
        event.results[0][0].transcript;

      setMessage((prev) =>
        prev.length
          ? prev + " " + text
          : text
      );

      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  }

  const startListening = () => {
    if (!recognition) {
      alert(
        "Speech Recognition not supported in this browser."
      );
      return;
    }

    setListening(true);
    recognition.start();
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
    setListening(false);
  };

  const sendMessage = () => {
    if (!message.trim() || loading) return;

    onSend(message);

    setMessage("");

    if (textareaRef.current) {
      textareaRef.current.style.height =
        "50px";
    }
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();
      sendMessage();
    }
  };

  const autoResize = (e) => {
    setMessage(e.target.value);

    e.target.style.height = "50px";
    e.target.style.height =
      e.target.scrollHeight + "px";
  };

  const handleFile = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    onFileUpload?.(file);
  };

  return (
    <div className="chat-input-wrapper">

      <button
        className="input-icon"
        onClick={() =>
          fileRef.current.click()
        }
      >
        <FaPaperclip />
      </button>

      <input
        type="file"
        hidden
        ref={fileRef}
        onChange={handleFile}
      />

      <textarea
        ref={textareaRef}
        rows={1}
        placeholder="Message TaskFlow AI..."
        value={message}
        onChange={autoResize}
        onKeyDown={handleKeyDown}
      />

      {listening ? (
        <button
          className="input-icon recording"
          onClick={stopListening}
        >
          <FaStop />
        </button>
      ) : (
        <button
          className="input-icon"
          onClick={startListening}
        >
          <FaMicrophone />
        </button>
      )}

      <button
        className="send-btn"
        disabled={loading}
        onClick={sendMessage}
      >
        {loading ? (
          "..."
        ) : (
          <FaPaperPlane />
        )}
      </button>

    </div>
  );
}

export default MessageInput;