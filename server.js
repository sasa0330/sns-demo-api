const express = require("express");
const authRoute = require("./routes/auth");
const app = express();
require("dotenv").config();
const PORT = 5050;

app.use(express.json());
app.use("/api/auth", authRoute);

//ログインAPI

app.listen(PORT, () => console.log(`server port ${PORT}`));
