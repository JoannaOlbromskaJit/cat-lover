import React from 'react';
import * as S from './Header.css';

const Header = () => {
  return (
    <S.Container>
      <S.Header>Cat Lover</S.Header>
      <S.MenuContainer>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/breeds">Cat breeds</a>
          </li>
          <li>
            <a href="/favourite">Favourite</a>
          </li>
        </ul>
      </S.MenuContainer>
    </S.Container>
  );
};

export default Header;
