require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "2d" });
  },
  sendAccessToken: (res, accessToken) => {
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "None",
      sercure: true,
    });
  },
  isAuthorized: (req, res) => {
    const authorization = req.headers["authorization"];

    if (!authorization) {
      return res
        .status(401)
        .json({ data: null, message: "access token not provided!" });
    } else {
      const token = authorization.split(" ")[1];
      return verify(token, process.env.ACCESS_SECRET);
    }
  },
};
