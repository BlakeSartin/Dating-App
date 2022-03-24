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

  return router;
};
