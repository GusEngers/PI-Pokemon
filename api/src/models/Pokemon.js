const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
     image: {
      type: DataTypes.STRING
    },
    hp: {
      type: DataTypes.INTEGER,
      defaultValue: 45,
      allowNull: true
    },
    attack: {
      type: DataTypes.INTEGER,
      defaultValue: 45,
      allowNull: true
    },
    defense: {
      type: DataTypes.INTEGER,
      defaultValue: 45,
      allowNull: true
    },
    speed: {
      type: DataTypes.INTEGER,
      defaultValue: 45,
      allowNull: true
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createAt: {
      type: DataTypes.STRING,
      defaultValue: "Gustavo",
      allowNull: true
    }
  }, {
    timestamps: false
  });
};