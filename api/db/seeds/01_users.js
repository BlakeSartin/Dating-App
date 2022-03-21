// middleware for creating fake data
const { faker } = require("@faker-js/faker");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// Helper function to generate fake user
const createFakeUser = () => ({
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email: faker.internet.email(),
  summary: faker.lorem.lines(2),
  profile: faker.lorem.paragraphs(),
});

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();

  // Create 1000 fake users
  const fakeUsers = [];
  const desiredFakeUsers = 1000;
  for (let i = 0; i < desiredFakeUsers; i++) {
    fakeUsers.push(createFakeUser());
  }

  // add them to database
  await knex("users").insert(fakeUsers);
};
