module.exports = (sequelize, Sequelize) => {
  const Book = sequelize.define(
    'Book',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      authors: {
        type: Sequelize.JSON,
      },
      publisher: {
        type: Sequelize.STRING,
        defaultValue: 'Gutenberg',
        allowNull: false,
      },
      publicationDate: {
        type: Sequelize.DATE,
      },
      subjects: {
        type: Sequelize.JSON,
      },
      licenseRights: {
        type: Sequelize.STRING,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['id'],
        },
        {
          unique: false,
          fields: ['title'],
        },
        {
          unique: false,
          fields: ['authors'],
          using: 'gin',
          operator: 'jsonb_path_ops',
        },
        {
          unique: false,
          fields: ['publicationDate'],
        },
      ],
    }
  );

  return Book;
};
