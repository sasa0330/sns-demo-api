const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const isAuthenticated = require("../middlewares/isAuthenticated");
const prisma = new PrismaClient();

//新規ユーザー登録API
router.get(`/find`, isAuthenticated, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId } });
    if (!user) {
      return res.status(404).json({ message: "ユーザーが見つかりません" });
    }
    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "find APIでエラー" });
  }
});

router.get(`/profile/:userId`, async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: parseInt(userId) },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!profile) {
      return res
        .status(404)
        .json({ message: "ユーザーが見つかりませんでした。" });
    }
    console.log("とれた");
    return res.status(200).json(profile);
  } catch (error) {
    return res.status(500).json({ message: "システムエラーです。" });
  }
});

module.exports = router;
