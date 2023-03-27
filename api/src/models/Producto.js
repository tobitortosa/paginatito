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
        allowNull: false,
        defaultValue: "0",
      },
      type: {
        type: DataTypes.ENUM(["buso", "remera", "chaleco", "campera"]),
        allowNull: false,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      costs: {
        type: DataTypes.JSON,
      },
      details: {
        type: DataTypes.JSON,
      },
    },
    {
      timestamps: false,
    }
  );
};
