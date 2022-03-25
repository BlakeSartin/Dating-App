/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("conversations").del();

  // create array of 4 conversation for user 1
  const conversations = [];
  const fakeUserCount = 5;
  for (let i = 2; i <= fakeUserCount; i++) {
    conversations.push({
      user_one: 1,
      user_two: i,
    });
  }

  await knex("conversations").insert(conversations);
};
