import React from 'react';
import { Modal, Box, Typography, Button, Fade, Backdrop } from '@mui/material';

interface LeaveDiaryDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LeaveDiaryDeleteModal: React.FC<LeaveDiaryDeleteModalProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const handleOnClick = () => {
    onConfirm();
    onClose();
  };
  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute' as const,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            textAlign: 'center',
          }}>
          <Typography variant='h6' gutterBottom>
            일기 삭제
          </Typography>
          <Typography variant='body1' sx={{ mb: 3 }}>
            정말로 이 기억을 지우시겠습니까?
          </Typography>
          <Box display='flex' justifyContent='space-between'>
            <Button variant='contained' color='error' onClick={handleOnClick}>
              확인
            </Button>
            <Button variant='outlined' onClick={onClose}>
              취소
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default LeaveDiaryDeleteModal;
