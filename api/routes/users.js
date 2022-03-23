const express = require("express");
const router = express.Router();

// /* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

// module.exports = router;

module.exports = (knex) => {
  router.get("/", (request, response) => {
    // db.query(
    //   `
    //   SELECT * FROM test;
    //   `
    // ).then((data) => {
    //   console.log(data.rows);
    //   response.send(data.rows);
    // });
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
        knex.raw("ARRAY_AGG(DISTINCT user_photos.id) as photos")
      )
      .groupBy("users.id")
      .then((users) => {
        response.json(users);
      });
  });

  return router;
};
