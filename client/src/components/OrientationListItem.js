import React, { Fragment } from "react";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function OrientationListItem({ o }) {
  
  const orientationItems = o.map((i) => (
    <ListItem button key={i}>
      <ListItemText primary={i} />
      <input type="checkbox" id={i}/>
    </ListItem>
  ));

  return (
    <Fragment>
      {orientationItems}
    </Fragment>
  )
}