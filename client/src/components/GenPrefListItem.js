import React, { Fragment, useState, useEffect } from "react";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function GenPrefListItem({ g, ug }) {
  const [test, setTest] = useState({});

  useEffect(() => {
    const temp = {};
    g.map((a) => (
      temp[a.id] = ug.includes(a.id) ? true : false
    ))
    setTest(temp)
  }, []);

  const handleCheck = (event) => {
    setTest({...test, [event.target.id]: event.target.checked})
  }

  const genderItems = g.map((i) => (
    <ListItem button key={i.id}>
      <ListItemText primary={i.name} />
      <input type="checkbox" id={i.id} checked={test[i.id]} onChange={handleCheck}/>
    </ListItem>
  ));

  return (
    <Fragment>
      {genderItems}
    </Fragment>
  )
}