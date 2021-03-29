exports.seed = function (knex) {
  return knex('comments').del()
    .then(() => knex('comments').insert([
      {
        comment_id: 1, comment_author: 'User A', publication_id: 3, comment: 'Ok',
      },
      {
        comment_id: 2, comment_author: 'User B', publication_id: 3, comment: 'Oui',
      },
      {
        comment_id: 3, comment_author: 'User C', publication_id: 3, comment: 'Incroyable',
      },
    ]));
};
