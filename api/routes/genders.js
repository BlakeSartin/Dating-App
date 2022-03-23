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

  // get a specific gender based on id
  router.get("/:id", (request, response) => {
    knex("genders")
      .select()
      .whereRaw("id = ?", [request.params.id])
      .then((genders) => {
        response.json(genders);
      });
  });

  return router;
};
