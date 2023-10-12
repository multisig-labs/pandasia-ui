import { AxiosError } from 'axios';

export function returnErrString(err: AxiosError<any>): string {
  if (err.response?.data?.message) {
    return err.response.data.message;
  }
  return err.message;
}
