const { Router } = require("express");
const router = Router();

const { NAME, PASSWORD } = process.env;

router.post("/login", (req, res) => {
  let logged;
  const { name, password } = req.body;
  if (name === NAME && password === PASSWORD) {
    logged = true;
  } else {
    logged = false;
  }
  res.status(200).json({ logged });
});

module.exports = router;
