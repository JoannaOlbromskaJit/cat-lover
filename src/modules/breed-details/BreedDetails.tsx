import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Breadcrumbs, Chip, Container, Typography } from '@mui/material';
import ProgressOverlay from '../../components/ProgressOverlay/ProgressOverlay';
import BreedDialog from './modal/BreedDialog';
import { useGetBreeds } from './api';
import { ChipContainer } from './BreedDetails.css';

const BreedDetails = () => {
  const { breeds, isLoading, getBreeds } = useGetBreeds();
  const [selectedBreedId, setSelectedBreedId] = useState<number>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    getBreeds();
  }, []);

  const onBreedClick = (breedId: number) => {
    setSelectedBreedId(breedId);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Container disableGutters maxWidth="xl">
        <Box mt={2} mb={1}>
          <Breadcrumbs>
            <NavLink to="/">Home</NavLink>
          </Breadcrumbs>
        </Box>
        <Box mt={1} mb={2}>
          <Typography variant="h5">Cat breeds</Typography>
        </Box>
        <Box>
          {isLoading && <ProgressOverlay />}
          {breeds && breeds.length > 0 && (
            <ChipContainer>
              {breeds.map((el) => (
                <Chip
                  key={el.id}
                  label={el.name}
                  variant="outlined"
                  onClick={() => onBreedClick(el.id)}
                />
              ))}
            </ChipContainer>
          )}
        </Box>
      </Container>
      {isDialogOpen && (
        <BreedDialog
          breedId={selectedBreedId}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </>
  );
};

export default BreedDetails;
