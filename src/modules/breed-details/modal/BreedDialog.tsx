import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, IconButton, ImageList, ImageListItem } from '@mui/material';
import ProgressOverlay from '../../../components/ProgressOverlay/ProgressOverlay';
import { Cat } from '../../../utils/types';
import { useGetCats } from '../api';
import { ImageContainer } from '../../homepage/Homepage.css';
import * as S from './../../homepage/modal/CatDetails.css';

interface Props {
  breedId?: number;
  onClose: () => void;
}

const BreedDialog = ({ onClose, breedId }: Props) => {
  const { cats, isLoading, getCats } = useGetCats(breedId ? breedId : -1);
  const { push } = useHistory();

  const openCatDetails = (cat: Cat) => {
    push(`/cats/${cat.id}`);
  };

  useEffect(() => {
    getCats();
  }, []);

  return (
    <Dialog open={true} fullWidth maxWidth="sm" onClose={onClose}>
      {isLoading && <ProgressOverlay />}
      <S.Content>
        <S.HeaderTitle variant="h6">Breed images</S.HeaderTitle>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </S.Content>
      {cats && (
        <ImageContainer>
          <ImageList sx={{ width: 1000, height: '80vh' }} cols={2}>
            {cats.length > 0 &&
              cats.map((item) => (
                <ImageListItem key={item.id}>
                  <img
                    src={`${item.url}`}
                    loading="lazy"
                    alt={item.url}
                    onClick={() => openCatDetails(item)}
                  />
                </ImageListItem>
              ))}
          </ImageList>
        </ImageContainer>
      )}
    </Dialog>
  );
};

export default BreedDialog;
