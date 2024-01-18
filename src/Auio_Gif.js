







import React, { useState, useEffect, useRef } from "react";
import gif1 from "./assets/L1-Thermodynamics/applications.webp";
// import gif2 from "./assets/L1-Thermodynamics/emf.gif";
import gif3 from "./assets/L1-Thermodynamics/thermo1.gif";
import gif4 from "./assets/L1-Thermodynamics/notes.jpg";
import gif5 from "./assets/L1-Thermodynamics/thermo2.gif";
 import audioFile from "../src/Thermo.mp3";
import "./App.css";

function App() {
  const [audioControls, setAudioControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
    const [currentGif, setCurrentGif] = useState(null);
  const [micEnalbe, setMicEnable] = useState(false);
  const audioRef = useRef(null);
  const [commandText, setCommandText] = useState("");

  useEffect(() => {
    if (audioRef) {
       if (currentTime >= 1 && currentTime < 10) {
        setCurrentGif(gif1);
      } else if (currentTime >= 10 && currentTime < 20) {
        setCurrentGif(gif5);
      } else if (currentTime >= 20 && currentTime < 30) {
        setCurrentGif(gif3);
      } else if (currentTime >= 20 && currentTime < 30) {
        setCurrentGif(gif4);
      } else if (currentTime >= 30 && currentTime < 40) {
        setCurrentGif(gif5);
      } else if (currentTime >= 40) {
        setCurrentGif(gif4);
      }
    }
   }, [currentTime,audioRef]);

  const updateImage = (event) => {
    setCurrentTime(event.target.currentTime);
  };

  const handleAudioEnded = () => {
      setCurrentGif(null);
  };

  const handleMicButtonClick = () => {
    audioRef.current.pause();
    setAudioControls(true);
 
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const last = event.results.length - 1;
      const command = event.results[last][0].transcript.toLowerCase();
      if (command) {
        setMicEnable(true);
        console.log("Resuming video: Hello dear!");
        setCommandText(command);

        const utterance = new SpeechSynthesisUtterance(
          "Hello dear what's up what are doing today are you willing to chat with me please be friendly I am totally here for you say anything which makes you feel better without worrying about anything bro!"
        );
        utterance.onend = () => {
          console.log("Speech ended. Resuming video.");
           setCommandText("");
           setMicEnable(false);
          setAudioControls(false);
          audioRef.current.play();

        };

        window.speechSynthesis.speak(utterance);
      }
    };

    recognition.start();
  };

  useEffect(() => {
    window.speechSynthesis.cancel();
  }, []);
  return (
    <div>
      <audio
        ref={audioRef}
        id="myAudio"
        controls={!audioControls}
        onTimeUpdate={updateImage}
        onEnded={handleAudioEnded}
      >
        <source src={audioFile} type="audio/mp3" />
        Your browser does not support the audio tag.
      </audio> 

      <button onClick={() => handleMicButtonClick()} disabled={micEnalbe}>
        Start Mic
      </button>
      <div className={`happy-text`}>
        {commandText && <p>User said: {commandText}</p>}
      </div>

      <div id="imageContainer">
        {currentGif && <img className="image" src={currentGif} alt={`GIF`} />}
      </div>
    </div>
  );
}

export default App;
