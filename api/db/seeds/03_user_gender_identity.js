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

// helper function to randomly select id number of a gender identity
const generateGenderIdentity = () => {
  return Math.floor(Math.random() * genderNames.length) + 1;
};

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user_gender_identity").del();

  userIdentities = [];
  const fakeUsersCount = 1000;

  // generate gender identity for demo user 1
  userIdentities.push({
    user_id: 1,
    gender_id: 2,
  });

  // generate gender identity for demo user 2
  userIdentities.push({
    user_id: 2,
    gender_id: 2,
  });

  // generate gender identities for demo user 3
  userIdentities.push({
    user_id: 3,
    gender_id: 2,
  });

  // create 5 gender identities for each user
  for (let i = 4; i <= fakeUsersCount; i++) {
    userIdentities.push({
      user_id: i,
      gender_id: generateGenderIdentity(),
    });
    userIdentities.push({
      user_id: i,
      gender_id: generateGenderIdentity(),
    });
    userIdentities.push({
      user_id: i,
      gender_id: generateGenderIdentity(),
    });
    userIdentities.push({
      user_id: i,
      gender_id: generateGenderIdentity(),
    });
  }
  await knex("user_gender_identity").insert(userIdentities);
};
