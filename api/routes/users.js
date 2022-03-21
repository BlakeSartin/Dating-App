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
      .select()
      .then((users) => {
        console.log(users);
        response.json(users);
      });
  });

  return router;
};
