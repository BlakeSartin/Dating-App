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

  return router;
};
