import React, { memo, useState, useEffect, ChangeEvent } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Avatar,
} from '@mui/material';
import { SetProfileResponse } from '@profile/types/ProfileTypes';

interface ProfileSettingsModalProps {
  open: boolean;
  onClose: () => void;
  profile: SetProfileResponse | undefined;
  onSave: (data: FormData) => void;
}

const ProfileSettingsModal: React.FC<ProfileSettingsModalProps> = ({
  open,
  onClose,
  profile,
  onSave,
}) => {
  const [preview, setPreview] = useState<string | null>(
    profile?.result.profileImg || null,
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [birth, setBirth] = useState<string>(profile?.result.birth || '');
  const [gender, setGender] = useState<string>(
    profile?.result.gender || 'other',
  );
  const [leaveDt, setLeaveDt] = useState<string>(
    profile?.result.leaveDt
      ? profile.result.leaveDt.toString().slice(0, 10)
      : '',
  );

  // 기존 프로필 데이터로 초기값 설정
  useEffect(() => {
    if (profile) {
      resetForm();
    }
  }, [profile]);

  const resetForm = () => {
    setPreview(profile?.result.profileImg || null);
    setSelectedImage(null);
    setBirth(profile?.result.birth || '');
    setGender(profile?.result.gender || 'other');
    setLeaveDt(
      profile?.result.leaveDt
        ? profile.result.leaveDt.toString().slice(0, 10)
        : '',
    );
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setSelectedImage(file);
    } else {
      setPreview(null);
    }
  };

  const handleSaveClick = () => {
    const formData = new FormData();

    if (birth) {
      formData.append('birth', birth);
    }

    if (gender) {
      formData.append('gender', gender);
    }

    if (leaveDt) {
      const leaveDateTime = `${leaveDt}T00:00:00`;
      formData.append('leaveDt', leaveDateTime);
    }

    if (selectedImage) {
      formData.append('profileImg', selectedImage);
    }

    if (
      formData.has('birth') ||
      formData.has('gender') ||
      formData.has('leaveDt') ||
      formData.has('profileImg')
    ) {
      onSave(formData); // 부모 컴포넌트로 데이터 전달
    }

    onClose();
  };

  const handleCancelClick = () => {
    resetForm(); // 상태 초기화
    onClose();
  };

  return (
    <Modal open={open} onClose={handleCancelClick}>
      <Box
        sx={{
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 360, // 모달 너비 줄이기
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          maxHeight: '80vh',
          overflow: 'auto',
        }}>
        <Typography
          id='profile-settings-modal-title'
          variant='h6'
          component='h2'>
          프로필 설정
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} textAlign='center'>
            {preview ? (
              <Box
                component='img'
                src={preview}
                alt='Profile Preview'
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '300px',
                  objectFit: 'contain',
                  borderRadius: '10px',
                }}
              />
            ) : (
              <Avatar
                src={profile?.result.profileImg || undefined}
                sx={{ width: 120, height: 120, mb: 2 }}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' component='label' sx={{ mb: 2 }}>
              프로필 이미지 변경
              <input
                type='file'
                hidden
                accept='image/*'
                onChange={handleFileChange}
              />
            </Button>
            <TextField
              fullWidth
              label='생년월일'
              name='birth'
              value={birth || ''}
              onChange={(e) => setBirth(e.target.value)}
              type='date'
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body1' gutterBottom>
              성별
            </Typography>
            <RadioGroup
              value={gender || 'other'}
              name='gender'
              onChange={(e) => setGender(e.target.value)}
              row>
              <FormControlLabel value='male' control={<Radio />} label='남성' />
              <FormControlLabel
                value='female'
                control={<Radio />}
                label='여성'
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='이별한 날'
              name='leaveDt'
              value={leaveDt || ''}
              onChange={(e) => setLeaveDt(e.target.value)}
              type='date'
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
        <Box display='flex' justifyContent='flex-end' sx={{ mt: 2 }}>
          <Button onClick={handleSaveClick} variant='contained' color='primary'>
            저장
          </Button>
          <Button
            onClick={handleCancelClick}
            variant='outlined'
            color='secondary'
            sx={{ ml: 1 }}>
            취소
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default memo(ProfileSettingsModal);
