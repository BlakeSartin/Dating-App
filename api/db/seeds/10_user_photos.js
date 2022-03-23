// middleware for creating fake data
const { faker } = require("@faker-js/faker");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user_photos").del();

  // create array of user photo objects
  const userPhotos = [];
  const fakeUserCount = 1000;
  for (let i = 1; i <= fakeUserCount; i++) {
    userPhotos.push({
      url: faker.internet.avatar(),
    });
  }

  await knex("user_photos").insert(userPhotos);
};
