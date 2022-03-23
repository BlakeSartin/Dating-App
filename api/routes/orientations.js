const express = require("express");
const router = express.Router();

module.exports = (knex) => {
  // get all sexual orientations
  router.get("/", (request, response) => {
    knex("sexual_orientations")
      .select()
      .then((orientations) => {
        response.json(orientations);
      });
  });

  // get a specific sexual orientation based on id
  router.get("/:id", (request, response) => {
    knex("sexual_orientations")
      .select()
      .whereRaw("id = ?", [request.params.id])
      .then((orientations) => {
        response.json(orientations);
      });
  });

  return router;
};
