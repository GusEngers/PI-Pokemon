const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'pokemon',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
      hp: {
        type: DataTypes.INTEGER,
        defaultValue: 45,
        allowNull: true,
      },
      attack: {
        type: DataTypes.INTEGER,
        defaultValue: 45,
        allowNull: true,
      },
      defense: {
        type: DataTypes.INTEGER,
        defaultValue: 45,
        allowNull: true,
      },
      speed: {
        type: DataTypes.INTEGER,
        defaultValue: 45,
        allowNull: true,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
