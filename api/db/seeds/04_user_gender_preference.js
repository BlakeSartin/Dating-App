import { generateGenderId } from "../helpers";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user_gender_preference").del();

  const userPreferences = [];
  // create 5 gender identities for each user
  for (let i = 1; i <= fakeUsersCount; i++) {
    userPreferences.push({
      user_id: i,
      gender_id: generateGenderId(),
    });
    userPreferences.push({
      user_id: i,
      gender_id: generateGenderId(),
    });
    userPreferences.push({
      user_id: i,
      gender_id: generateGenderId(),
    });
    userPreferences.push({
      user_id: i,
      gender_id: generateGenderId(),
    });
    userPreferences.push({
      user_id: i,
      gender_id: generateGenderId(),
    });
  }

  await knex("user_gender_preference").insert(userPreferences);
};
