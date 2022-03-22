import React, { useState, useRef, useMemo, useEffect } from "react";
import TinderCard from "react-tinder-card";
import "./cards.scss";
import { IconButton, Accordion, Typography, AccordionSummary, AccordionDetails } from "@mui/material";
import { HeartBroken, SettingsBackupRestore, Favorite, ExpandMore } from "@mui/icons-material";


const db = [
  {
    name: "prince",
    url: "https://www.chicagotribune.com/resizer/3U1sOcVhiya2oB1GGaSO2GfYD8A=/415x508/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/NKTE7ZA6RJAAPNMPH4XN2IRRTA.jpg",
    summary:"Standing tall, and athletically built with red skin, Apolónia has a knowing feel about .soft, large brown eyes, a narrow nose, and a pointed chin. short, fine, black hair is features a side part.clothing is revealing and mismatched. A particularly noticeable feature is accent which people usually find annoying."
  },
  {
    name: "fredie mercury",
    url: "https://cdns-images.dzcdn.net/images/artist/d690b6b1e9ff8f0a7944b2293b540966/500x500.jpg",
    summary:"Standing tall, and stocky with pink skin, Sylvaine has an unruly feel about .distrustful, large black eyes, a big nose, and a round chin. very short, straight, blonde hair is is styled with a crew cut.clothing is slightly too small and retro. A particularly noticeable feature is distinctive clothes."
  },
];

function Cards() {
  const [people, setPeople] = useState(db.length - 1);

  const currentPeopleRef = useRef(people);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updatePeople = (val) => {
    setPeople(val);
    currentPeopleRef.current = val;
  };

  const canGoBack = people < db.length - 1;

  const canSwipe = people >= 0;

  const outOfFrame = (name, idx) => {
    currentPeopleRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    if (canSwipe && people < db.length) {
      await childRefs[people].current.swipe(dir); // Swipe the card!
    }
  };

  const swiped = (direction, nameToDelete, index) => {
    updatePeople(index - 1);
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newPeople = people + 1;
    updatePeople(newPeople);
    await childRefs[newPeople].current.restoreCard();
  };

  const input = useRef();
  console.log(input);
  return (
    <div>
      {db.map((person, index) => (
        <TinderCard
          ref={childRefs[index]}
          className="swipe"
          key={person.name}
          onSwipe={(dir) => swiped(dir, person.name, index)}
          onCardLeftScreen={() => outOfFrame(person.name, index)}
          preventSwipe={["up", "down"]}
        >
          <div
            style={{ backgroundImage: `url(${person.url})` }}
            className="card"
          >
            <h3>{person.name}</h3>
          </div>
          <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Description</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {person.summary}
          </Typography>
        </AccordionDetails>
        </Accordion>
        </TinderCard>
      ))}
      <div className="buttons">
        <IconButton id = "button" onClick={() => swipe("left")}>
          <HeartBroken fontSize="large" sx={{ fontSize: 30 }}/>
          </IconButton>
        <IconButton id = "button" onClick={() => goBack()}>
          <SettingsBackupRestore fontSize="large" sx={{ fontSize: 30 }}/>
          </IconButton>
        <IconButton id = "button" onClick={() => swipe("right")}>
          <Favorite fontSize="large" sx={{ fontSize: 30 }}/>
        </IconButton>
      </div>
    </div>
  );
}

export default Cards;
