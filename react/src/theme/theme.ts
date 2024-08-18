import { createTheme } from '@mui/material';

const theme2 = createTheme({
  palette: {
    primary: {
      main: '#8D6E63', // 낡은 잉크 브라운
    },
    secondary: {
      main: '#A1887F', // 바랜 종이 색상
    },
    text: {
      primary: '#5D4037', // 짙은 갈색 (손으로 쓴 글씨 느낌)
      secondary: '#8D6E63', // 부드러운 브라운
    },
    background: {
      default: '#EFEBE9', // 낡은 종이 색상
      paper: '#D7CCC8', // 약간 더 짙은 종이 색상
    },
  },
  typography: {
    fontFamily: 'Georgia, serif', // 고전적인 서체
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#EFEBE9', // 낡은 종이 배경
          color: '#5D4037', // 짙은 갈색 글자
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#D7CCC8', // 짙은 종이 배경
          color: '#5D4037', // 짙은 갈색 글자
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#5D4037', // 짙은 갈색 글자
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#EFEBE9', // 버튼 텍스트 색상 (밝은 종이색)
          backgroundColor: '#8D6E63', // 버튼 배경색 (낡은 잉크 브라운)
          '&:hover': {
            backgroundColor: '#6D4C41', // 호버 시 버튼 배경색 (더 짙은 브라운)
          },
          '&:disabled': {
            backgroundColor: '#BCAAA4', // 비활성화 시 버튼 배경색 (바랜 색상)
            color: '#EFEBE9', // 비활성화 시 버튼 텍스트 색상
            cursor: 'not-allowed', // 비활성화 시 커서 스타일
          },
          '&:not(:disabled)': {
            cursor: 'pointer', // 활성화 시 커서 스타일
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: '#5D4037', // 입력 텍스트 색상 (짙은 갈색)
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          color: '#EFEBE9', // 칩 텍스트 색상 (밝은 종이색)
          backgroundColor: '#8D6E63', // 칩 배경색 (낡은 잉크 브라운)
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: '#A1887F', // 스위치 색상 (바랜 종이색)
        },
        track: {
          backgroundColor: '#D7CCC8', // 트랙 색상 (종이색)
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          backgroundColor: '#D7CCC8', // 선택 배경색 (종이색)
          color: '#5D4037', // 선택 텍스트 색상 (짙은 갈색)
        },
        icon: {
          color: '#8D6E63', // 아이콘 색상 (낡은 잉크 브라운)
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: '#EFEBE9', // 메뉴 아이템 배경색 (낡은 종이색)
          color: '#5D4037', // 메뉴 아이템 텍스트 색상 (짙은 갈색)
          '&.Mui-selected': {
            backgroundColor: '#A1887F', // 선택된 메뉴 아이템 배경색 (바랜 종이색)
            '&:hover': {
              backgroundColor: '#A1887F', // 선택된 메뉴 아이템 호버 색상 (바랜 종이색)
            },
          },
          '&:hover': {
            backgroundColor: 'rgba(93, 64, 55, 0.1)', // 메뉴 아이템 호버 색상 (연한 갈색)
          },
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          backgroundColor: '#EFEBE9', // 페이퍼 배경색 (낡은 종이색)
          boxShadow: 'none',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: '#D7CCC8', // 탭 배경색 (짙은 종이색)
          boxShadow: 'none',
        },
      },
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          backgroundColor: '#D7CCC8', // 버튼 그룹 배경색 (짙은 종이색)
          boxShadow: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#EFEBE9', // 텍스트 필드 배경색 (낡은 종이색)
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#8D6E63', // 필드셋 테두리 색상 (낡은 잉크 브라운)
            },
            '&:hover fieldset': {
              borderColor: '#6D4C41', // 호버 시 필드셋 테두리 색상 (더 짙은 브라운)
            },
            '&.Mui-focused fieldset': {
              borderColor: '#8D6E63', // 포커스 시 필드셋 테두리 색상 (낡은 잉크 브라운)
            },
            '& input': {
              color: '#5D4037', // 입력 텍스트 색상 (짙은 갈색)
              '&:focus': {
                color: '#8D6E63', // 포커스 상태에서 입력 텍스트 색상 (낡은 잉크 브라운)
              },
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#8D6E63', // 기본 색상 (낡은 잉크 브라운)
          '&.Mui-focused': {
            color: '#5D4037', // 포커스 시 색상 (짙은 갈색)
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#EFEBE9', // 페이퍼 배경색 (낡은 종이색)
          color: '#5D4037', // 텍스트 색상 (짙은 갈색)
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: '#8D6E63', // 아이콘 기본 색상 (낡은 잉크 브라운)
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#D7CCC8', // 툴바 배경색 (짙은 종이색)
          color: '#5D4037', // 툴바 텍스트 색상 (짙은 갈색)
        },
      },
    },
  },
});

export default theme2;
