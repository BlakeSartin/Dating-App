/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("table_name").del();

  // create 5 sexual orientation for each user
  userOrientations = [];
  const fakeUserCount = 1000;
  for (let i = 1; i <= fakeUserCount; i++) {
    for (let j = 0; j < 5; j++) {
      userIdentities.push({
        user_id: i,
        gender_id: randomPosition(orientationNames),
      });
    }
  }

  await knex("table_name").insert([
    { id: 1, colName: "rowValue1" },
    { id: 2, colName: "rowValue2" },
    { id: 3, colName: "rowValue3" },
  ]);
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
