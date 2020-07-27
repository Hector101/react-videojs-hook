import React, { useState } from 'react';
import { useVideojs } from 'react-videojs-hook';

import 'video.js/dist/video-js.css';

import videos from './videos';

const App = () => {
  const [video, setVideo] = useState(videos[0]);

  const onPlay = (currentTime?: number) => {
    console.log("Video played at: ", currentTime);
  };

  const onPause = (currentTime?: number) => {
    console.log("Video paused at: ", currentTime);
  };

  const onEnd = (currentTime?: number) => {
    console.log(`Video ended at ${currentTime}`);
  };

  const onTimeUpdate = (currentTime: number) => {
    console.log(`Video current time is ${currentTime}`)
  };

  const changeVideo = () => {
    const randomIndex = Math.floor(Math.random() * 10);
    setVideo(videos[randomIndex]);
  };

  const { vjsId, vjsRef, vjsClassName } = useVideojs({
    src: video.source,
    autoplay: true,
    controls: true,
    responsive: true,
    bigPlayButtonCentered: true,
    onPlay,
    onPause,
    onEnd,
    onTimeUpdate,
  });


  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  return (
    <>
    <div data-vjs-player>
      <video ref={vjsRef} id={vjsId} className={vjsClassName}></video>
    </div>
    <button onClick={changeVideo}>Change Video</button>
    </>
  )
}

export default App
