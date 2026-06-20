import { useEffect } from "react";
import useVoice from "../hooks/useSpeechRecognition";

const VoiceAssistant = () => {

  const {

    transcript,

    listening,

    startListening,

    stopListening,

    resetTranscript,

  } = useVoice();

  useEffect(() => {

    if (!transcript) return;

    if (
      transcript.toLowerCase().includes("hello")
    ) {

      speak("Hello Welcome to TaskFlow AI");

    }

    if (
      transcript.toLowerCase().includes(
        "open dashboard"
      )
    ) {

      window.location.href = "/dashboard";

    }

  }, [transcript]);

  const speak = (text) => {

    const speech =
      new SpeechSynthesisUtterance(text);

    window.speechSynthesis.speak(speech);

  };

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h1 className="text-3xl font-bold">

        🎤 AI Voice Assistant

      </h1>

      <button

        onClick={startListening}

        className="bg-green-600 text-white px-5 py-3 rounded mt-5"

      >

        Start Listening

      </button>

      <button

        onClick={stopListening}

        className="bg-red-600 text-white px-5 py-3 rounded ml-4"

      >

        Stop

      </button>

      <div className="mt-6">

        <h2>

          Listening:

          {listening ? " Yes" : " No"}

        </h2>

        <p>

          {transcript}

        </p>

      </div>

      <button

        onClick={resetTranscript}

        className="mt-4 bg-blue-600 text-white px-5 py-2 rounded"

      >

        Clear

      </button>

    </div>

  );

};

export default VoiceAssistant;