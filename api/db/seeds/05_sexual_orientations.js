/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("sexual_orientations").del();

  // create array of orientation objects
  const orientations = [];
  for (const orientation of orientationNames) {
    orientations.push({ name: orientation });
  }

  await knex("sexual_orientations").insert(orientations);
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
