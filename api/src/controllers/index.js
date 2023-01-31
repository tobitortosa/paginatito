const { Cliente, Producto } = require("../db");

module.exports = {
  getAllClients: async () => {
    const dbClients = await Cliente.findAll();
    return dbClients;
  },
  uploadAllClients: async (array) => {
    Cliente.bulkCreate(array)
      .then(() => console.log("Clients uploaded successfully"))
      .catch((error) => console.log(error));
  },
  uploadAllProducts: async (array) => {
    Producto.bulkCreate(array)
      .then(() => console.log("Products uploaded successfully"))
      .catch((error) => console.log(error));
  },
};
