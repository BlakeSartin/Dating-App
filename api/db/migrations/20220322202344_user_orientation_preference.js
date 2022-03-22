/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable(
    "user_orientation_preference",
    function (table) {
      table.increments("id");
      table.integer("user_id").references("id").inTable("users");
      table
        .integer("orientation_id")
        .references("id")
        .inTable("sexual_orientations");
    }
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
