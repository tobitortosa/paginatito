const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "cliente",
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      redSocial: {
        type: DataTypes.STRING,
      },
      rubro: {
        type: DataTypes.STRING,
      },
      cargo: {
        type: DataTypes.STRING,
      },
      direccion: {
        type: DataTypes.STRING,
      },
      ndireccion: {
        type: DataTypes.STRING,
      },
      localidad: {
        type: DataTypes.STRING,
      },
      cp: {
        type: DataTypes.STRING,
      },
      provincia: {
        type: DataTypes.STRING,
      },
      tel1: {
        type: DataTypes.STRING,
      },
      tel2: {
        type: DataTypes.STRING,
      },
      celular: {
        type: DataTypes.STRING,
      },
      fax: {
        type: DataTypes.STRING,
      },
      paginaWeb: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      observaciones: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: false,
    }
  );
};
