const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "pedido",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      pedidoDate: {
        type: DataTypes.STRING,
      },
      entregaDate: {
        type: DataTypes.STRING,
      },
      seña: {
        type: DataTypes.STRING,
      },
      entrego: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      timestamps: false,
    }
  );
};
