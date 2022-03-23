const express = require("express");
const router = express.Router();

module.exports = (knex) => {
  // get all relationship types
  router.get("/", (request, response) => {
    knex("relationship_types")
      .select()
      .then((relationships) => {
        response.json(relationships);
      });
  });
  // get a specific relationship type based on id
  router.get("/:id", (request, response) => {
    knex("relationship_types")
      .select()
      .whereRaw("id = ?", [request.params.id])
      .then((relationships) => {
        response.json(relationships);
      });
  });

  return router;
};
