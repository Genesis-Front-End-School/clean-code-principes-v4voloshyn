import { FC } from 'react';
import ReactPlayer, { Config } from 'react-player';

import './VideoPlayer.scss';

interface VideoPlayerProps {
  srcUrl: string;
  previewPoster: string;
  videoTitle?: string;
  config?: Config;
  isLight?: boolean;
  controls?: boolean;
  playing?: boolean;
  volume?: number;
  muted?: boolean;
  onReady?: () => void;
}

export const VideoPlayer: FC<VideoPlayerProps> = ({
  srcUrl,
  previewPoster,
  videoTitle,
  config,
  isLight = true,
  controls = true,
  playing = true,
  volume = 0.5,
  muted = false,
  onReady,
}) => {
  return (
    <ReactPlayer
      className="video-player player"
      url={srcUrl}
      width="100%"
      height="100%"
      controls={controls}
      playing={playing}
      light={isLight && previewPoster}
      volume={volume}
      muted={muted}
      onReady={onReady}
      onError={(error, data) =>
        console.log('ERROR OBJECT', { errorStack: error, dataStack: data })
      }
      pip
      config={{
        file: {
          forceHLS: true,
        },
        ...config,
      }}
    />
  );
};
