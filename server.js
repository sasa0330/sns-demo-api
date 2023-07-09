const express = require("express");
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");
const usersRoute = require("./routes/users");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = 5050;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);
app.use("/api/users", usersRoute);

//ログインAPI
app.listen(PORT, () => console.log(`server port ${PORT}`));
