require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "60m" });
  },
  sendAccessToken: (res, accessToken, data) => {
    res.cookie('accessToken', accessToken, {httpOnly: true, sameSite: 'None', secure: true})
    res.status(200).json({ data })
  },
  isAuthorized: (req, res) => {
    const authorization = req.headers["cookie"]
    if(!authorization) {
      res.status(401).json({ data: null, message: "Access token not provided!" })
    } else {
      const token = authorization.split(";")[0].split("=")[1];
      console.log(token)
      return verify(token, process.env.ACCESS_SECRET)
    }
  }
}