import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import nannyIn from "../img/nannyin.jpg";
import nannyOut from "../img/nannyout.jpg";
const ServiceCard = (props) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(`search/${_.kebabCase(props.nannyType)}`);
  };

  //card styling
  const useStyles = makeStyles({
    card: {
      // "&:hover": { backgroundImage: URL({ nannyIn }) },
      minWidth: "20%",
      maxWidth: "30%",
      minHeight: "100%",
      flex: 1,
      display: "flex",
      flexFlow: "wrap",
      alignContent: "space-around",
      borderRadius: "20px",
      justifyContent: "center",
      boxShadow: "-9px 25px 42px rgba(0, 0, 0, 0.3)",
    },
    textTitle: {
      textAlign: "center",
      fontWeight: "bold",
    },
    textP: {
      textAlign: "center",
    },
    findButton: {
      background: "#a690f0",
      backgroundImage: "linear-gradient(to bottom, #a690f0, #c8b7f7)",
      "&:hover": {
        background: "#bf3cfc",
        backgroundImage: "linear-gradient(to bottom, #bf3cfc, #99d6ff)",
      },
      borderRadius: 20,
      boxShadow: "4px 4px 30px #666666",
      fontFamily: "Courier New",
      color: "#ffffff",
      fontSize: "1rem",
      padding: "13px 16px 13px 16px",
      textDecoration: "none",
    },
  });
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.textTitle} variant="h4" component="h4">
          {props.nannyType === "Nanny In"
            ? "Hire a nanny at your home"
            : "Bring your kids to a nanny's home"}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography className={classes.textP} variant="p" component="p">
          {props.nannyType === "Nanny In"
            ? "Hire a professional nanny to come and take care of your kids inside your home vicinity"
            : "Bring your kids to one of our nannies that will take care of your children in her house"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          className={classes.findButton}
          size="small"
          onClick={handleClick}
        >
          Find
        </Button>
      </CardActions>
    </Card>
  );
};

export default ServiceCard;
