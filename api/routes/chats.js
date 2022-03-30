const express = require("express");
const router = express.Router();

module.exports = (knex) => {
  // get all chats
  router.get("/", (request, response) => {
    knex("conversations")
      .select()
      .then((conversations) => {
        response.json(conversations);
      });
  });

  // get a chat room by id
  router.get("/:id", (request, response) => {
    knex("conversations")
      .select()
      .whereRaw("id = ?", [request.params.id])
      .then((conversation) => {
        response.json(conversation);
      });
  });

  // get all chat rooms belonging to a user
  router.get("/user/:id", (request, response) => {
    // knex("conversations")
    //   .join("users", "users.id", "=", "conversation.user_two")
    //   .select("users.first_name", "users.last_name")
    //   .whereRaw("user_one = ? OR user_two = ?", [
    //     request.params.id,
    //     request.params.id,
    //   ])
    knex
      .raw(
        `
        SELECT conversations.id AS room_id,
          users.first_name || ' ' || users.last_name AS name,
          avatar as url,
          recent_messages.message,
          recent_messages.time_sent as timestamp
        FROM conversations
        LEFT JOIN users ON conversations.user_two = users.id
        LEFT JOIN (
          SELECT messages.conversation_id, message, time_sent
          FROM messages
            JOIN (
              SELECT MAX(id) as id, conversation_id
              FROM messages
              GROUP BY conversation_id
          ) AS temp_message ON temp_message.id = messages.id
        ) AS recent_messages ON recent_messages.conversation_id = conversations.id
        WHERE conversations.user_one = ?
        OR conversations.user_two = ?
        ORDER BY room_id DESC;
        `,
        [request.params.id, request.params.id]
      )
      .then((conversations) => {
        response.json(conversations.rows);
      });
  });

  // get all messages from a chat
  router.get("/:id/messages", (request, response) => {
    knex("messages")
      .select()
      .whereRaw("conversation_id = ?", [request.params.id])
      .then((messages) => {
        response.json(messages);
      });
  });

  // add a conversation
  router.post("/", (request, response) => {
    knex("conversations").insert({
      user_one: request.params.user_one,
      user_two: request.params.user_two,
    });
  });

  // add a message
  router.post("/messages", (request, response) => {
    knex("messages")
      .insert([
        {
          user_id: request.body.user_id,
          conversation_id: request.body.conversation_id,
          message: request.body.message,
        },
      ])
      .then((result) => response.json(result));
  });

  return router;
};
