import React, { useState, useEffect, useRef } from "react";
import gif1 from "./assets/L1-Thermodynamics/applications.webp";
import gif2 from "./assets/L1-Thermodynamics/emf.gif";
import gif3 from "./assets/L1-Thermodynamics/thermo1.gif";
import gif4 from "./assets/L1-Thermodynamics/notes.jpg";
import gif5 from "./assets/L1-Thermodynamics/thermo2.gif";
import gif6 from "./assets/L1-Thermodynamics/emf.gif";
import audioFile from "../src/Thermo.mp3";
import "./App.css";

function Audio_custom_gif() {
   const [currentTime, setCurrentTime] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioPasue, setAudioPause] = useState(false);
  const [currentGif, setCurrentGif] = useState(null);
  const [micEnalbe, setMicEnable] = useState(false);
  const audioRef = useRef(null);
  const [commandText, setCommandText] = useState("");
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioPlaying) {
      if (currentTime >= 1 && currentTime < 10) {
        setCurrentGif(gif1);
      } else if (currentTime >= 10 && currentTime < 20) {
        setCurrentGif(gif2);
      } else if (currentTime >= 20 && currentTime < 30) {
        setCurrentGif(gif3);
      } else if (currentTime >= 20 && currentTime < 30) {
        setCurrentGif(gif4);
      } else if (currentTime >= 30 && currentTime < 40) {
        setCurrentGif(gif5);
      } else if (currentTime >= 40) {
        setCurrentGif(gif6);
      }
    }
  }, [currentTime, audioPlaying]);

  const playAudio = () => {
     setAudioPlaying(true);
    setAudioPause(true);

    audioRef.current.play();
  };

  const pauseAudio = () => {
     setAudioPlaying(false);
    setAudioPause(false);

    audioRef.current.pause();
  };

  const updateImage = (event) => {
    setCurrentTime(event.target.currentTime);
  };

  const handleAudioEnded = () => {
    setAudioPlaying(false);
     setCurrentGif(null);
  };

  const handleMicButtonClick = () => {
    pauseAudio();
    setAudioPlaying(true);
 
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
          playAudio();
          setCommandText("");
          setAudioPause(true);
          setMicEnable(false);
 
        };

        window.speechSynthesis.speak(utterance);
      }
    };

    recognition.start();
  };

  useEffect(() => {
    window.speechSynthesis.cancel();
  }, []);

  const handleSeek = (e) => {
    const seekTime = e.target.value;
    audioRef.current.currentTime = seekTime;
  };

  const updateTime = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current.duration);
      });
      audioRef.current.addEventListener('timeupdate', updateTime);
    }
  
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('loadedmetadata', () => {
          setDuration(audioRef.current.duration);
        });
        audioRef.current.removeEventListener('timeupdate', updateTime);
      }
    };
  }, [audioRef]);
  

  return (
    <div>
      <audio
        ref={audioRef}
        id="myAudio"
         onTimeUpdate={updateImage}
        onEnded={handleAudioEnded}
      >
        <source src={audioFile} type="audio/mp3" />
        Your browser does not support the audio tag.
      </audio>
      <input
        type="range"
        min="0"
        max={duration}
        step="1"
        value={currentTime}
        onChange={handleSeek}
        style={{ width: '100%' }}
      />

      {/* Display current time and total duration */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <button onClick={playAudio} disabled={audioPlaying}>
        Play
      </button>
      <button onClick={pauseAudio} disabled={!audioPasue}>
        Pause
      </button>

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

export default Audio_custom_gif;
