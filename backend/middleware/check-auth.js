const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = (req, res, next) => {
  // ACCESS TOKEN VIA REQUEST HEADERS
  try {
    const token = req.headers.authorization.split(" ")[1]; //Authorization: 'Bearer TOKEN'
    if (!token) {
      res.status(401).json({ message: "Authentication Failed" });
      return;
    }
    const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY);
    req.userData = { uid: decodedToken.uid };
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
