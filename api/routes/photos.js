const express = require("express");
const router = express.Router();

module.exports = (knex) => {
  // get all photos
  router.get("/", (request, response) => {
    knex("user_photos")
      .select()
      .then((photos) => {
        response.json(photos);
      });
  });

  // get a photo based on it's id
  router.get("/:id", (request, response) => {
    knex("user_photos")
      .select()
      .whereRaw("id = ?", [request.params.id])
      .then((photos) => {
        response.json(photos);
      });
  });
  return router;
};
