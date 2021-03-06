import React, { useState, useRef, useMemo, useEffect, useContext } from "react";
import axios from "axios";
import CardBackdrop from "./CardBackdrop";
import TinderCard from "react-tinder-card";
import MatchBackdrop from "./MatchBackDrop";
import "./cards.scss";
import { IconButton, Button, Icon } from "@mui/material";
import {
  HeartBroken,
  SettingsBackupRestore,
  Favorite,
  SosOutlined,
} from "@mui/icons-material";
//importing context
import { userContext } from "../providers/UserProvider";

function Cards() {
  const { user } = useContext(userContext);
  const [db, setDb] = useState([]);
  const [people, setPeople] = useState(db.length - 1);

  const currentPeopleRef = useRef(people);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    [db.length]
  );
  useEffect(() => {
    if (!user.id) {
      return;
    }
    return axios.get(`/api/users/${user.id}/match`).then((result) => {
      console.log("db query:", result.data);
      setDb(result.data);
      setPeople(result.data.length - 1);
    });
  }, [user.id]);

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
    // get the id of the user at that index in db state
    // post to the database with that user's id to add the like
    if (direction === "right") {
      console.log("liked user's id", db[index].id);
      axios
        .post(`/api/users/like`, {
          user_id: user.id,
          user_liked: db[index].id,
        })
        .then((result) => {
          console.log(result);
        });
    }
    if (direction === "left") {
      console.log("rejected user's id", db[index].id);
      axios
        .post(`/api/users/reject`, {
          user_id: user.id,
          user_rejected: db[index].id,
        })
        .then((result) => {
          console.log(result);
        });
    }

    updatePeople(index - 1);
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newPeople = people + 1;
    updatePeople(newPeople);
    await childRefs[newPeople].current.restoreCard();
  };

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
        </TinderCard>
      ))}
      <div className="arrow_down">
        {db[people] && (
          <CardBackdrop
            summary={db[people].summary}
            genderIdentity={db[people].gender_identity}
            sexualOrientation={db[people].sexual_orientation}
            profile={db[people].profile}
          />
        )}
      </div>

      <div>
        {db[people] && db[people].liked_you ? (
          <MatchBackdrop name={db[people].name} />
        ) : (
          ""
        )}
      </div>

      <div className="buttons">
        <IconButton className="broke_button" onClick={() => swipe("left")}>
          <HeartBroken fontSize="large" sx={{ fontSize: 30 }} />
        </IconButton>

        <IconButton className="undo_button" onClick={() => goBack()}>
          <SettingsBackupRestore fontSize="large" sx={{ fontSize: 30 }} />
        </IconButton>

        <IconButton className="heart_button" onClick={() => swipe("right")}>
          <Favorite fontSize="large" sx={{ fontSize: 30 }} />
        </IconButton>
      </div>
      <h1>{db.name}</h1>
    </div>
  );
}

export default Cards;
