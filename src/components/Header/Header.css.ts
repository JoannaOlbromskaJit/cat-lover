import styled from 'styled-components';

export const Container = styled.div`
  background-color: #000;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Header = styled.header`
  color: #ffffff;
`;

export const MenuContainer = styled.div`
  position: relative;
  list-style-type: none;
  float: right;
  padding: 0;
  margin: 0;
  ul,
  li {
    display: inline;
  }
  li {
    padding-left: 1rem;
  }
  a {
    color: #ffffff;
    text-decoration: none;
    &:hover {
      color: #b3e5fc;
    }
  }
`;
