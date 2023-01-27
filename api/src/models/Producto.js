const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "producto",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
      },
      precio: {
        type: DataTypes.STRING,
      },
      costs: {
        type: DataTypes.JSON,
      },
    },
    {
      timestamps: false,
    }
  );
};
