const Post = require('../model/post')

const createPost = async(req, res) => {
    try {
        const post = await new Post(req.body)
        await post.save()

        return res.status(200).json("Post saved sucessfully")
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Error while posting data", err })
    }
}

module.exports = { createPost }