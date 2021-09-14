import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router";

const Navbar = (props) => {
  const history = useHistory();
  const handleFirstClick = () => {
    props.button1 === "Edit profile" && history.push("/profile");
  };
  //   const handleSecondClick = () => {
  //     props.button1 === "About Us" ? <Link></Link> : <Link></Link>
  //   };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
        <Typography variant="h6">Our Best Nanny</Typography>
        <Button color="inherit" onClick={handleFirstClick}>
          {props.button1}
        </Button>
        <Button color="inherit">{props.button2}</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
