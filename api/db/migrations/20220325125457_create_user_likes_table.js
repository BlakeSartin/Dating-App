/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_likes", function (table) {
    table.increments("id").primary().notNullable();
    table.integer("user_id").references("id").inTable("users");
    table.integer("user_liked").references("id").inTable("users");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("user_likes");
};
