import React from 'react';
import { CircularProgress } from '@mui/material';
import * as S from './ProgressOverlay.css';

const ProgressOverlay = () => (
  <S.ProgressOverlay>
    <CircularProgress size={40} />
  </S.ProgressOverlay>
);

export default ProgressOverlay;
