const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "pdetails",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      tela: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      corte: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      costura: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      cierreDeCuello: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      ribsPuñoCuello: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      tancaYCordon: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      velcro: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      cordonElastico: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      hebillasLaterales: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      cierreLateral: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      bolsa: {
        defaultValue: 0,
        type: DataTypes.INTEGER,
      },
      estampado: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      bordado: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      cintaReflexiva: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      peliculas: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
    }
  );
};
