const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const PORT = process.env.PORT || 3001;
const clients = require("./data/clients.json");
const products = require("./data/productos.json");
const {
  uploadAllClients,
  uploadAllProducts,
} = require("./src/controllers/index");

const main = async () => {
  try {
    conn.sync({ force: false }).then(async () => {
      await uploadAllClients(clients);
      await uploadAllProducts(products);
      server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
      });
    });
  } catch (error) {
    console.error("Unable to connect to the database", error);
  }
};

main();
