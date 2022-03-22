/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable(
    "user_relationship_preference",
    function (table) {
      table.increments("id");
      table.integer("user_id").references("id").inTable("users");
      table
        .integer("relationship_id")
        .references("id")
        .inTable("relationship_types");
    }
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("user_relationship_preference");
};
