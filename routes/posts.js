const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();
const isAuthenticated = require("../middlewares/isAuthenticated");

//つぶやき投稿用
router.post(`/post`, isAuthenticated, async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "投稿内容がありません" });
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        content,
        authorId: req.userId,
      },
    });

    return res.status(201).json(newPost);
  } catch (e) {
    return res.status(500).json({ message: "エラーです" });
  }
});

router.get(`/get_latest_post`, async (req, res) => {
  try {
    const latestPosts = await prisma.post.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        autor: true,
      },
    });
    return res.status(200).json(latestPosts);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "エラーです" });
  }
});

module.exports = router;
