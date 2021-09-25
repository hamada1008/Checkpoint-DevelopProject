import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  FormHelperText,
} from "@material-ui/core";
import { useHistory } from "react-router";
import { logoutAuth } from "../redux/authReducer";
import { useDispatch } from "react-redux";
import { profileLogout } from "../redux/editProfileReducer";
import { makeStyles } from "@material-ui/core";
import logo from "../img/logo.svg"

const useStyle = makeStyles({
  navbar: {
    display: 'Flex',
    justifyContent: "space-between"
  }
})

const Navbar = (props) => {
  const classes = useStyle();
  const history = useHistory();
  const dispatch = useDispatch();
  const handleFirstClick = () => {
    props.button1 === "Edit profile" && history.push("/profile");
  };
  const handleSecondClick = () => {
    if (props.button2 === "Logout") {
      dispatch(logoutAuth());
      // dispatch(profileLogout());
      history.push("/");
    }
  };

  return (
    <AppBar position="static" color="d" >
      <Toolbar className={classes.navbar}>
        <div style={{ display: 'flex', flexDirection: "row", width: '25vw', justifyContent: 'space-around' }}>
          <IconButton edge="edge" color="inherit" aria-label="menu">
            <img src={logo} alt="logo" width="100" height="50" />
          </IconButton>
          {/* <Typography variant="h5" mt={20}>My Best Nanny</Typography> */}
          <h3 style={{ display: "flex", alignSelf: 'center' }}>My Best Nanny</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: "row", width: '25vw', justifyContent: 'space-around' }}>
          <Button color="inherit" onClick={handleFirstClick}>
            {props.button1}
          </Button>
          <Button color="inherit" onClick={handleSecondClick}>
            {props.button2}
          </Button>
        </div>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
