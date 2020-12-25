import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";

// MATERIAL UI

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";

const NavBarBox = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;

  .app-bar {
    background: cadetblue;
  }

  .btn {
    margin: 0 10px 0 0;
  }

  .link {
    text-decoration: none;
  }
`;

const NavBar = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const logOutHandler = (e) => {
    e.preventDefault();
    auth.logout();
    history.push("/");
  };

  return (
    <NavBarBox>
      <AppBar position="static" className="app-bar">
        <Toolbar style={{}}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flex: 1 }}>
            <NavLink to="/" className="link">
              <Button color="primary" className="btn">
                Home
              </Button>
            </NavLink>
          </Typography>

          <NavLink to="/create" className="link">
            <Button color="primary" className="btn">
              Create
            </Button>
          </NavLink>
          <NavLink to="/links" className="link">
            <Button color="primary" className="btn">
              Links
            </Button>
          </NavLink>

          <Button style={{ color: "#fff" }} onClick={logOutHandler}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </NavBarBox>
  );
};

export default NavBar;
