import React, { Fragment, useState, useEffect } from "react";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function RelationshipListItem({ r, rp }) {
  const [test, setTest] = useState({});

  useEffect(() => {
    const temp = {};
    r.map((a) => (
      temp[a.id] = rp.includes(a.id) ? true : false
    ))
    setTest(temp)
  }, []);

  const handleCheck = (event) => {
    setTest({...test, [event.target.id]: event.target.checked})
  }

  const relationshipItems = r.map((i) => (
    <ListItem button key={i.id}>
      <ListItemText primary={i.name} />
      <input type="checkbox" id={i.id} checked={test[i.id]} onChange={handleCheck}/>
    </ListItem>
  ));

  return (
    <Fragment>
      {relationshipItems}
    </Fragment>
  )
}