import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function useVoice() {

  const {
    transcript,
    listening,
    resetTranscript,
  } = useSpeechRecognition();

  const startListening = () => {

    SpeechRecognition.startListening({
      continuous: true,
    });

  };

  const stopListening = () => {

    SpeechRecognition.stopListening();

  };

  return {

    transcript,

    listening,

    startListening,

    stopListening,

    resetTranscript,

  };

}