import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import _ from 'lodash'

const ServiceCard = (props) => {
  const history = useHistory()
  const handleClick = () => {
    history.push(`search/${_.kebabCase(props.nannyType)}`)
  }

  return (
    <div>
      <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Icon (nanny type)
          </Typography>
          <Typography variant="h3" component="h2">
            {props.nannyType}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleClick} >Find</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default ServiceCard;
