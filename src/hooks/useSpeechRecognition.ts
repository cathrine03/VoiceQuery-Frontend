"use client";

import { useState } from "react";

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);

  const startListening = (onResult: (text: string) => void) => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported");
      return;
    }


    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-IN";

    recognition.interimResults =
      false;

    recognition.continuous =
      false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (
      event: any
    ) => {
      const transcript =
        event.results[0][0]
          .transcript;

      onResult(transcript);
    };

    recognition.start();
  };

  return {
    isListening,
    startListening,
  };
}