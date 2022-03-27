import React, { Fragment, useState, useEffect } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function OriPrefListItem({ o, uo }) {
  const [test, setTest] = useState({});

  useEffect(() => {
    const temp = {};
    o.map((a) => (temp[a.id] = uo.includes(a.id) ? true : false));
    setTest(temp);
  }, []);

  const handleCheck = (event) => {
    setTest({ ...test, [event.target.id]: event.target.checked });
    // modify user's gender preference ids
    if (event.target.checked) {
      uo.push(parseInt(event.target.id));
      console.log(uo);
    }
    if (!event.target.checked) {
      const index = uo.indexOf(parseInt(event.target.id));
      uo.splice(index, 1);
      console.log(uo);
    }
  };

  const orientationItems = o.map((i) => (
    <ListItem button key={i.id}>
      <ListItemText primary={i.name} />
      <input
        type="checkbox"
        id={i.id}
        checked={test[i.id]}
        onChange={handleCheck}
      />
    </ListItem>
  ));

  return <Fragment>{orientationItems}</Fragment>;
}
