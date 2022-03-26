import React, { useState, useMemo, useContext, useEffect } from "react";
import axios from "axios";
import "./chats.scss";
import {
  IconButton,
  List,
  Box,
  ListItem,
  ListItemText,
  Divider,
  ListItemAvatar,
  ListItemButton,
  Typography,
  Avatar,
} from "@mui/material";

//importing context
import { userContext } from "../providers/UserProvider";

// const db = [
//   {
//     name: "Elliot Page",
//     message:
//       "Standing tall, and athletically built with red skin, Apolónia has a knowing feel about .soft, large brown eyes, a narrow nose, and a pointed chin. short, fine, black hair is features a side part.clothing is revealing and mismatched. A particularly noticeable feature is accent which people usually find annoying.",
//     url: "https://i.insider.com/5fc68f9250e71a00115583f4?width=600&format=jpeg&auto=webp",
//     timestamp: "10 mins ago",
//   },
//   {
//     name: "Lil Nas X",
//     message: "Lorem Ipsum",
//     url: "https://i.scdn.co/image/ab6761610000e5ebab6bd6e450cbc7629a9a2381",
//     timestamp: "10 mins ago",
//   },
//   {
//     name: "Laverne Cox",
//     message: "Lorem Ipsum",
//     url: "https://variety.com/wp-content/uploads/2020/06/laverne-cox-variety-big-ticket-podcast.jpg",
//     timestamp: "10 mins ago",
//   },
//   {
//     name: "Elton John",
//     message: "Lorem Ipsum",
//     url: "https://i.guim.co.uk/img/media/d4e28df5b298b942695a45f31f2d47896e59eb88/0_247_3543_2127/master/3543.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d92405afb743d9e8d705697a1cf105ff",
//     timestamp: "10 mins ago",
//   },
// ];

function Chats({ name, message, url }) {
  const { user } = useContext(userContext);
  const [db, setDb] = useState([]);
  const [people, setPeople] = useState(db.length - 1);

  useEffect(() => {
    return axios.get(`/api/chats/user/${user.id}`).then((result) => {
      // console.log("db query result: ", result.data);
      setDb(result.data);
    });
  }, [user.id]);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );
  const LongText = ({ content, limit }) => {
    if (content.length <= limit) {
      // there is nothing more to show
      return <div>{content}</div>;
    }
    // In the final case, we show a text with ellipsis and a `Read more` button
    const toShow = content.substring(0, limit) + "...";
    return <div>{toShow}</div>;
  };

  return (
    <div>
      {db.map((person, index) => (
        <List
          ref={childRefs[index]}
          className="chat_list"
          key={person.name}
          sx={{ width: "100%", bgcolor: "background.paper" }}
        >
          <ListItem alignItems="flex-start">
            <ListItemButton>
              <ListItemAvatar>
                <Avatar alt={person.name} src={person.url} />
              </ListItemAvatar>
              <ListItemText
                className="chat"
                primary={person.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      className="message_stamp"
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      <LongText content={person.message} limit={50} />
                    </Typography>
                    - {person.timestamp}
                  </React.Fragment>
                }
              />
            </ListItemButton>
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      ))}
    </div>
  );
}

export default Chats;
