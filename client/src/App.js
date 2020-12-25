import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import styled from "styled-components";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";

// COMPONENTS

import NavBar from "./Components/NavBar";
import Loader from "./Components/Loader";

const AppCont = styled.div`
  display: flex;
  padding: 20px;
`;

const App = () => {
  const { login, logout, token, userId, ready } = useAuth();
  const isAuthenicated = !!token;

  const routes = useRoutes(isAuthenicated);

  if (!ready) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{ token, userId, logout, login, isAuthenicated }}
    >
      <Router>
        {isAuthenicated && <NavBar />}
        <AppCont>{routes}</AppCont>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
