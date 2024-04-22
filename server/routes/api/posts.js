const express = require('express');
const mongodb = require('mongodb');
//MongoDB user: ljs174 pw: dZs7pRMLKV6592cQ
const router = express.Router();

//Get posts
router.get('/', async (req,res)=>{
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray())
});

//Add post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    })
    res.status(201).send();
});
//Delete Post
router.delete('/:id', async (req,res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
    res.status(200).send();
})

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://ljs174:dZs7pRMLKV6592cQ@vuepr03.2kjvy6f.mongodb.net/?retryWrites=true&w=majority&appName=vuepr03');
    //mongodb+srv://ljs174:<password>@vuepr03.2kjvy6f.mongodb.net/
    return client.db('vuepr03').collection('posts');
}

module.exports = router;