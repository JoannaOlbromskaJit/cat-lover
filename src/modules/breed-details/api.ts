import { useAxios } from '../../utils/hooks/useAxios';
import { BreedDictionary, Cat } from '../../utils/types';

export const useGetBreeds = () => {
  const [{ data: breeds, loading: isLoading }, getBreeds] = useAxios<
    BreedDictionary[]
  >(
    {
      url: `breeds`
    },
    { manual: true }
  );
  return { breeds, isLoading, getBreeds };
};

export const useGetCats = (breedId: number) => {
  const [{ data: cats, loading: isLoading }, getCats] = useAxios<Cat[]>(
    {
      url: `images/search?breed_ids=${breedId}&limit=10`
    },
    { manual: true }
  );
  return { cats, isLoading, getCats };
};
