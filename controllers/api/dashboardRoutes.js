// if logged in and have existing posts, the fetch request will hit this to populate the data
const router = require('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection')

router.get('/', withAuth, async (req, res) => {
    try {
        const userId = req.session.user_id;

        const blogData = await BlogPost.findAll({
            where: {
                user_id: userId,
            },
        });

        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//post route
// TODO: add withAuth
router.post('/', withAuth, async (req, res) => {
    try {
        const userId = req.session.user_id;
        const username = req.session.username;
        const blogDate = req.session.createdAt;

        const newPost = await BlogPost.create({
            blog_title: req.body.blogTitle,
            blog_content: req.body.blogContent,
            blog_username: username,
            blog_date: blogDate,
            user_id: userId
        });

        serializedNewPost = newPost.get({ plain: true });

        res.status(200).json(serializedNewPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;