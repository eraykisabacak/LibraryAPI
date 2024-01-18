/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('borrowed_books', function (table){
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('users.id');
        table.integer('book_id').unsigned().references('books.id');
        table.timestamp('borrowed_at').defaultTo(knex.fn.now());
        table.timestamp('returned_at');
        table.integer('score');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('borrowed_books');
};
