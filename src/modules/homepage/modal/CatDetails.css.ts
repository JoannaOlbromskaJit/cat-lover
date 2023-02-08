import { Typography } from '@mui/material';
import styled from 'styled-components';

export const Content = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
`;
