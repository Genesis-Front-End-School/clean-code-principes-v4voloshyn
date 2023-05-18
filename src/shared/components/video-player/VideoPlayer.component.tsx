import { FC } from 'react';
import ReactPlayer, { Config } from 'react-player';

import './VideoPlayer.scss';

interface Props {
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

export const VideoPlayer: FC<Props> = ({
  srcUrl,
  previewPoster,
  config,
  videoTitle = 'Video title',
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
