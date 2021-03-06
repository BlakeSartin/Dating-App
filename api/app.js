// environment
const ENV = require("./environment");

// middleware
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

// routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const gendersRouter = require("./routes/genders");
const orientationsRouter = require("./routes/orientations");
const relationshipsRouter = require("./routes/relationships");
const photosRouter = require("./routes/photos");
const chatsRouter = require("./routes/chats");

// database
// const db = require("./db");
const app = express();
const knexConfig = require("./db/knexfile");
const knex = require("knex")(knexConfig[ENV]);

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/", indexRouter);
app.use("/api/users", usersRouter(knex));
app.use("/api/genders", gendersRouter(knex));
app.use("/api/orientations", orientationsRouter(knex));
app.use("/api/relationships", relationshipsRouter(knex));
app.use("/api/photos", photosRouter(knex));
app.use("/api/chats", chatsRouter(knex));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// app.close = function () {
//   return db.end();
// };

module.exports = { app, knex };
