import React, { Fragment } from "react";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function RelationshipListItem({ r }) {
  
  const relationshipItems = r.map((i) => (
    <ListItem button key={i.id}>
      <ListItemText primary={i.name} />
      <input type="checkbox" id={i.id}/>
    </ListItem>
  ));

  return (
    <Fragment>
      {relationshipItems}
    </Fragment>
  )
}