exports.seed = function (knex) {
  return knex('publications').del()
    .then(() => knex('publications').insert([
      {
        id: 1, title: 'Air Santo Domingo', author: 'Wikipedia', content: 'Air Santo Domingo (code AITA EX) est la compagnie aérienne nationale de la République dominicaine. Elle assure, depuis sa création en 1998, 45 vols quotidiens à l\'intérieur de la République et dessert El Portillo, La Romana, Puerto Plata, Punta Cana, Santiago et Saint-Domingue (Santo Domingo en espagnol d\'où le nom de la compagnie). En international, elle dessert San Juan (Porto Rico).',
      },
      {
        id: 2, title: 'Immeuble de Bruhat-Tits', author: 'Wikipedia', content: 'En mathématiques, un immeuble, aussi appelé l’immeuble Tits et l’immeuble Bruhat-Tits (nommé d\'après François Bruhat et Jacques Tits) est une structure combinatoire et géométrique qui généralise simultanément certains aspects des variétés de drapeaux, des plans projectifs finis, et les espaces riemanniens symétriques. Introduite par Jacques Tits comme moyen de comprendre la structure des groupes exceptionnels de type de Lie, la théorie a également été utilisée pour l\'étude de la géométrie et de la topologie des espaces homogènes des groupes de Lie p-adiques et leurs sous-groupes de symétrie discrets, de la même manière que les arbres ont été utilisés pour étudier les groupes libres.',
      },
      {
        id: 3, title: 'Neroth', author: 'Wikipedia', content: 'Neroth est une municipalité de la Verbandsgemeinde Gerolstein, dans l\'arrondissement de Vulkaneifel, en Rhénanie-Palatinat, dans l\'ouest de l\'Allemagne.',
      },
    ]));
};
