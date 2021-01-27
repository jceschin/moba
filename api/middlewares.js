const jwt = require("jsonwebtoken");
const { Blacklist, User } = require("./db.js");

//VERIFY TOKEN

const Verifytoken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .send("Unauthorized by microservice (Not token found)");
  }
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, "mobaAuth", function (err, decoded) {
    if (err) {
      return res
        .status(401)
        .send("Unauthorized by microservice (Invalid token)");
    }
    if (decoded.exp < Date.now()) {
      return res
        .status(401)
        .send("Unauthorized by microservice (Expired token)");
    }
    Blacklist.findOne({
      where: {
        token,
      },
    }).then((token) => {
      if (token) {
        return res
          .status(401)
          .send("Unauthorized by microservice (Forbbiden token)");
      }
      next();
    });
  });
};

//VERIFY IS USER IS ADMIN

const isAdmin = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "mobaAuth", function (err, decoded) {
    if (err) {
      return res.sendStatus(401);
    }
    const { id } = decoded;
    User.findOne({
      where: { id },
    }).then((user) => {
      if (!user || user.rol !== "admin") {
        return res.sendStatus(401);
      }
      next();
    });
  });
};

module.exports = {
  Verifytoken,
  isAdmin
};
