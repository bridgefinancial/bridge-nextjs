import dynamic from 'next/dynamic';
import React, {
  ComponentType,
  CSSProperties,
  ReactElement,
  ReactNode,
} from 'react';
import { ReactPlayerProps } from 'react-player';
import styles from './BaseVideoPlayer.module.css'; // Ensure this file exists and matches the provided CSS module

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export interface BaseVideoPlayerProps extends ReactPlayerProps {
  url: string | string[]; // Media URL(s)
  poster?: string; // Poster image for local videos
  className?: string; // Additional CSS class for styling
  style?: CSSProperties; // Inline styles for the container
  controls?: boolean; // Show/hide player controls
  playing?: boolean; // Auto-play the video
  loop?: boolean; // Loop the video
  muted?: boolean; // Mute the audio
  playbackRate?: number; // Playback speed (e.g., 1.0, 1.5)
  volume?: number; // Volume level (0.0 to 1.0)
  width?: string | number; // Player width
  height?: string | number; // Player height
  light?: boolean | string | ReactElement; // Light mode for displaying a thumbnail
  playsinline?: boolean; // Play inline for iOS
  pip?: boolean; // Enable Picture-in-Picture mode
  progressInterval?: number; // Interval for progress events in milliseconds
  playIcon?: ReactElement; // Custom play icon for light mode
  previewTabIndex?: number | null; // Tab index for light mode preview
  fallback?: ReactElement; // Fallback element when loading
  wrapper?: ComponentType<{ children: ReactNode }>; // Custom wrapper component
  stopOnUnmount?: boolean; // Stop playback when component unmounts
  onReady?: (player: any) => void; // Callback when player is ready
  onStart?: () => void; // Callback when playback starts
  onPlay?: () => void; // Callback when playback starts
  onPause?: () => void; // Callback when playback pauses
  onBuffer?: () => void; // Callback when buffering
  onBufferEnd?: () => void; // Callback when buffering ends
  onEnded?: () => void; // Callback when playback ends
  onError?: (
    error: any,
    data?: any,
    hlsInstance?: any,
    hlsGlobal?: any
  ) => void; // Error handler
  onDuration?: (duration: number) => void; // Callback when duration is available
  onSeek?: (seconds: number) => void; // Callback when seeking
  onProgress?: (progressState: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  }) => void; // Progress event handler
}

const BaseVideoPlayer: React.FC<BaseVideoPlayerProps> = ({
  url,
  poster,
  className = '',
  style = {},
  controls = true,
  playing = false,
  loop = false,
  muted = false,
  playbackRate = 1.0,
  volume = 0.8,
  width = '100%',
  height = '100%',
  light = false,
  playsinline = true,
  pip = false,
  progressInterval = 1000,
  playIcon,
  previewTabIndex,
  fallback,
  wrapper,
  stopOnUnmount = true,
  onReady = () => {}, // Default: no-op
  onStart = () => {}, // Default: no-op
  onPlay = () => {}, // Default: no-op
  onPause = () => {}, // Default: no-op
  onBuffer = () => {}, // Default: no-op
  onBufferEnd = () => {}, // Default: no-op
  onEnded = () => {}, // Default: no-op
  onError = () => {}, // Default: no-op
  onDuration = () => {}, // Default: no-op
  onSeek = () => {}, // Default: no-op
  onProgress = () => {}, // Default: no-op
  ...rest
}) => {
  return (
    <div className={`${styles.videoContainer} ${className}`} style={style}>
      <ReactPlayer
        url={url}
        controls={controls}
        playing={playing}
        loop={loop}
        muted={muted}
        playbackRate={playbackRate}
        volume={volume}
        width={width}
        height={height}
        light={light}
        playsinline={playsinline}
        pip={pip}
        progressInterval={progressInterval}
        playIcon={playIcon}
        previewTabIndex={previewTabIndex}
        fallback={fallback}
        wrapper={wrapper}
        stopOnUnmount={stopOnUnmount}
        onReady={onReady}
        onStart={onStart}
        onPlay={onPlay}
        onPause={onPause}
        onBuffer={onBuffer}
        onBufferEnd={onBufferEnd}
        onEnded={onEnded}
        onError={onError}
        onDuration={onDuration}
        onSeek={onSeek}
        onProgress={onProgress}
        config={{
          file: {
            attributes: {
              poster: poster || undefined, // Use poster image if provided
            },
          },
        }}
        {...rest} // Pass remaining props to ReactPlayer
      />
    </div>
  );
};

export default BaseVideoPlayer;
