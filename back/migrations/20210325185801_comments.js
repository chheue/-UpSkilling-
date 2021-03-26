exports.up = function (knex) {
  return knex.schema.createTable('comments', (table) => {
    table.increments('comment_id').primary().unsigned();
    table.integer('publication_id').references('publications.id').unsigned().index()
      .onDelete('CASCADE');
    table.string('author');
    table.text('comment');
    table.timestamp('creationDate').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('comments');
};
