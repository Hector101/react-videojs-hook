# react-videojs-hook

> A React hook for video.js

[![NPM](https://img.shields.io/npm/v/react-videojs-hook.svg)](https://www.npmjs.com/package/react-videojs-hook) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install using npm

```bash
npm install --save react-videojs-hook
npm install --save video.js
```

## Install using yarn

```bash
yarn add react-videojs-hook
yarn add video.js
```

## Usage

```tsx
import React from 'react';
import { useVideojs } from 'react-videojs-hook';

import 'video.js/dist/video-js.css';

const App = () => {
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

  const { vjsId, vjsRef, vjsClassName } = useVideojs({
    src: 'https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4',
    controls: true,
    autoplay: true,
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
    <div data-vjs-player>
      <video ref={vjsRef} id={vjsId} className={vjsClassName}></video>
    </div>
  )
}
```

### Hook Parameters

Param | Description | Required | Default
---- | ----------- | -------- | -------
`src` | The video source URL | `true`
`className` | className to customize video player UI | `false`
`sources` | The sources for a media asset. `[{src: 'http://ex.com/video.mp4', type: 'video/mp4'}]` | `false` | `false`
`aspectRatio` | The value to set the Player's aspect ratio to | `false`
`controls` | Set to `true` or `false` to display native player controls | `false` | `false`
`autoplay` | Set the autoplay option, `true` or `false` | `false` | `false`
`textTrackSettings` |  Manipulate Text Tracks settings. | `false`
`defaultVolume` | Video player initial volume | `false` | `false`
`responsive` | Set responsive mode to add and remove classes based on its size breakpoints | `false` | `false`
`responsive` | Set responsive mode to add and remove classes based on its size breakpoints | `false` | `false`
`width` | Set player width | `false` | `auto`
`height` | Set player height | `false` | `auto`
`height` | Set player height | `false` | `auto`
`bigPlayButton` | Set initial play button that shows before the video has played | `false` | `true`
`onReady` | Triggered when player is loaded and ready to play | `false`
`onPlay` | Triggered when player's play button is clicked | `false`
`onPause` | Triggered when player's pause button is clicked | `false`
`onTimeUpdate` | Triggered every time play time updates | `false`
`onSeeking` | Triggered on player seeking to a different play time | `false`
`onSeeked` | Triggered on player seeking completion to a different play time | `false`
`onEnd` | Triggered when video finishes playing | `false`

## How to contribute
To contribute, fork this repo to your private repository and create a pull request based on the feature you want to add.

## License

MIT © [Hector101](https://github.com/Hector101)
