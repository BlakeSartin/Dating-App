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

  // for (let i = 1; i <= fakeUserCount; i++) {
  conversations.push({
    user_one: 1,
    user_two: 100,
  });
  messages.push({
    user_id: 1,
    conversation_id: 1,
    message: "I had a lot of fun last night!",
  });
  messages.push({
    user_id: 100,
    conversation_id: 1,
    message: "Me too",
  });
  messages.push({
    user_id: 100,
    conversation_id: 1,
    message: "Let's hang out again next weekend",
  });
  conversations.push({
    user_one: 1,
    user_two: 101,
  });
  messages.push({
    user_id: 101,
    conversation_id: 2,
    message: "Is 6 tonight good for you?",
  });
  // }

  await knex("conversations").insert(conversations);
  await knex("messages").insert(messages);
};
