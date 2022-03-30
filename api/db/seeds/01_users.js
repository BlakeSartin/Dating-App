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
  // create user 1 who will be our demo user
  fakeUsers.push({
    first_name: "John",
    last_name: "Doe",
    email: faker.internet.email(),
    summary: `Pronouns: ${
      pronouns[Math.floor(Math.random() * pronouns.length)]
    }`,
    profile: faker.lorem.lines(2),
    avatar: userImages[1],
  });

  // create user 2 who will be our demo liked user
  fakeUsers.push({
    first_name: "Jane",
    last_name: "Smith",
    email: faker.internet.email(),
    summary: `Pronouns: He/Him`,
    profile: "Is this the real life? Is this just fantasy?",
    avatar: userImages[2],
  });

  // create user 3 who will be our demo liked user
  fakeUsers.push({
    first_name: "Freddie",
    last_name: "Mercury",
    email: faker.internet.email(),
    summary: `Pronouns: He/Him`,
    profile: "Is this the real life? Is this just fantasy?",
    avatar: "/photos/freddie.jpg",
  });

  // Create 1000 fake users
  for (let i = 2; i < desiredFakeUsers; i++) {
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
