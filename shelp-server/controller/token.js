require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (data) => {
    return sign(data.dataValues, process.env.ACCESS_SECRET, {
      expiresIn: "10m",
    });
  },
  generateRefreshToken: (data) => {
    return sign(data.dataValues, process.env.REFRESH_SECRET, {
      expiresIn: "15d",
    });
  },
  sendAccessToken: (res, accessToken, statusCode, data) => {
    res
      .cookie("jwt", accessToken, {
        domain: "localhost",
        path: "/",
        maxAge: 24 * 6 * 60 * 10000,
        sameSite: "none",
        httpOnly: true,
        // secure: true,
      })
      .status(statusCode)
      .json(data);
  },
  isAuthorized: (req) => {
    const userInfo = verify(req.cookies.jwt, process.env.ACCESS_SECRET);
    return userInfo;
  },
  renewToken: (accessToken, refreshToken) => {},
};
