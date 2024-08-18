import { GetDiaryResponse } from '@dashboard/types/DashboardTypes';
import { axiosGet } from '@axiosConfig/axiosInstance';

export const getDiary = async (date: string): Promise<GetDiaryResponse> => {
  const url = '/diary/get';
  return await axiosGet(url, { date });
};
