import React, { Fragment } from "react";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function GenderListItem({ g }) {
  
  const genderItems = g.map((i) => (
    <ListItem button key={i}>
      <ListItemText primary={i} />
      <input type="checkbox" id={i}/>
    </ListItem>
  ));

  return (
    <Fragment>
      {genderItems}
    </Fragment>
  )
}