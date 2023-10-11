import { AxiosError } from 'axios';

export function returnErrString(err: AxiosError): string {
  //@ts-ignore
  if (err.response?.data?.message) {
    //@ts-ignore
    return err.response.data.message;
  }
  return err.message;
}
