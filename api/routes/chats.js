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
    knex("conversations")
      .select()
      .whereRaw("user_one = ? OR user_two = ?", [
        request.params.id,
        request.params.id,
      ])
      .then((conversations) => {
        response.json(conversations);
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
    knex("messages").insert([
      {
        user_id: request.body.user_id,
        conversation_id: request.body.conversation_id,
        message: request.body.message,
      },
    ]);
  });

  return router;
};
