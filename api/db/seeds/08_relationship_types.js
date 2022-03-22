/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("relationship_types").del();

  // create array of relationship type objects
  const relationships = [];
  for (const relationship of relationshipNames) {
    relationships.push({ name: relationship });
  }

  await knex("relationship_types").insert(relationships);
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
