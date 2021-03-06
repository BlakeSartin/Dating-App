/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user_orientation_preference").del();

  // create 5 sexual orientation for each user
  let userPreferences = [];
  const fakeUserCount = 1000;
  for (let i = 1; i <= fakeUserCount; i++) {
    for (let j = 0; j < 5; j++) {
      userPreferences.push({
        user_id: i,
        orientation_id: randomPosition(orientationNames),
      });
    }
  }

  await knex("user_orientation_preference").insert(userPreferences);
};

// array of sexual orientation names
const orientationNames = [
  "Straight",
  "Lesbian",
  "Gay",
  "Bisexial",
  "Queer",
  "Pansexual",
  "Questioning",
  "Heteroflexible",
  "Homoflexible",
  "Asexual",
  "Gray-sexual",
  "Demisexual",
  "Reciprosexual",
  "Akiosexual",
  "Aceflux",
  "Grayromantic",
  "Demiromantic",
  "Recipromantic",
  "Akioromantic",
  "Aroflux",
];

// helper function to randomly select position number of array starting from 1
const randomPosition = (array) => {
  return Math.floor(Math.random() * array.length) + 1;
};
