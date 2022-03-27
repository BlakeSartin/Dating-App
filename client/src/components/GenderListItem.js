import React, { Fragment, useState, useEffect } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function GenderListItem({ g, ug }) {
  const [test, setTest] = useState({});

  useEffect(() => {
    const temp = {};
    g.map((a) => (temp[a.id] = ug.includes(a.id) ? true : false));
    setTest(temp);
  }, []);

  const handleCheck = (event) => {
    setTest({ ...test, [event.target.id]: event.target.checked });

    // modify user's gender identity ids
    if (event.target.checked) {
      ug.push(parseInt(event.target.id));
      console.log(ug);
    }
    if (!event.target.checked) {
      const index = ug.indexOf(parseInt(event.target.id));
      ug.splice(index, 1);
      console.log(ug);
    }
  };

  const genderItems = g.map((i) => (
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

  return <Fragment>{genderItems}</Fragment>;
}
