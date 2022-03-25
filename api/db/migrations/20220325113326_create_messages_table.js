/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("messages", function (table) {
    table.increments("id").primary().notNullable();
    table.integer("user_id").references("id").inTable("users");
    table.integer("conversation_id").references("id").inTable("conversations");
    table.text("message");
    table.timestamp("time_sent").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("messages");
};
