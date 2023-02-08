import { SUB_ID } from '../../utils/constants';
import { useAxios } from '../../utils/hooks/useAxios';
import { Favourite } from '../../utils/types';

export const useGetFavourite = () => {
  const [
    { data: favouriteList, loading: isLoadingFavourite },
    getFavouriteList
  ] = useAxios<Favourite[]>(
    { url: `/favourites?sub_id=${SUB_ID}`, method: 'GET' },
    { manual: true }
  );
  return { favouriteList, isLoadingFavourite, getFavouriteList };
};
