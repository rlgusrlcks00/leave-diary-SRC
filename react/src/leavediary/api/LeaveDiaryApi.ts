import {
  GetLeaveDiaryListRequest,
  GetLeaveDiaryListResponse,
  SetLeaveDiaryRequest,
  SetLeaveDiaryResponse,
} from '../types/LeaveDiaryTypes';
import { axiosGet, axiosPost } from '@axiosConfig/axiosInstance';

export const setLeaveDiary = async (
  data: SetLeaveDiaryRequest,
): Promise<SetLeaveDiaryResponse> => {
  const url = '/diary/set';
  return await axiosPost(url, data);
};

export const checkDiary = async (): Promise<boolean> => {
  const url = '/diary/check';
  const response = await axiosGet(url);
  return await response.result;
};

export const getLeaveDiaryList = async (
  data: GetLeaveDiaryListRequest,
): Promise<GetLeaveDiaryListResponse> => {
  const url = '/diary/getlist';
  return await axiosGet(url, data);
};

export const deleteLeaveDiary = async (diaryId: number): Promise<string> => {
  const url = `/diary/del`;
  const response = await axiosPost(url, { diaryId });
  return await response.result;
};
