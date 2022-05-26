const express = require("express");
const Post = require("../schemas/post");
const router = express.Router();

router.get("/", (req, res)=> {
    res.send("Homework")
});
// 게시글 전체 조회
router.get("/posts", async (req, res) => {
    const { title, name, date } = req.query;
    // const posts = await Post.find();
    const posts = await Post.find({ title, name, date }).sort({date: 'desc'});
    res.json({
        posts,
    });
});
// 게시글 작성
router.post("/posts", async (req,res) => {
    const { postId, name, password, title, content } = req.body;
    // const posts = await Post.find();
    const date = new Date().toLocaleString();
    const createdPosts = await Post.create({ postId, name, password, title, content, date });
    res.json({ posts: createdPosts });
});
// 게시글 상세 조회
router.get("/posts/:postId", async (req, res) =>{
    const { postId } = req.params;
    const [ posts ] = await Post.find({ postId: Number(postId) });
    res.json({
        posts,
    });
});
// 게시글 수정 
router.put("/posts/:postId", async (req, res) => {
    const { postId } = req.params;
    const { title, content, password } = req.body;

    const pass = await Post.find({ postId: postId, password: password });
    // const passwords = await Post.find({ password: postpass });

    if ( !pass.length ){
        res.status(400).json({ errorMessage: "비밀번호가 틀렸습니다." });
        return;
    } else {
        await Post.updateOne({ postId: Number(postId) }, { $set: { title, content } });
    };
    res.json({ success: true });
});
// 게시글 삭제
router.delete("/posts/:postId", async (req, res) => {
    const { postId } = req.params;
    const { password } = req.body;
    const pass = await Post.find({ postId: postId, password: password });

    if ( !pass.length ) {
        res.status(400).json({ errorMessage: "비밀번호가 틀렸습니다." }); 
        return;   
    } else {
        await Post.deleteOne({ postId: Number(postId) });
    }
    res.json({ success: true });
});

module.exports = router;