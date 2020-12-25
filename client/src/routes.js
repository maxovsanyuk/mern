import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { LinksPage } from "./pages/LinksPage";
import { CreatePage } from "./pages/CreatePage";
import { DetailPage } from "./pages/DetailPage";
import { AuthPage } from "./pages/AuthPage";

export const useRoutes = (isAutenticated) => {
  if (isAutenticated) {
    return (
      <Switch>
        <Route path="/links" exact component={LinksPage} />
        <Route path="/create" exact component={CreatePage} />
        <Route path="/detail/:id" component={DetailPage} />
        <Redirect to="/create" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/" exact component={AuthPage} />
      <Redirect to="/" />
    </Switch>
  );
};
