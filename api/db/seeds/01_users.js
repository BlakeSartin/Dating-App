// middleware for creating fake data
const { faker } = require("@faker-js/faker");
const rp = require("request-promise");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

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

// Helper function to generate fake user
const createFakeUser = () => ({
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email: faker.internet.email(),
  summary: faker.lorem.lines(2),
  profile: faker.lorem.paragraphs(),
  avatar: faker.image.avatar(),
});

// get 1000 user images from randomuser api
// return array of 1000 random images
const getRandomUsers = () => {
  rp("https://randomuser.me/api/?results=1").then((data) => {
    const userImages = [];
    parsedData = JSON.parse(data);

    for (const result of parsedData.results) {
      // console.log(result.picture.large);
      userImages.push(result.picture.large);
      console.log(userImages);
    }

    return userImages;
  });
};
