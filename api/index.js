const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const PORT = process.env.PORT || 3001;

const main = async () => {
  try {
    conn.sync({ force: true }).then(async () => {
      server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
      });
    });
  } catch (error) {
    console.error("Unable to connect to the database", error);
  }
};

main();
