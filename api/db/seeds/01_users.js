// middleware for creating fake data
const { faker } = require("@faker-js/faker");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();

  const userImages = [];
  const fakeUsers = [];
  const desiredFakeUsers = 1000;

  // add images saved locally
  for (let i = 0; i <= desiredFakeUsers; i++) {
    userImages.push(
      `/photos/0${Math.floor(Math.random() * 10)}${Math.floor(
        Math.random() * 10
      )}.avif`
    );
  }

  // Create 1000 fake users
  for (let i = 0; i < desiredFakeUsers; i++) {
    fakeUsers.push({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      summary: `Pronouns: ${
        pronouns[Math.floor(Math.random() * pronouns.length)]
      }`,
      profile: faker.lorem.lines(2),
      avatar: userImages[i],
    });
  }

  // add them to database
  await knex("users").insert(fakeUsers);
};

// array of pronoun strings
const pronouns = ["He/Him", "She/Her", "They/Them"];
