import React, { Fragment } from "react";

export default function RegisterListItem({ o }) {
  
  const registerItems = o.map((i) => (
    <option key={i.id} value={i.name}>{i.name}</option>
  ));

  return (
    <Fragment>
      {registerItems}
    </Fragment>
  )
}