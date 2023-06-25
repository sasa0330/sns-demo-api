const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

//新規ユーザー登録API
router.post(`/register`, async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPasswourd = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPasswourd,
    },
  });
  return res.json({ user });
});

router.post(`/login`, async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: "ユーザーが存在しせん" });
  }
  console.log(user.email);
  console.log(user.password);
  const isPasseordValid = await bcrypt.compare(password, user.password);

  if (!isPasseordValid) {
    return res.status(401).json({ error: "パスワードが違います" });
  }

  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  return res.status(200).json({ token });
});

module.exports = router;
