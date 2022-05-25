const express = require("express");
const connect = require("./schemas");
const app = express();
const port = 3000;

connect();

const postsRouter = require("./routers/posts");

const requestMiddleware = (req, res, next) => {
    console.log("Request URL:", req.originalUrl, " - ", new Date());
    next();
}

app.use(express.static("static"));
app.use(express.json());
app.use(requestMiddleware);

app.use("/api", [postsRouter]);

app.get("/", (req, res) => {
    res.send("HOMEWORK");
});

app.listen(port, () => {
    console.log(port, "포트로 서버가 열렸습니다!");
});

// const express = require("express");
// const bodyParser = require("body-parser");

// const app = express();
// const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("Hi!");
// });
// app.use("/api", bodyParser.json(), router);
// app.use(express.static("./assets"));

// app.listen(8080, () => {
//   console.log("서버가 켜졌어요!");
// });