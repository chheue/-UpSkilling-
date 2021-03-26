exports.up = function (knex) {
  return knex.schema.createTable('publications', (table) => {
    table.increments('id').primary().unsigned();
    table.string('title');
    table.text('content');
    table.string('author');
    table.timestamp('creationDate').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('publications');
};
