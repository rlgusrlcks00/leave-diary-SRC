import React, { memo, useState, useEffect } from 'react';
import MainAppBar from '@components/MainAppBar';
import {
  Alert,
  Container,
  Snackbar,
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  LinearProgress,
  FormControl,
  InputLabel,
  MenuItem,
  IconButton,
} from '@mui/material';
import useLogout from '@hooks/useLogout';
import LogoutModal from '@components/LogoutModal';
import useSnackBar from '@hooks/useSnackBar';
import {
  deleteLeaveDiary,
  getLeaveDiaryList,
} from '@leavediary/api/LeaveDiaryApi';
import {
  GetLeaveDiaryListRequest,
  GetLeaveDiaryListResponse,
} from '@leavediary/types/LeaveDiaryTypes';
import { useInfiniteQuery, useMutation } from 'react-query';
import { useInView } from 'react-intersection-observer';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LeaveDiaryDeleteModal from '@leavediary/page/LeaveDiaryDeleteModal';

const LeaveDiaryListPage: React.FC = () => {
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

  const [diaries, setDiaries] = useState<
    GetLeaveDiaryListResponse['result']['content']
  >([]);
  const [sort, setSort] = useState<string>('desc'); // 기본 정렬은 내림차순
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteDiaryId, setDeleteDiaryId] = useState(0);
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isLoading, refetch } =
    useInfiniteQuery(
      ['leaveDiaryList', sort],
      ({ pageParam = 0 }) => {
        const request: GetLeaveDiaryListRequest = {
          page: pageParam,
          size: 8,
          sort,
        };
        return getLeaveDiaryList(request);
      },
      {
        getNextPageParam: (lastPage) => {
          const morePagesExist = lastPage.result.content.length === 8;
          return morePagesExist
            ? lastPage.result.pageable.pageNumber + 1
            : undefined;
        },
        onSuccess: (data) => {
          setDiaries(data.pages.flatMap((page) => page.result.content));
        },
        onError: () => {
          showSnackbar('일기를 불러오는 중 오류가 발생했습니다.', 'error');
        },
      },
    );

  const deleteDiary = useMutation(deleteLeaveDiary, {
    onSuccess: () => {
      showSnackbar('이별일기가 성공적으로 삭제되었습니다.', 'success');
      handleRefetchAfterDelete();
    },
    onError: () => {
      showSnackbar('이별일기 삭제 중 오류가 발생했습니다.', 'error');
    },
  });

  const handelClickDelete = () => {
    deleteDiary.mutate(deleteDiaryId);
    handleClickModalClose();
  };

  const handleRefetchAfterDelete = () => {
    setDiaries([]);
    refetch();
  };

  const handleClickModalOpen = () => {
    setOpenDeleteModal(true);
  };

  const handleClickModalClose = () => {
    setOpenDeleteModal(false);
    setDeleteDiaryId(0);
  };

  useEffect(() => {
    setDiaries([]); // sort가 변경될 때 diaries를 초기화
    refetch();
  }, [sort, refetch]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };

  return (
    <Container maxWidth='md' sx={{ mt: 4, mb: 4 }}>
      <MainAppBar onLogout={handleLogoutModalOpen} />

      <Box sx={{ mt: 3 }}>
        <Box display='flex' justifyContent='space-between' mb={2}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>
              흩어진 추억의 순서
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={sort}
              label='Sort'
              onChange={handleChange}>
              <MenuItem value={'asc'}>가장 아파 했던 그날부터</MenuItem>
              <MenuItem value={'desc'}>가장 최근의 기억부터</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {diaries.map((diary) => (
          <Card key={diary.diaryId} sx={{ mb: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                {diary.title}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant='body2' color='textSecondary' gutterBottom>
                {new Date(diary.modDt).toLocaleDateString()}
              </Typography>
              <Typography variant='body1' paragraph>
                {diary.content}
              </Typography>
              <Divider sx={{ mt: 2, mb: 1 }} />
              <Box display='flex' justifyContent='space-between'>
                <Typography variant='caption' color='textSecondary'>
                  심적 상태: {diary.score}/5
                </Typography>
                <IconButton
                  edge='start'
                  color='inherit'
                  onClick={() => {
                    setDeleteDiaryId(diary.diaryId);
                    handleClickModalOpen();
                  }}>
                  <DeleteOutlineIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}

        <div ref={ref}>
          {(isLoading || fetchNextPage) && <LinearProgress />}
          {!hasNextPage && !isLoading && (
            <Typography variant='body2' color='textSecondary' align='center'>
              더 이상 불러올 일기가 없습니다.
            </Typography>
          )}
        </div>
      </Box>

      <LeaveDiaryDeleteModal
        open={openDeleteModal}
        onClose={handleClickModalClose}
        onConfirm={handelClickDelete}
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

export default memo(LeaveDiaryListPage);
