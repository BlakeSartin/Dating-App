const express = require("express");
const router = express.Router();

// /* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

// module.exports = router;

module.exports = (db) => {
  router.get("/", (request, response) => {
    db.query(
      `
      SELECT * FROM test;
      `
    ).then((data) => {
      console.log(data);
      response.send(data.rows);
    });
  });

  return router;
};
