const { Cliente } = require("../db");
const clientes = require("../../data/clients.json");

module.exports = {
  getAllClients: async () => {
    const dbClients = await Cliente.findAll();
    return dbClients;
  },
  uploadAllData: async (array) => {
    Cliente.bulkCreate(array)
      .then(() => console.log("data uploaded successfully"))
      .catch((error) => console.log(error));
  },
};
