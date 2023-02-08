import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  ImageList,
  ImageListItem
} from '@mui/material';
import { Cat } from '../../utils/types';
import { RouteParam } from '../../utils/types/RouteParam';
import CatDetails from './modal/CatDetails';
import { useGetCats } from './api';
import { ImageContainer } from './Homepage.css';

const Homepage = () => {
  const { push } = useHistory();
  const [page, setPage] = useState(0);
  const [cats, setCats] = useState<Cat[]>([]);
  const { catsData, isLoading, getCats } = useGetCats(page);
  const [selectedCat, setSelectedCat] = useState<Cat>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { catId } = useParams<RouteParam>();

  useEffect(() => {
    getCats();
  }, [page]);

  useEffect(() => {
    if (catsData) {
      setCats((prev) => {
        const uniqueCats: Cat[] = [];
        const ids = prev.map((el) => el.id);

        catsData.forEach((el) => {
          if (!ids.includes(el.id)) {
            uniqueCats.push(el);
          }
        });
        return [...prev, ...uniqueCats];
      });
    }
  }, [catsData]);

  useEffect(() => {
    if (catId && !isDialogOpen) {
      setIsDialogOpen(true);
    }
  }, [catId]);

  const loadMore = () => setPage((prev) => prev + 1);

  const openCatDetails = (cat: Cat) => {
    setSelectedCat(cat);
    setIsDialogOpen(true);
    push(`/cats/${cat.id}`);
  };

  return (
    <>
      <Container disableGutters maxWidth="xl">
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
                    style={{
                      width: '488px',
                      height: '376px',
                      objectFit: 'cover'
                    }}
                  />
                </ImageListItem>
              ))}
          </ImageList>
        </ImageContainer>
        <Box display="flex" justifyContent="center">
          {cats.length > 0 && (
            <Button variant="contained" onClick={loadMore} disabled={isLoading}>
              Load more
            </Button>
          )}
          {isLoading && (
            <CircularProgress
              size={50}
              sx={{
                position: 'absolute',
                top: '300px',
                left: '50% - 25px'
              }}
            />
          )}
        </Box>
      </Container>
      {isDialogOpen && (
        <CatDetails
          cat={selectedCat}
          onClose={() => setIsDialogOpen(false)}
          catId={catId}
        />
      )}
    </>
  );
};

export default Homepage;
