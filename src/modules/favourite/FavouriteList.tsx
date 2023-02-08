import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Breadcrumbs,
  Container,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Tooltip,
  Typography
} from '@mui/material';
import ProgressOverlay from '../../components/ProgressOverlay/ProgressOverlay';
import { SUB_ID } from '../../utils/constants';
import { Favourite } from '../../utils/types';
import { useDeleteFavourite } from '../homepage/modal/api';
import { useGetFavourite } from './api';

const FavouriteList = () => {
  const { favouriteList, isLoadingFavourite, getFavouriteList } =
    useGetFavourite();
  const [favourite, setFavourite] = useState<Favourite[]>([]);
  const [favouriteId, setFavouriteId] = useState<string>();
  const { isLoadingDeleteFavourite, deleteFavourite } = useDeleteFavourite(
    favouriteId ? favouriteId : ''
  );

  useEffect(() => {
    getFavouriteList();
  }, []);

  useEffect(() => {
    if (favouriteList) {
      setFavourite((prev) => [...prev, ...favouriteList]);
    }
  }, [favouriteList]);

  useEffect(() => {
    if (favouriteId) {
      const removeData = async () => {
        const result = await deleteFavourite({
          data: { sub_id: SUB_ID }
        });
        if (result) {
          setFavourite((prev) =>
            prev.filter((el) => el.id.toString() !== favouriteId)
          );
        }
      };
      removeData();
    }
  }, [favouriteId]);

  const removeFromFavourite = (item: Favourite) => {
    setFavouriteId(item.id.toString());
  };

  return (
    <Container disableGutters maxWidth="xl">
      <Box mt={2} mb={1}>
        <Breadcrumbs>
          <NavLink to="/">Home</NavLink>
        </Breadcrumbs>
      </Box>
      <Box mt={1} mb={2}>
        <Typography variant="h5">Favourite</Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        {/* eslint-disable-next-line no-nested-ternary */}
        {isLoadingFavourite ? (
          <ProgressOverlay />
        ) : !favourite || favourite.length === 0 ? (
          'No image was added to favourite yet'
        ) : (
          <ImageList sx={{ width: 1000, height: 750 }} cols={2}>
            {favourite.map((item) => (
              <ImageListItem key={item.id}>
                <img
                  src={`${item.image.url}`}
                  srcSet={`${item.image.url}`}
                  loading="lazy"
                  alt={item.image.url}
                  style={{
                    width: '489px',
                    height: '376px',
                    objectFit: 'cover'
                  }}
                />
                <ImageListItemBar
                  actionIcon={
                    <Tooltip title="Remove from favourite">
                      <IconButton
                        sx={{ color: 'rgba(255,0,0,0.89)' }}
                        onClick={() => removeFromFavourite(item)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>
                  }
                />
              </ImageListItem>
            ))}
            {isLoadingDeleteFavourite && <ProgressOverlay />}
          </ImageList>
        )}
      </Box>
    </Container>
  );
};

export default FavouriteList;
