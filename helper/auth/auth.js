const jwt = require("jsonwebtoken");
const codeAndMessage = require("../error-code-message/error-code-message");
require("dotenv").env;

exports.checkToken = (req, res, next) => {
  jwt.verify(
    req.headers.authtoken,
    process.env.JWTPASS,
    function (err, decoded) {
      if (err) {
        return res.status(codeAndMessage.badRequestHttpCode).json({
          httpCode: codeAndMessage.badRequestHttpCode,
          code: codeAndMessage.badRequestHttpCode,
          message: codeAndMessage.badRequestHttpCode,
        });
      } else {
        console.log(decoded.data);
        req.userId = decoded.data;
        next();
      }
    }
  );
};
