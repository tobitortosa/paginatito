const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "aporteYGasto",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      cost: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      date: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.ENUM(["Aporte", "Gasto"]),
      },
    },
    {
      timestamps: false,
    }
  );
};
