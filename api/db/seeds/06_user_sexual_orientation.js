/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user_sexual_orientation").del();

  userOrientations = [];
  const fakeUserCount = 1000;

  // create sexual orientation for demo user 1
  userOrientations.push({
    user_id: 1,
    orientation_id: 1,
  });

  // create sexual orientation for demo user 2
  userOrientations.push({
    user_id: 2,
    orientation_id: 4,
  });

  // create sexual orientation for demo user 2
  userOrientations.push({
    user_id: 3,
    orientation_id: 4,
  });

  // create 5 sexual orientation for each user
  for (let i = 4; i <= fakeUserCount; i++) {
    for (let j = 0; j < 4; j++) {
      userOrientations.push({
        user_id: i,
        orientation_id: randomPosition(orientationNames),
      });
    }
  }

  await knex("user_sexual_orientation").insert(userOrientations);
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
