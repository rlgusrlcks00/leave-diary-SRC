import { axiosFile, axiosGet, axiosPost } from '@axiosConfig/axiosInstance';
import {
  SetProfileRequest,
  SetProfileResponse,
} from '@profile/types/ProfileTypes';

export const setProfile = async (
  data: SetProfileRequest,
): Promise<SetProfileResponse> => {
  const url = '/profile/set';
  return await axiosFile(url, data);
};

export const getProfile = async (): Promise<SetProfileResponse> => {
  const url = '/profile/get';
  return await axiosGet(url);
};
