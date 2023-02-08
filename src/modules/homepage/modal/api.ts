import { SUB_ID } from '../../../utils/constants';
import { useAxios } from '../../../utils/hooks/useAxios';
import { Cat } from '../../../utils/types';

export const useAddToFavourite = () => {
  const [{ loading: isLoadingAddToFavourite }, addToFavourite] = useAxios(
    { url: `/favourites?sub_id=${SUB_ID}`, method: 'POST' },
    { manual: true }
  );
  return { isLoadingAddToFavourite, addToFavourite };
};

export const useGetFavourite = (imageId: string) => {
  const [{ data: favourite, loading: isLoadingGetFavourite }, getFavourite] =
    useAxios(
      {
        url: `/favourites?image_id=${imageId}&sub_id=${SUB_ID}`,
        method: 'GET'
      },
      { manual: true }
    );
  return { favourite, isLoadingGetFavourite, getFavourite };
};

export const useDeleteFavourite = (catId: string) => {
  const [{ loading: isLoadingDeleteFavourite }, deleteFavourite] = useAxios(
    { url: `/favourites/${catId}`, method: 'DELETE' },
    { manual: true }
  );
  return { isLoadingDeleteFavourite, deleteFavourite };
};

export const useGetCatDetails = (imageId: string) => {
  const [{ data: catDetails, loading: isLoadingCatDetails }, getCatDetails] =
    useAxios<Cat>(
      {
        url: `images/${imageId}`
      },
      { manual: true }
    );
  return { catDetails, isLoadingCatDetails, getCatDetails };
};
