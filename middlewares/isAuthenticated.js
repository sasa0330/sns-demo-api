const jwt = require("jsonwebtoken");

function isAuthenticated(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message:
        "権限がありません。リクエストヘッダーにトークンがありませんでした。",
    });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log("token");
      return res
        .status(401)
        .json({ message: "権限がありません。トークンの認証に失敗しました。" });
    }

    req.userId = decoded.id;
    next();
  });
}

module.exports = isAuthenticated;
