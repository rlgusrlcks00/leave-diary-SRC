import React, { memo, useState } from 'react';
import MainAppBar from '@components/MainAppBar';
import {
  Alert,
  Container,
  Snackbar,
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Slider,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import useLogout from '@hooks/useLogout';
import LogoutModal from '@components/LogoutModal';
import useSnackBar from '@hooks/useSnackBar';
import { setLeaveDiary, checkDiary } from '@leavediary/api/LeaveDiaryApi'; // checkDiary 추가
import {
  SetLeaveDiaryRequest,
  SetLeaveDiaryResponse,
} from '@leavediary/types/LeaveDiaryTypes';
import { useMutation, useQuery } from 'react-query'; // useQuery 추가
import { useNavigate } from 'react-router-dom';

const LeaveDiaryPage: React.FC = () => {
  const {
    openLogoutModal,
    handleLogoutModalOpen,
    handleLogoutModalClose,
    handleLogout,
  } = useLogout();

  const {
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    showSnackbar,
    handleSnackbarClose,
  } = useSnackBar();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [score, setScore] = useState<number>(3);
  const navigate = useNavigate();

  // useQuery로 checkDiary API 호출
  const {
    data: isDiaryWrittenToday,
    isLoading: isCheckLoading,
    refetch,
  } = useQuery('checkDiary', checkDiary);

  const mutation = useMutation(
    (data: SetLeaveDiaryRequest) => setLeaveDiary(data),
    {
      onSuccess: (res) => {
        console.log(res);
        showSnackbar('이별일기가 성공적으로 저장되었습니다.', 'success');
        setTitle('');
        setContent('');
        setScore(3);
        refetch();
      },
      onError: () => {
        showSnackbar('이별일기 저장 중 오류가 발생했습니다.', 'error');
      },
    },
  );

  const handleSaveClick = () => {
    if (!title || !content) {
      showSnackbar('제목과 내용을 모두 입력해 주세요.', 'error');
      return;
    }
    const leaveDiaryData: SetLeaveDiaryRequest = {
      title,
      content,
      score,
    };
    mutation.mutate(leaveDiaryData);
  };

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setScore(newValue as number);
  };

  if (isCheckLoading) {
    return (
      <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
        <Typography variant='h4' gutterBottom>
          로딩 중...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
      <MainAppBar onLogout={handleLogoutModalOpen} />

      {isDiaryWrittenToday ? (
        <Card sx={{ p: 2, mt: 3 }}>
          <CardContent>
            <Typography variant='h4' gutterBottom>
              오늘의 이별일기
            </Typography>
            <Typography variant='body1' color='textSecondary'>
              오늘의 일기는 이미 작성하셨습니다. 내일 다시 작성해 주세요.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Card sx={{ p: 2, mt: 3 }}>
          <CardContent>
            <Typography variant='h4' gutterBottom>
              이별일기 작성
            </Typography>
            <TextField
              label='제목'
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mb: 2 }}
              disabled={isDiaryWrittenToday}
            />
            <TextField
              label='내용'
              fullWidth
              multiline
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              sx={{ mb: 2 }}
              disabled={isDiaryWrittenToday}
            />
            <Typography variant='h6' sx={{ mt: 3 }}>
              지금 당신의 마음은 어떠신가요?
            </Typography>
            <Grid container spacing={2} alignItems='center' sx={{ mb: 4 }}>
              <Grid item xs={2}>
                <Typography variant='body2'>평온함</Typography>
              </Grid>
              <Grid item xs={8}>
                <Slider
                  value={score}
                  onChange={handleSliderChange}
                  aria-labelledby='stress-level-slider'
                  step={1}
                  marks
                  min={0}
                  max={5}
                  valueLabelDisplay='auto'
                  sx={{
                    color: '#f44336',
                  }}
                  disabled={isDiaryWrittenToday}
                />
              </Grid>
              <Grid item xs={2}>
                <Typography variant='body2'>매우 힘듦</Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button
              variant='contained'
              color='primary'
              onClick={handleSaveClick}
              disabled={isDiaryWrittenToday || mutation.isLoading}>
              {mutation.isLoading ? '저장 중...' : '저장'}
            </Button>
          </CardActions>
        </Card>
      )}

      <LogoutModal
        open={openLogoutModal}
        handleClose={handleLogoutModalClose}
        handleLogout={handleLogout}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}>
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default memo(LeaveDiaryPage);
