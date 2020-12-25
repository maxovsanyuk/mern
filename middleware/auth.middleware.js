const jwt = require("jsonwebtoken");
const confirg = require("config");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "not authorization" });
    }

    req.user = jwt.verify(token, confirg.get("jwtSecret"));
    next();
  } catch (e) {
    res.status(401).json({ message: "not authorization" });
  }
};
