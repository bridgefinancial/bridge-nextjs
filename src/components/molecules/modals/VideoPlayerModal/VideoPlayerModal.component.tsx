import CloseIcon from '@mui/icons-material/Close';
import { Modal, Typography } from '@mui/material';
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
  title?: string; // Modal title
}

const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  open,
  onClose,
  title = 'Frame 91216',
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
      <VideoPlayerModalBox>
        {/* Header */}
        <VideoPlayerModalHeader>
          <Typography id="video-player-modal-title" variant="subtitle1">
            {title}
          </Typography>
          <VideoPlayerModalCloseButton onClick={onClose}>
            <CloseIcon />
          </VideoPlayerModalCloseButton>
        </VideoPlayerModalHeader>

        {/* Content */}
        <VideoPlayerModalContent>
          <Typography>
            {' '}
            {/* Replace with video player component */} Video Player Component{' '}
          </Typography>
        </VideoPlayerModalContent>
      </VideoPlayerModalBox>
    </Modal>
  );
};

export default VideoPlayerModal;
