const Post = require('../models/Post');

module.exports = {
    createPost: async (req, res) => {
        const newPost = new Post(req.body);
        try {
            const savedPost = await newPost.save();
            res.status(200).json(savedPost);
        } catch (err){
            res.status(500).json(err);
        }
    },
    deletePost: async (req, res) => {
        try{
            const post = await Post.findById(req.params.id);
            // 文章的作者和当前想要修改文章的人一致时才能删除文章
            if(post.username === req.body.username){
                try {
                    await post.delete();
                    res.status(200).json("Post has been deleted...");
                } catch(err){
                    res.status(500).json(err);
                }
            }else{
                res.status(401).json("You can only delete your post");
            }
        } catch (err){
            res.status(500).json(err)
        }
    },
    updatePost: async (req, res) => {
        try{
            const post = await Post.findById(req.params.id);
            // 文章的作者和当前想要修改文章的人一致时才能更新文章
            if(post.username === req.body.username){
                try {
                    const updatedPost = await Post.findByIdAndUpdate(
                        req.params.id, 
                        {
                            $set: req.body,
                        },
                        { new: true }
                    );
                    res.status(200).json(updatedPost);
                } catch(err){
                    res.status(500).json(err);
                }
            }else{
                res.status(401).json("You can only update your post");
            }
        } catch (err){
            res.status(500).json(err)
        }
    },
    getPost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            res.status(200).json(post);
        } catch(err) {
            res.status(500).json(err)
        }
    },
    getPosts: async (req, res) => {
        const username = req.query.user;
        const catName = req.query.cat;
        try {
            let posts;
            if(username){
                posts = await Post.find({username});
            } else if (catName){
                posts = await Post.find({categories: {
                    $in: [catName]
                }})
            } else {
                posts = await Post.find();
            }
            res.status(200).json(posts);
        } catch(err){
            res.status(500).json(err);
        }
    }
}