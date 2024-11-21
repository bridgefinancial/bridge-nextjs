import BaseVideoPlayer from '@/components/atoms/players/BaseVideoPlayer';
import CloseIcon from '@mui/icons-material/Close';
import { Modal } from '@mui/material';
import React, { useRef } from 'react';
import {
  VideoPlayerModalBox,
  VideoPlayerModalCloseButton,
  VideoPlayerModalContent,
  VideoPlayerModalHeader,
} from './VideoPlayerModal.styles';

export interface VideoPlayerModalProps {
  open: boolean;
  onClose: () => void;
  url?: string; // Modal title
}

const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  open,
  onClose,
  url = '',
}) => {
  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="video-player-modal-title"
      aria-describedby="video-player-modal-description"
      container={() => rootRef.current!}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div>
        <VideoPlayerModalHeader>
          <span></span>
          <VideoPlayerModalCloseButton onClick={onClose}>
            <CloseIcon />
          </VideoPlayerModalCloseButton>
        </VideoPlayerModalHeader>
        <VideoPlayerModalBox>
          {/* Header */}

          {/* Content */}
          <VideoPlayerModalContent>
            <BaseVideoPlayer url={url} />
          </VideoPlayerModalContent>
        </VideoPlayerModalBox>
      </div>
    </Modal>
  );
};

export default VideoPlayerModal;
