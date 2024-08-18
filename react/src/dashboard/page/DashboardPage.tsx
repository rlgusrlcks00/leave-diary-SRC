import React, { memo, useState, useEffect } from 'react';
import MainAppBar from '@components/MainAppBar';
import {
  Container,
  Typography,
  TextField,
  Box,
  Button,
  Alert,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Fade,
} from '@mui/material';
import useLogout from '@hooks/useLogout';
import LogoutModal from '@components/LogoutModal';
import { getDiary } from '@dashboard/api/DashboardApi';
import { GetDiaryResponse } from '@dashboard/types/DashboardTypes';
import { useQuery } from 'react-query';
import moment from 'moment';

const DashboardPage: React.FC = () => {
  const {
    openLogoutModal,
    handleLogoutModalOpen,
    handleLogoutModalClose,
    handleLogout,
  } = useLogout();

  const [selectedDate, setSelectedDate] = useState<string>(
    moment().format('YYYY-MM-DD'),
  );

  const {
    data: diary,
    isLoading,
    isError,
    refetch,
  } = useQuery<GetDiaryResponse>(
    ['diary', selectedDate],
    () => getDiary(`${selectedDate}T00:00:00`),
    {
      enabled: true,
    },
  );

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleTextFieldClick = () => {
    document.getElementById('date-picker')?.click();
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Container maxWidth='md' sx={{ mt: 4, mb: 4 }}>
      <MainAppBar onLogout={handleLogoutModalOpen} />

      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        mt={2}
        mb={4}>
        <TextField
          label='날짜 선택'
          type='date'
          value={selectedDate}
          onChange={handleDateChange}
          sx={{ width: 200 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>

      {isLoading ? (
        <Box display='flex' justifyContent='center' alignItems='center' my={4}>
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Fade in={true}>
          <Alert severity='error'>
            일기를 불러오는 중 오류가 발생했습니다.
          </Alert>
        </Fade>
      ) : diary && diary.result ? (
        <Fade in={true}>
          <Card elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <CardContent>
              <Typography variant='h5' gutterBottom>
                {diary.result.title}
              </Typography>
              <Typography variant='body2' color='textSecondary' gutterBottom>
                {moment(diary.result.modDt).format('YYYY년 MM월 DD일')}
              </Typography>
              <Typography variant='body1' paragraph>
                {diary.result.content}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
              <Typography
                variant='caption'
                color='textSecondary'
                sx={{ mt: 2, display: 'block' }}>
                심적 상태: {diary.result.score}/5
              </Typography>
            </CardActions>
          </Card>
        </Fade>
      ) : (
        <Fade in={true}>
          <Typography
            variant='body1'
            color='textSecondary'
            align='center'
            sx={{ mt: 4 }}>
            {selectedDate === moment().format('YYYY-MM-DD')
              ? '오늘의 일기가 없습니다. 일기를 작성해주세요.'
              : '해당 날짜에 일기가 없습니다.'}
          </Typography>
        </Fade>
      )}

      <LogoutModal
        open={openLogoutModal}
        handleClose={handleLogoutModalClose}
        handleLogout={handleLogout}
      />
    </Container>
  );
};

export default memo(DashboardPage);
