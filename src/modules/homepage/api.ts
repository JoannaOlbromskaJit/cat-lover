import { useAxios } from '../../utils/hooks/useAxios';
import { Cat } from '../../utils/types';

export const useGetCats = (page: number) => {
  const [{ data: catsData, loading: isLoading }, getCats] = useAxios<Cat[]>(
    {
      url: `images/search?limit=10&page=${page}`
    },
    { manual: true }
  );
  return { catsData, isLoading, getCats };
};
