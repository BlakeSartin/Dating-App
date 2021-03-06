import React, { useState, useMemo, useContext, useEffect } from "react";
import Moment from 'react-moment';
import axios from "axios";
import { Link } from "react-router-dom";
import "./chats.scss";
import { DeleteForever } from "@mui/icons-material";
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
  Button,
} from "@mui/material";

//importing context
import { userContext } from "../providers/UserProvider";
import moment from "moment";

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
      return <div className="chat_message">{content}</div>;
    }
    // In the final case, we show a text with ellipsis and a `Read more` button
    const toShow = content.substring(0, limit) + "...";
    return <div className="chat_message">{toShow}</div>;
  };

  const GetTimeStamp = ({value}) => {
    if (value === undefined) {
      return '';
    }else if (value === null) {
      return '';
    }else if (value == '') {
      return '';
    }
    return <div className="time_text">{moment(value).fromNow()}</div>
  }

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
              <Link
                to={`/chat/${person.room_id}`}
                style={{ textDecoration: "none" }}
              >
                <ListItemAvatar>
                  <Avatar alt={person.name} src={person.url} />
                </ListItemAvatar>

                <ListItemText
                  className="chat"
                  primary={`${person.name} :`}

                  secondary={
                    <React.Fragment>
                      <Typography
                        className="message_stamp"
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="lightblue"
                        fontSize={"large"}
                      >
                        <LongText
                        className="message_text"
                          content={
                            person.message
                              ? person.message
                              : "You're matched! Start chatting!"
                          }
                          limit={15}
                        />
                      <GetTimeStamp  value={person.timestamp} />
                      </Typography>
                    </React.Fragment>
                  }
                ></ListItemText>
              </Link>
            </ListItemButton>
            <Button>
              <DeleteForever />
            </Button>
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      ))}
    </div>
  );
}

export default Chats;
