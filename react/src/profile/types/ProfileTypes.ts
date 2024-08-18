export interface SetProfileRequest {
  birth: string;
  gender: string;
  leaveDt: string;
  profileImg: File | null;
}

export interface SetProfileResponse {
  result: {
    userId: number;
    username: string;
    userRealName: string;
    userEmail: string;
    regDt: string;
    modDt: string;
    birth: string;
    gender: string;
    profileImg: string;
    leaveDt: Date;
  };
  resultCd: string;
  resultMsg: string;
}
