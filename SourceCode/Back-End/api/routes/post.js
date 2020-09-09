const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/Posts');


//gets all posts
router.get('/', async(req, res) => {

    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }

});

//submit a post
router.post('/', async(req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
    });

    // post.save()
    // .then(data=>{
    //     res.json(data);
    // })
    // .catch(err=>{
    //     res.json({message:err});
    // })
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err });
    }

});

// //eg for diffeerent cohorts
// router.get('/specific',(req,res)=>{
//     res.send(' specific Posts');
// });

//get a specific post
router.get('/:postId', async(req, res) => {

    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }

});

//Delete a post

router.delete('/:postId', async(req, res) => {

    try {
        const removedPost = await Post.remove({ _id: req.params.postId });
        res.json(removedPost);
    } catch (err) {
        res.json({ message: err });
    }

});

//Update a post

router.patch('/:postId', async(req, res) => {

    try {
        const updatedPost = await Post.updateOne({ _id: req.params.postId }, { $set: { title: req.body.title } });
        res.json(updatedPost);
    } catch (err) {
        res.json({ message: err });
    }

});

module.exports = router;