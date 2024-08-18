import React, { memo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import MainAppBar from '@components/MainAppBar';
import {
  Alert,
  Container,
  Snackbar,
  Typography,
  Box,
  Avatar,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  Button,
} from '@mui/material';
import useLogout from '@hooks/useLogout';
import LogoutModal from '@components/LogoutModal';
import useSnackBar from '@hooks/useSnackBar';
import { getProfile, setProfile } from '@profile/api/ProfileApi';
import moment from 'moment';
import Counter from '@components/Counter';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import WcIcon from '@mui/icons-material/Wc';
import EditIcon from '@mui/icons-material/Edit';
import ProfileSettingModal from './ProfileSettingModal';
import { SetProfileRequest } from '@profile/types/ProfileTypes';

const ProfilePage: React.FC = () => {
  const [open, setOpen] = useState(false);

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
    handleSnackbarClose,
    showSnackbar,
  } = useSnackBar();

  // 프로필 데이터를 가져오기 위해 useQuery 사용
  const {
    data: profileData,
    error,
    isLoading,
    refetch,
  } = useQuery(['profile'], getProfile);

  // 날짜를 yyyy.MM.dd 형식으로 변환하는 함수
  const formatDate = (date: string): string => {
    return moment(date).format('YYYY.MM.DD');
  };

  // 이별한 지 며칠 지났는지 계산하는 함수
  const calculateDaysSinceLeave = (leaveDt: string): number => {
    const leaveDate = moment(leaveDt);
    const currentDate = moment();
    return currentDate.diff(leaveDate, 'days');
  };

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  // 프로필 저장을 위한 useMutation 훅
  const mutation = useMutation((data: SetProfileRequest) => setProfile(data), {
    onSuccess: () => {
      showSnackbar('프로필이 성공적으로 업데이트되었습니다.', 'success');
      refetch(); // 업데이트된 프로필을 다시 가져옴
      setOpen(false);
    },
    onError: () => {
      showSnackbar('프로필 업데이트 중 오류가 발생했습니다.', 'error');
    },
  });

  const handleSave = (formData: FormData) => {
    const profileData: Partial<SetProfileRequest> = {};

    if (formData.has('birth')) {
      profileData.birth = formData.get('birth') as string;
    }

    if (formData.has('gender')) {
      profileData.gender = formData.get('gender') as string;
    }

    if (formData.has('leaveDt')) {
      profileData.leaveDt = formData.get('leaveDt') as string;
    }

    if (formData.has('profileImg')) {
      profileData.profileImg = formData.get('profileImg') as File | null;
    }

    mutation.mutate(profileData as SetProfileRequest); // 타입 캐스팅 사용
  };

  return (
    <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
      <MainAppBar onLogout={handleLogoutModalOpen} />

      <Box sx={{ mt: 4 }}>
        {isLoading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '200px',
            }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color='error'>
            프로필 정보를 불러오는 중 오류가 발생했습니다.
          </Typography>
        ) : (
          profileData && (
            <Card sx={{ p: 2, mt: 3 }}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Avatar
                        alt={profileData.result.username}
                        src={
                          profileData.result.profileImg ||
                          '/static/images/avatar/1.jpg'
                        }
                        sx={{ width: 120, height: 120 }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Typography variant='h5' gutterBottom>
                      {profileData.result.userRealName}
                    </Typography>
                    <Typography variant='subtitle1' color='textSecondary'>
                      {profileData.result.username}
                    </Typography>
                    <Typography variant='body1' sx={{ mt: 1 }}>
                      <strong>생년월일:</strong>{' '}
                      {profileData.result.birth
                        ? formatDate(profileData.result.birth.toString())
                        : '정보 없음'}
                    </Typography>
                    <Typography variant='body1' sx={{ mt: 1 }}>
                      <Box
                        component='span'
                        sx={{ display: 'inline-flex', alignItems: 'center' }}>
                        <strong>성별:</strong>
                        {profileData?.result.gender === 'male' ? (
                          <ManIcon sx={{ color: '#0288D1' }} />
                        ) : profileData?.result.gender === 'female' ? (
                          <WomanIcon sx={{ color: '#F44336' }} />
                        ) : (
                          <WcIcon sx={{ color: '#000' }} />
                        )}
                      </Box>
                    </Typography>
                    <Typography variant='body1' sx={{ mt: 1 }}>
                      <strong>가입일:</strong>{' '}
                      {formatDate(profileData.result.regDt.toString())}
                    </Typography>
                    <Typography variant='body1' sx={{ mt: 1 }}>
                      <strong>더는 우리가 아닌 날:</strong>{' '}
                      {profileData.result.leaveDt
                        ? formatDate(profileData.result.leaveDt.toString())
                        : '정보 없음'}
                    </Typography>
                    {profileData.result.leaveDt ? (
                      <Typography variant='body1' sx={{ mt: 1 }}>
                        <strong>이별한 지:</strong>{' '}
                        <Counter
                          duration={250}
                          value={calculateDaysSinceLeave(
                            profileData.result.leaveDt.toString(),
                          )}
                        />{' '}
                        일
                      </Typography>
                    ) : null}
                  </Grid>
                </Grid>
                <Box display='flex' justifyContent='flex-end' sx={{ mt: 2 }}>
                  <Button variant='contained' onClick={handleModalOpen}>
                    <EditIcon sx={{ color: '#fff' }} />
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )
        )}
      </Box>

      <ProfileSettingModal
        open={open}
        onClose={handleModalClose}
        profile={profileData}
        onSave={handleSave}
      />

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

export default memo(ProfilePage);
