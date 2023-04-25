const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "pcosts",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      kilosComprados: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      kilosXPrenda: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      precioXKiloFinal: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      costoFinal: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      porcentajeDeBeneficio: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
    }
  );
};
