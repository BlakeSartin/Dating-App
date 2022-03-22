import React, { useState, useRef, useMemo, useEffect } from "react";
import TinderCard from "react-tinder-card";
import "./cards.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartCrack, faRotateLeft } from "@fortawesome/free-solid-svg-icons";

const db = [
  {
    name: "prince",
    url: "https://www.chicagotribune.com/resizer/3U1sOcVhiya2oB1GGaSO2GfYD8A=/415x508/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/NKTE7ZA6RJAAPNMPH4XN2IRRTA.jpg",
  },
  {
    name: "fredie mercury",
    url: "https://cdns-images.dzcdn.net/images/artist/d690b6b1e9ff8f0a7944b2293b540966/500x500.jpg",
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
      <h1>Cards</h1>

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
        </TinderCard>
      ))}
      <div className="buttons">
        <button id = "button" onClick={() => swipe("left")}>
          <FontAwesomeIcon icon={faHeartCrack} size="lg" beat/>
          </button>
        <button id = "button" onClick={() => goBack()}>
          <FontAwesomeIcon icon={faRotateLeft} size="lg" />
          </button>
        <button id = "button" onClick={() => swipe("right")}>
          <FontAwesomeIcon icon={faHeart} size="lg" beat/>
        </button>
      </div>
    </div>
  );
}

export default Cards;
