// array of gender names
const genderNames = [
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

const fakeUsersCount = 1000;

// helper function to randomly select id number of a gender identity
const generateGenderId = () => {
  return Math.floor(Math.random() * genderNames.length) + 1;
};

module.export = { fakeUsersCount, generateGenderId };
