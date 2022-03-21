/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_gender_identity", function (table) {
    table.increments("id");
    table.integer("user_id").references("id").inTable("users");
    table.integer("gender_id").references("id").inTable("genders");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("user_gender_identity");
};
