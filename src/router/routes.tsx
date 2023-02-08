import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Header from '../components/Header/Header';
import BreedDetails from '../modules/breed-details/BreedDetails';
import FavouriteList from '../modules/favourite/FavouriteList';
import Homepage from '../modules/homepage/Homepage';
import { BREED_DETAILS, CAT_DETAILS, FAVOURITE, ROOT } from './url';

const Routes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path={CAT_DETAILS}>
          <Homepage />
        </Route>
        <Route exact path={ROOT}>
          <Homepage />
        </Route>
        <Route exact path={BREED_DETAILS}>
          <BreedDetails />
        </Route>
        <Route exact path={FAVOURITE}>
          <FavouriteList />
        </Route>
        <Redirect to={ROOT} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
