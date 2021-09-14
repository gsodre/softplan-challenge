import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { Home } from "pages/Home";
import { Character } from "pages/Character";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/details/:id" component={Character} />
        <Route path="*" component={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
