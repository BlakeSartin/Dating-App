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
  await knex("genders").del();

  // create array of gender objects
  const genders = [];
  for (const gender of genderNames) {
    genders.push({ name: gender });
  }

  // add them to database
  await knex("genders").insert(genders);
};
