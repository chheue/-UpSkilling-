exports.up = function (knex) {
  return knex.schema.createTable('comments', (table) => {
    table.increments('comment_id').primary().unsigned();
    table.integer('publication_id').unsigned().references('publications.publication_id').onDelete('CASCADE');
    table.string('comment_author');
    table.text('comment');
    table.timestamp('comment_creationDate').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('comments');
};
