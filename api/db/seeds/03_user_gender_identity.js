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

  await knex("table_name").insert([
    { id: 1, colName: "rowValue1" },
    { id: 2, colName: "rowValue2" },
    { id: 3, colName: "rowValue3" },
  ]);
};
