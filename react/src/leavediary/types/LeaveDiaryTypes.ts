export interface SetLeaveDiaryRequest {
  title: string;
  content: string;
  score: number;
}

export interface SetLeaveDiaryResponse {
  result: {
    diaryId: number;
    title: string;
    content: string;
    regDt: string;
    modDt: string;
  };
  resultCd: string;
  resultMsg: string;
}

export interface GetLeaveDiaryListRequest {
  page: number;
  size: number;
  sort: string;
}

export interface GetLeaveDiaryListResponse {
  result: {
    content: {
      diaryId: number;
      title: string;
      content: string;
      score: number;
      modDt: string;
    }[];
  };
  resultCd: string;
  resultMsg: string;
}
