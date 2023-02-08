import axios from 'axios';

export const handleException = (e: unknown) => {
  if (!axios.isAxiosError(e)) {
    console.error(e);
  }
};
