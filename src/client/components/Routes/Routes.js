import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Root from '../Root/root';


export default function Routes() {
  return (
    <BrowserRouter>

      <Switch>

        <Route path="/" component={Root}/>

      </Switch>

    </BrowserRouter>

  )
}





