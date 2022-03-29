const express = require("express");
const { response } = require("../app");
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
        SELECT users.id,
          first_name || ' ' || last_name AS name,
          summary,
          avatar AS url,
          user_liked IS NOT NULL AS liked_you,
          ARRAY_AGG(DISTINCT sexual_orientations.name) as sexual_orientation,
          ARRAY_AGG(DISTINCT genders.name) as gender_identity
        FROM users
        LEFT JOIN user_likes ON users.id = user_likes.user_id
        JOIN user_gender_identity ON users.id = user_gender_identity.user_id
        JOIN genders ON user_gender_identity.gender_id = genders.id
        JOIN user_sexual_orientation ON users.id = user_sexual_orientation.user_id
        JOIN sexual_orientations ON user_sexual_orientation.orientation_id = sexual_orientations.id
        WHERE users.id IN(
          SELECT user_id
          FROM user_gender_identity
          WHERE gender_id IN(
            SELECT gender_id
            FROM user_gender_preference
            WHERE user_id = ?))
        AND users.id IN(
          SELECT user_id
          FROM user_sexual_orientation
          WHERE orientation_id IN(
            SELECT orientation_id
            FROM user_orientation_preference
            WHERE user_id = ?))
        AND users.id IN(
          SELECT user_id
          FROM user_relationship_preference
          WHERE relationship_id IN(
            SELECT relationship_id
            FROM user_relationship_preference
            WHERE user_id = ?))
        AND users.id NOT IN(
          SELECT user_liked
          FROM user_likes
          WHERE user_id = ?)
        AND users.id NOT IN(
          SELECT user_rejected
          FROM user_rejects
          WHERE user_id = ?)
        GROUP BY users.id, user_likes.user_liked
        LIMIT 10;
        `,
        [
          request.params.id,
          request.params.id,
          request.params.id,
          request.params.id,
          request.params.id,
        ]
      )
      .then((users) => response.json(users.rows));
  });

  // Add a liked user to a certain user id
  // only inserts if a matching row doesn't already exist
  router.post("/like", (request, response) => {
    knex("user_likes")
      .select()
      .from("user_likes")
      .where("user_id", request.body.user_id)
      .andWhere("user_liked", request.body.user_liked)
      .then((userLikesList) => {
        if (userLikesList.length === 0) {
          return knex("user_likes")
            .returning("*")
            .insert([
              {
                user_id: request.body.user_id,
                user_liked: request.body.user_liked,
              },
            ])
            .then((result) => {
              response.json(result);
            });
        }
      })
      .then(() => {
        // check if liked user already liked current user
        knex("user_likes")
          .select()
          .where("user_id", request.body.user_liked)
          .andWhere("user_liked", request.body.user_id)
          .then((mutualLike) => {
            // if like exists, create a conversation
            if (mutualLike.length) {
              return knex("conversations")
                .returning("id")
                .insert({
                  user_one: request.body.user_id,
                  user_two: request.body.user_liked,
                })
                .then((result) => {
                  response.json(result);
                });
            }
          });
      });
  });

  // Add a rejected user to a certain user id
  router.post("/reject", (request, response) => {
    knex("user_rejects")
      .insert([
        {
          user_id: request.body.user_id,
          user_rejected: request.body.user_rejected,
        },
      ])
      .then((result) => {
        response.json(result);
      });
  });

  // Update a user's gender identity
  // Takes a json object that contains the user's id and an array of gender id
  router.post("/genderidentity", (request, response) => {
    knex("user_gender_identity")
      .where("user_id", request.body.user_id)
      .del()
      .then(() => {
        // build new gender identity object
        const genders = [];
        for (const genderId of request.body.gender_identity) {
          genders.push({
            user_id: request.body.user_id,
            gender_id: genderId,
          });
        }
        // add null if array is empty
        if (genders.length === 0) {
          genders.push(NULL);
        }

        return knex("user_gender_identity").returning("id").insert(genders);
      })
      .then((result) => {
        response.json(result);
      })
      .catch((err) => {
        throw err;
      });
  });

  // Update a user's gender preference
  // Takes a json object that contains the user's id and an array of gender id
  router.post("/genderpreference", (request, response) => {
    knex("user_gender_preference")
      .where("user_id", request.body.user_id)
      .del()
      .then(() => {
        // build new gender preference object
        const genders = [];
        for (const genderId of request.body.gender_preference) {
          genders.push({
            user_id: request.body.user_id,
            gender_id: genderId,
          });
        }
        // add null if array is empty
        if (genders.length === 0) {
          genders.push(NULL);
        }

        return knex("user_gender_preference").returning("id").insert(genders);
      })
      .then((result) => {
        response.json(result);
      })
      .catch((err) => {
        throw err;
      });
  });

  // Update a user's sexual orientation
  // Takes a json object that contains the user's id and an array of orientation id
  router.post("/sexualorientation", (request, response) => {
    knex("user_sexual_orientation")
      .where("user_id", request.body.user_id)
      .del()
      .then(() => {
        // build new sexual orientation objects
        const orientations = [];
        for (const orientationId of request.body.sexual_orientation) {
          orientations.push({
            user_id: request.body.user_id,
            orientation_id: orientationId,
          });
        }
        // add null if array is empty
        if (orientations.length === 0) {
          orientations.push(NULL);
        }

        return knex("user_sexual_orientation")
          .returning("id")
          .insert(orientations);
      })
      .then((result) => {
        response.json(result);
      })
      .catch((err) => {
        throw err;
      });
  });

  // update a user's orientation preference
  // takes a json object that contains the user's id and an array of orientation id
  router.post("/orientationpreference", (request, response) => {
    knex("user_orientation_preference")
      .where("user_id", request.body.user_id)
      .del()
      .then(() => {
        // build new sexual orientation objects
        const orientations = [];
        for (const orientationId of request.body.orientation_preference) {
          orientations.push({
            user_id: request.body.user_id,
            orientation_id: orientationId,
          });
        }
        // add null if array is empty
        if (orientations.length === 0) {
          orientations.push(NULL);
        }

        return knex("user_orientation_preference")
          .returning("id")
          .insert(orientations);
      })
      .then((result) => {
        response.json(result);
      })
      .catch((err) => {
        throw err;
      });
  });

  // update a user's relationship preference
  // takes a json object that contains the user's id and an array of relationship id
  router.post("/relationshiptype", (request, response) => {
    knex("user_relationship_preference")
      .where("user_id", request.body.user_id)
      .del()
      .then(() => {
        // build new relationship preference objects
        const relationships = [];
        for (const relationshipId of request.body.relationship_preference) {
          relationships.push({
            user_id: request.body.user_id,
            relationship_id: relationshipId,
          });
        }
        // add null if array is empty
        if (relationships.length === 0) {
          relationships.push(NULL);
        }

        return knex("user_relationship_preference")
          .returning("id")
          .insert(relationships);
      })
      .then((result) => {
        response.json(result);
      })
      .catch((err) => {
        throw err;
      });
  });

  return router;
};
