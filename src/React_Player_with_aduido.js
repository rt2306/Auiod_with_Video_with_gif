import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import videoPlay from "../src/check.mp4";
const React_Player_with_aduido = () => {
  const [playing, setPlaying] = useState(true);
  const playerRef = useRef(null);
  const [commandText, setCommandText] = useState("");
  const [diableControls ,setDisableCon] = useState(false)

  const handlePause = () => {
    setPlaying(false);
  };

  const handleResume = () => {
    setPlaying(true);
  };

  const handleMicButtonClick = () => {
    setPlaying(false);
    setDisableCon(true)
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const last = event.results.length - 1;
      const command = event.results[last][0].transcript.toLowerCase();
      if (command) {
        console.log("Resuming video: Hello dear!", playing);
        setCommandText(command);

        const utterance = new SpeechSynthesisUtterance(
          "Hello dear what's up what are doing todat are you willing to chat with me please be friendly i am totally here for you say anything which make you feel better without woory about anytin bro!"
        );
        utterance.onend = () => {
          console.log("Speech ended. Resuming video.");
          handleResume();
          setCommandText("");
          setDisableCon(false)

        };

        window.speechSynthesis.speak(utterance);
      }
    };

    recognition.start();
  };

  console.log(playing, "playingplayingplaying");
  return (
    <div>
      <button onClick={() => handleMicButtonClick()}>Start Mic</button>
      <div>{commandText && <p>User said: {commandText}</p>}</div>

      <ReactPlayer
        ref={playerRef}
        url={videoPlay}
        playing={playing}
        onPause={handlePause}
        onPlay={handleResume}
        controls ={!diableControls}
        width="100%"
        height="auto"
      />
    </div>
  );
};

export default React_Player_with_aduido;

 