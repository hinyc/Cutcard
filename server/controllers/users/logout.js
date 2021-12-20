module.exports = (req, res) => {
  res
    .status(200)
    .clearCookie("accessToken")
    .json({ message: "logout successfully" });
};
