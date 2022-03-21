/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

//  array of gender names
genderNames = [
  "Woman",
  "Man",
  "Agender",
  "Androgynous",
  "Bigender",
  "Cis Man",
  "Cis Woman",
  "Genderfluid",
  "Genderqueer",
  "Gender Nonconforming",
  "Hijra",
  "Intersex",
  "Non-binary",
  "Other gender",
  "Pangender",
  "Transfeminine",
  "Transgender",
  "Trans Man",
  "Transmasculine",
  "Transsexual",
  "Trans Woman",
  "Two Spirit",
];

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("table_name").del();

  userIdentities = [];
  const fakeUsersCount = 1000;

  // create 5 gender identities for each user
  for (let i = 1; i <= fakeUsersCount; i++) {
    userIdentities.push({
      user_id: i,
      gender_id: Math.floor(Math.random() * genderNames.length),
    });
    userIdentities.push({
      user_id: i,
      gender_id: Math.floor(Math.random() * genderNames.length),
    });
    userIdentities.push({
      user_id: i,
      gender_id: Math.floor(Math.random() * genderNames.length),
    });
    userIdentities.push({
      user_id: i,
      gender_id: Math.floor(Math.random() * genderNames.length),
    });
    userIdentities.push({
      user_id: i,
      gender_id: Math.floor(Math.random() * genderNames.length),
    });
  }
  await knex("table_name").insert();
};
