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
        allowNull: false,
      },
      stock: {
        type: DataTypes.STRING,
        defaultValue: "0",
      },
      color: {
        type: DataTypes.ENUM([
          "blanco",
          "negro",
          "gris",
          "azul marino",
          "otro",
        ]),
      },
      talle: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.ENUM([
          "buzo",
          "chaleco",
          "chomba",
          "articulo varios",
          "gorra",
          "camisa",
          "pantalon",
          "campera",
          "remera",
          "otro",
        ]),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
