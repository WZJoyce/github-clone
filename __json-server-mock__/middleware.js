
module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "user" && req.body.password === "1234") {
      return res.status(200).json({
        user: {
          token: "1234",
        },
      });
    } else {
      return res.status(400).json({ message: "wrong" });
    }
  }
  next();
};