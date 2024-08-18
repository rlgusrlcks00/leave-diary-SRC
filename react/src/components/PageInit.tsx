import React, { memo } from 'react';
import MainAppBar from '@components/MainAppBar';
import { Alert, Container, Snackbar } from '@mui/material';
import useLogout from '@hooks/useLogout';
import LogoutModal from '@components/LogoutModal';
import useSnackBar from '@hooks/useSnackBar';

const PageInit: React.FC = () => {
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
  /**
   *여기서부터 개발
   **/

  return (
    <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
      <MainAppBar onLogout={handleLogoutModalOpen} />

      {/*여기서부터 개발*/}

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
export default memo(PageInit);
