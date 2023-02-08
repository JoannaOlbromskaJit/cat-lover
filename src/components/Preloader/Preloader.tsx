import React from 'react';
import { CircularProgress } from '@mui/material';
import * as S from './Preloader.css';

const Preloader = () => (
  <S.Container>
    <CircularProgress size={40} />
  </S.Container>
);

export default Preloader;
