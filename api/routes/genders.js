const express = require("express");
const router = express.Router();

module.exports = (knex) => {
  // get all genders
  router.get("/", (request, response) => {
    knex("genders")
      .select()
      .then((genders) => {
        response.json(genders);
      });
  });

  return router;
};
