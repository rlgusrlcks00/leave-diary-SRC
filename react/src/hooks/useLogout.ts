import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const useLogout = () => {
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const navigate = useNavigate();

  /////////////////////////////////////////////
  // 로그아웃 모달창을 여는 함수
  /////////////////////////////////////////////
  const handleLogoutModalOpen = () => {
    setOpenLogoutModal(true);
  };

  /////////////////////////////////////////////
  // 로그아웃 모달창을 닫는 함수
  /////////////////////////////////////////////
  const handleLogoutModalClose = () => {
    setOpenLogoutModal(false);
  };

  /////////////////////////////////////////////
  // 최종 로그아웃 처리 함수
  /////////////////////////////////////////////
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    navigate('/login');
  };

  return {
    openLogoutModal,
    handleLogoutModalOpen,
    handleLogoutModalClose,
    handleLogout,
  };
};

export default useLogout;
