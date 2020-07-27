import { useRef, useEffect } from 'react';
import videojs, { VideoJsPlayer } from 'video.js';

import usePrevious from './usePrevious';

type VideoJsPlayerPluginOptions = {
  [pluginName: string]: any;
};

type Props = {
  src: string;
  sources?: videojs.Tech.SourceObject[];
  aspectRatio?: string;
  autoplay?: boolean | string;
  controlBar?: videojs.ControlBarOptions | false;
  textTrackSettings?: videojs.TextTrackSettingsOptions;
  controls?: boolean;
  defaultVolume?: number;
  fluid?: boolean;
  responsive?: boolean;
  width?: number;
  height?: number;
  html5?: any;
  inactivityTimeout?: number;
  language?: string;
  languages?: { [code: string]: videojs.LanguageTranslations };
  liveui?: boolean;
  loop?: boolean;
  muted?: boolean;
  nativeControlsForTouch?: boolean;
  notSupportedMessage?: string;
  playbackRates?: number[];
  plugins?: Partial<VideoJsPlayerPluginOptions>;
  poster?: string;
  preload?: string;
  sourceOrder?: boolean;
  techOrder?: string[];
  tracks?: videojs.TextTrackOptions[];
  hideControls?: string[];
  bigPlayButton?: boolean;
  bigPlayButtonCentered?: boolean;
  onReady?: (player: VideoJsPlayer) => void;
  onPlay?: (currentTime?: number) => void;
  onPause?: (currentTime?: number) => void;
  onTimeUpdate?: (currentTime: number) => void;
  onSeeking?: (currentTime: number) => void;
  onSeeked?: (position: number, currentTime: number) => void;
  onEnd?: (currentTime?: number) => void;
  className?: string;
};

export function useVideojs({
  src,
  autoplay,
  onReady,
  onPlay,
  onPause,
  onTimeUpdate,
  onSeeking,
  onSeeked,
  onEnd,
  className,
  ...props
}: Props) {
  const vjsId = `vjs-${Date.now()}`;
  const vjsRef = useRef(null);

  let player: VideoJsPlayer;

  const previousSrc = usePrevious(src);
  const previousAutoplay = usePrevious(autoplay);

  useEffect(() => {
    if ((previousSrc !== src) && !previousSrc) {
      _initPlayer();
      _initPlayerEvents();
    }
    if((previousSrc !== src) && previousSrc) {
      _changeSrc();
      _unregisterEvents();
      _initPlayerEvents();
    }

    if((previousAutoplay !== autoplay) && (previousAutoplay !== undefined)) {
      _changeAutoplay();
      _unregisterEvents();
      _initPlayerEvents();
    }
  
  }, [src, autoplay]);

  const _initPlayer = () => {
    player = videojs(vjsRef.current, props);
    player.src(src);
    player.autoplay(autoplay);
  };

  const _changeSrc = () => {
    player = videojs(vjsRef.current);
    player.src(src);
  };

  const _changeAutoplay = () => {
    player = videojs(vjsRef.current);
    player.autoplay(autoplay);
  };

  const _initPlayerEvents = () => {
    let currentTime = 0;
    let previousTime = 0;
    let position = 0;

    player.ready(() => {
      if (onReady) {
        onReady(player)
      }
    });

    player.on('play', () => {
      if (onPlay) {
        onPlay(player.currentTime())
      }
    });

    player.on('pause', () => {
      if (onPause) {
        onPause(player.currentTime());
      }
    });

    player.on('timeupdate', () => {
      if (onTimeUpdate) {
        onTimeUpdate(player.currentTime());
        previousTime = currentTime;
        currentTime = player.currentTime();
        if (previousTime < currentTime) {
            position = previousTime;
            previousTime = currentTime;
        }
      }
    });

    player.on('seeking', () => {
      if (onSeeking) {
        player.off('timeupdate');
        player.one('seeked');
        onSeeking(player.currentTime());
      }
    });

    player.on('seeked', () => {
      if (onSeeked) {
        const completeTime = Math.floor(player.currentTime());
        onSeeked(position, completeTime);
      }
    });

    player.on('ended', () => {
      if (onEnd) {
        onEnd(player.currentTime());
      }
    });
  };

  const _unregisterEvents = () => {
    player.off('play');
    player.off('pause');
    player.off('timeupdate');
    player.off('seeking');
    player.off('seeked');
    player.off('ended');
  };

  const videoClassNames = `video-js ${className} ${props.bigPlayButtonCentered ? 'vjs-big-play-centered' : ''}`;

  return { vjsRef, vjsId, vjsClassName: videoClassNames };
}
