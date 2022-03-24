const express = require("express");
const router = express.Router();

module.exports = (knex) => {
  // get all users
  router.get("/", (request, response) => {
    knex("users")
      .join(
        "user_gender_identity",
        "users.id",
        "=",
        "user_gender_identity.user_id"
      )
      .join(
        "user_gender_preference",
        "users.id",
        "=",
        "user_gender_preference.user_id"
      )
      .join(
        "user_sexual_orientation",
        "users.id",
        "=",
        "user_sexual_orientation.user_id"
      )
      .join(
        "user_orientation_preference",
        "users.id",
        "=",
        "user_orientation_preference.user_id"
      )
      .join("user_photos", "users.id", "=", "user_photos.user_id")
      .join(
        "user_relationship_preference",
        "users.id",
        "=",
        "user_relationship_preference.user_id"
      )
      .select(
        "users.*",
        knex.raw(
          "ARRAY_AGG(DISTINCT user_gender_identity.gender_id) as gender_identity"
        ),
        knex.raw(
          "ARRAY_AGG(DISTINCT user_gender_preference.gender_id) as gender_preference"
        ),
        knex.raw(
          "ARRAY_AGG(DISTINCT user_sexual_orientation.orientation_id) as sexual_orientation"
        ),
        knex.raw(
          "ARRAY_AGG(DISTINCT user_orientation_preference.orientation_id) as orientation_preference"
        ),
        knex.raw("ARRAY_AGG(DISTINCT user_photos.id) as photos"),
        knex.raw(
          "ARRAY_AGG(DISTINCT user_relationship_preference.relationship_id) as relationship_preference"
        )
      )
      .groupBy("users.id")
      .then((users) => {
        response.json(users);
      });
  });

  // get a user by their id
  router.get("/:id", (request, response) => {
    knex("users")
      .join(
        "user_gender_identity",
        "users.id",
        "=",
        "user_gender_identity.user_id"
      )
      .join(
        "user_gender_preference",
        "users.id",
        "=",
        "user_gender_preference.user_id"
      )
      .join(
        "user_sexual_orientation",
        "users.id",
        "=",
        "user_sexual_orientation.user_id"
      )
      .join(
        "user_orientation_preference",
        "users.id",
        "=",
        "user_orientation_preference.user_id"
      )
      .join("user_photos", "users.id", "=", "user_photos.user_id")
      .join(
        "user_relationship_preference",
        "users.id",
        "=",
        "user_relationship_preference.user_id"
      )
      .select(
        "users.*",
        knex.raw(
          "ARRAY_AGG(DISTINCT user_gender_identity.gender_id) as gender_identity"
        ),
        knex.raw(
          "ARRAY_AGG(DISTINCT user_gender_preference.gender_id) as gender_preference"
        ),
        knex.raw(
          "ARRAY_AGG(DISTINCT user_sexual_orientation.orientation_id) as sexual_orientation"
        ),
        knex.raw(
          "ARRAY_AGG(DISTINCT user_orientation_preference.orientation_id) as orientation_preference"
        ),
        knex.raw("ARRAY_AGG(DISTINCT user_photos.id) as photos"),
        knex.raw(
          "ARRAY_AGG(DISTINCT user_relationship_preference.relationship_id) as relationship_preference"
        )
      )
      .whereRaw("users.id = ?", [request.params.id])
      .groupBy("users.id")
      .then((users) => {
        response.json(users);
      });
  });

  // get 10 users based on their compatability with a given user
  router.get("/:id/match", (request, response) => {
    knex
      .raw(
        `
        SELECT id, first_name, last_name, summary FROM users
        WHERE id IN(
          SELECT user_id
          FROM user_gender_identity
          WHERE gender_id IN(
            SELECT gender_id
            FROM user_gender_preference
            WHERE user_id = ?))
        AND id IN(
          SELECT user_id
          FROM user_sexual_orientation
          WHERE orientation_id IN(
            SELECT orientation_id
            FROM user_orientation_preference
            WHERE user_id = ?))
        AND id IN(
          SELECT user_id
          FROM user_relationship_preference
          WHERE relationship_id IN(
            SELECT relationship_id
            FROM user_relationship_preference
            WHERE user_id = ?)) 
        LIMIT 10;
        `,
        [request.params.id, request.params.id, request.params.id]
      )
      .then((users) => response.json(users.rows));
  });
  return router;
};
