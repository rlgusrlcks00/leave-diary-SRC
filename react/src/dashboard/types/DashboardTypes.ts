export interface GetDiaryResponse {
  result: {
    diaryId: number;
    title: string;
    content: string;
    score: number;
    modDt: string;
  };
  resultCd: string;
  resultMsg: string;
}
