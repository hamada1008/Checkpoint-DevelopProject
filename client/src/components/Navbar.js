import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router";
import { logoutAuth } from "../redux/authReducer";
import { useDispatch } from "react-redux";

const Navbar = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleFirstClick = () => {
    props.button1 === "Edit profile" && history.push("/profile");
  };
  const handleSecondClick = () => {
    if (props.button2 === "Logout") {
      dispatch(logoutAuth());
      history.push("/");
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
        <Typography variant="h6">Our Best Nanny</Typography>
        <Button color="inherit" onClick={handleFirstClick}>
          {props.button1}
        </Button>
        <Button color="inherit" onClick={handleSecondClick}>
          {props.button2}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
