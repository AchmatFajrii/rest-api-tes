const jwt = require("jsonwebtoken")

const authenticateJWT = (req, res, next) => {
  const authorization = req.header('Authorization').split(" ");
  const token = authorization[1]
  if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err){ 
        console.log(err)
        return res.sendStatus(401)
      }
      req.user = user;
      next();
    });
};

module.exports = authenticateJWT