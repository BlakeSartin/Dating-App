/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user_relationship_preference").del();

  // create array of relationship preference object
  // each user gets a random amount of relationship preferences
  const fakeUserCount = 1000;
  let relationshipPref = [];

  for (let i = 1; i <= fakeUserCount; i++) {
    shuffleArray(relationshipNames);
    const randomSelection = relationshipNames.slice(
      0,
      randomPosition(relationshipNames)
    );

    for (let j = 1; j <= randomSelection.length; j++) {
      relationshipPref.push({
        user_id: i,
        relationship_id: j,
      });
    }
  }

  await knex("user_relationship_preference").insert(relationshipPref);
};

// array of relationship type names
const relationshipNames = [
  "Friends",
  "Short-term dating",
  "Long-term dating",
  "Hookups",
];

// helper function to randomly select position number of array starting from 1
const randomPosition = (array) => {
  return Math.floor(Math.random() * array.length) + 1;
};

// helper to shuffle given array
const shuffleArray = (array) => {
  array.sort(() => 0.5 - Math.random());
};
