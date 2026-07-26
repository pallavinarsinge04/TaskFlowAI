import { useEffect, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaStop,
  FaVolumeUp,
} from "react-icons/fa";

function VoicePlayer({ text = "" }) {
  const [voices, setVoices] = useState([]);
  const [voice, setVoice] = useState("");
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      const list = window.speechSynthesis.getVoices();
      setVoices(list);

      const saved =
        localStorage.getItem("voice");

      if (
        saved &&
        list.find((v) => v.name === saved)
      ) {
        setVoice(saved);
      } else if (list.length) {
        setVoice(list[0].name);
      }
    };

    loadVoices();

    window.speechSynthesis.onvoiceschanged =
      loadVoices;
  }, []);

  const play = () => {
    if (!text) return;

    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(text);

    const selected = voices.find(
      (v) => v.name === voice
    );

    if (selected)
      utterance.voice = selected;

    utterance.rate = rate;
    utterance.volume = volume;

    utterance.onstart = () =>
      setPlaying(true);

    utterance.onend = () =>
      setPlaying(false);

    utterance.onerror = () =>
      setPlaying(false);

    window.speechSynthesis.speak(
      utterance
    );
  };

  const pause = () => {
    window.speechSynthesis.pause();
    setPlaying(false);
  };

  const resume = () => {
    window.speechSynthesis.resume();
    setPlaying(true);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setPlaying(false);
  };

  const handleVoiceChange = (e) => {
    setVoice(e.target.value);

    localStorage.setItem(
      "voice",
      e.target.value
    );
  };

  return (
    <div className="voice-player">

      <div className="voice-header">

        <FaVolumeUp />

        <h4>Voice Assistant</h4>

      </div>

      <div className="voice-controls">

        <button
          className="voice-btn"
          onClick={play}
        >
          <FaPlay />
        </button>

        <button
          className="voice-btn"
          onClick={pause}
        >
          <FaPause />
        </button>

        <button
          className="voice-btn"
          onClick={resume}
        >
          ▶
        </button>

        <button
          className="voice-btn stop"
          onClick={stop}
        >
          <FaStop />
        </button>

      </div>

      <div className="voice-setting">

        <label>Voice</label>

        <select
          value={voice}
          onChange={handleVoiceChange}
        >
          {voices.map((v) => (
            <option
              key={v.name}
              value={v.name}
            >
              {v.name}
            </option>
          ))}
        </select>

      </div>

      <div className="voice-setting">

        <label>
          Speed ({rate.toFixed(1)})
        </label>

        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={rate}
          onChange={(e) =>
            setRate(
              Number(e.target.value)
            )
          }
        />

      </div>

      <div className="voice-setting">

        <label>
          Volume ({volume.toFixed(1)})
        </label>

        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) =>
            setVolume(
              Number(e.target.value)
            )
          }
        />

      </div>

      {playing && (
        <p className="voice-status">
          🔊 Speaking...
        </p>
      )}

    </div>
  );
}

export default VoicePlayer;