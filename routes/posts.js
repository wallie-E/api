const posts = require('../controllers/posts');
const express = require("express")


const router = express.Router();

router.post('/', posts.createPost);
router.delete('/:id', posts.deletePost);
router.put("/:id",posts.updatePost);
router.get("/:id", posts.getPost);
router.get("/", posts.getPosts);


module.exports = router;