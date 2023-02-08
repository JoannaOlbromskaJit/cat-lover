import styled from 'styled-components';

export const ProgressOverlay = styled.div`
  background: none repeat scroll 0 0 rgba(0, 0, 0, 0.5);
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  pointer-events: none;
  z-index: 111;
  span {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
`;
