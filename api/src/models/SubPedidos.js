const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "subPedido",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      cantidad: {
        type: DataTypes.STRING,
      },
      total: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
