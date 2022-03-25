/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("conversations", function (table) {
    table.increments("id").primary().notNullable();
    table.integer("user_one").references("id").inTable("users");
    table.integer("user_two").references("id").inTable("users");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("conversations");
};
