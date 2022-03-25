const { faker } = require("@faker-js/faker");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("conversations").del();
  await knex("messages").del();

  // create array of 4 conversation and messages for user 1
  const conversations = [];
  const messages = [];
  const fakeUserCount = 5;

  for (let i = 1; i <= fakeUserCount; i++) {
    conversations.push({
      user_one: 1,
      user_two: i,
    });
    messages.push({
      user_id: 1,
      conversation_id: i,
      message: faker.random.words(),
    });
    messages.push({
      user_id: i,
      conversation_id: i,
      message: faker.random.words(),
    });
  }

  await knex("conversations").insert(conversations);
  await knex("messages").insert(messages);
};
