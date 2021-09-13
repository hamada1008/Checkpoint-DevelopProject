import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";

const Navbar = (props) => {
  //   const handleFirstClick = () => {
  //     props.button1 === "Our Services" ? <Link></Link> : <Link></Link>
  //   };
  //   const handleSecondClick = () => {
  //     props.button1 === "About Us" ? <Link></Link> : <Link></Link>
  //   };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
        <Typography variant="h6">Our Best Nanny</Typography>
        <Button color="inherit">{props.button1}</Button>
        <Button color="inherit">{props.button2}</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
