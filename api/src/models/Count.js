const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'count',
    {
      count: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
        prefix: {
          type: DataTypes.STRING,
          defaultValue: 'pro',
      }
    },
    {
      timestamps: false,
    }
  );
};
