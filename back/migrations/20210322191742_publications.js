exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('publications', (table) => {
    table.increments();
    table.string('title');
    table.string('content');
    table.string('author');
    table.date('creationDate');
  });
};

exports.down = function (knex) {

};
