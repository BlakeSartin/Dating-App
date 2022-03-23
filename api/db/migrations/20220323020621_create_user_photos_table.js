/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_photos", function (table) {
    table.increments("id");
    table.text("url");
    table.timestamp("time_added").defaultTo(knex.fn.now());
    table.boolean("is_active").defaultTo(true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("user_photos");
};
