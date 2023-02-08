import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {
  Box,
  Dialog,
  IconButton,
  ImageListItem,
  Link,
  Tooltip
} from '@mui/material';
import ProgressOverlay from '../../../components/ProgressOverlay/ProgressOverlay';
import { SUB_ID } from '../../../utils/constants';
import { handleException } from '../../../utils/errorHandlingUtils';
import { Cat } from '../../../utils/types';
import {
  useAddToFavourite,
  useDeleteFavourite,
  useGetCatDetails,
  useGetFavourite
} from './api';
import * as S from './CatDetails.css';

interface Props {
  cat?: Cat;
  catId?: string;
  onClose: () => void;
}

const CatDetails = ({ cat, onClose, catId }: Props) => {
  const { isLoadingAddToFavourite, addToFavourite } = useAddToFavourite();
  const [isFavourite, setIsFavourite] = useState(false);
  const [favouriteId, setFavouriteId] = useState();
  const { isLoadingDeleteFavourite, deleteFavourite } = useDeleteFavourite(
    favouriteId ? favouriteId : ''
  );
  const { isLoadingCatDetails, getCatDetails } = useGetCatDetails(
    catId ? catId : ''
  );
  const [catDetails, setCatDetails] = useState(cat);
  const { isLoadingGetFavourite, getFavourite } = useGetFavourite(
    catDetails ? catDetails.id : ''
  );
  const { push } = useHistory();

  const goToBreeds = () => push(`/breeds`);

  const onFavouriteClick = async (catId: string) => {
    const result = await addToFavourite({
      data: { sub_id: SUB_ID, image_id: catId }
    });
    if (result) {
      setFavouriteId(result.data.id);
      setIsFavourite(true);
    }
  };

  const onRemoveClick = async () => {
    try {
      const result = await deleteFavourite({
        data: { sub_id: SUB_ID }
      });
      if (result) {
        setIsFavourite(false);
      }
    } catch (e) {
      handleException(e);
    }
  };

  useEffect(() => {
    if (catDetails) {
      const getIsFavourite = async () => {
        const result = await getFavourite();
        if (result.data.length) {
          setFavouriteId(result.data[0].id);
          setIsFavourite(true);
        }
      };
      getIsFavourite();
    }
  }, [catDetails]);

  useEffect(() => {
    if (catId && !cat) {
      const getDetails = async () => {
        const result = await getCatDetails();
        if (result) {
          setCatDetails(result.data);
        }
      };
      getDetails();
    }
  }, [catId]);

  return (
    <Dialog open={true} fullWidth maxWidth="sm" onClose={onClose}>
      {(isLoadingAddToFavourite ||
        isLoadingDeleteFavourite ||
        isLoadingCatDetails ||
        isLoadingGetFavourite) && <ProgressOverlay />}
      <S.Content>
        <S.HeaderTitle variant="h6">Cat details</S.HeaderTitle>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </S.Content>
      {catDetails && (
        <>
          <S.Content>
            <ImageListItem key={catDetails.id}>
              <img
                src={catDetails.url}
                loading="lazy"
                alt={catDetails.url}
                style={{
                  width: '560px',
                  height: '376px',
                  objectFit: 'cover'
                }}
              />
            </ImageListItem>
          </S.Content>
          <S.Content>
            {(!catDetails.breeds || catDetails.breeds.length) === 0 ? (
              <div>No breeds</div>
            ) : (
              <Link component="button" variant="body2" onClick={goToBreeds}>
                Go to cat breeds
              </Link>
            )}
            <Tooltip
              title={isFavourite ? 'Remove from favourite' : 'Add to favourite'}
            >
              {isFavourite ? (
                <IconButton onClick={onRemoveClick}>
                  <FavoriteIcon sx={{ color: 'red' }}></FavoriteIcon>
                </IconButton>
              ) : (
                <IconButton onClick={() => onFavouriteClick(catDetails.id)}>
                  <FavoriteBorderIcon />
                </IconButton>
              )}
            </Tooltip>
          </S.Content>
          {catDetails.breeds &&
            catDetails.breeds.length > 0 &&
            catDetails.breeds.map((el) => (
              <Box key={el.id} padding="0 1rem 1rem ">
                <div>
                  <b>Name:</b> {el.name}
                </div>
                <div>
                  <b>Description:</b> {el.description}
                </div>
                <div>
                  <b>Temperament:</b> {el.temperament}
                </div>
                <div>
                  <b>Origin:</b> {el.origin}
                </div>
                <div>
                  <b>Life span:</b> {el.life_span}
                </div>
                <div>
                  <b>Weight imperial:</b> {el.weight.imperial}
                </div>
                <div>
                  <b>Weight metric:</b> {el.weight.metric}
                </div>
              </Box>
            ))}
        </>
      )}
    </Dialog>
  );
};

export default CatDetails;
