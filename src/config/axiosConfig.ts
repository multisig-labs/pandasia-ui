import { AxiosError } from 'axios';

// export function returnErrString(err: AxiosError<any>): string {
//   if (err.response?.data?.message) {
//     return err.response.data.message;
//   }
//   return err.message;
// }

export function makeErrorFriendly(err: AxiosError<any>): string {
  if (err.response?.data?.message) {
    return err.response.data.message;
  }
  if (err.response?.data) {
    return err.response.data;
  }
  return err.message;
}

export const errorMap = {
  'input string is smaller than the checksum size':
    'The signature should be exactly 95 characters in length.',
  'invalid input checksum': 'Invalid signature, make sure it was copied correctly.',
  'Leaf is not in tree': 'The corresponding P-Chain address is not found in our validator set.',
  '404 page not found\n': 'Please fill out signature box.',
};
