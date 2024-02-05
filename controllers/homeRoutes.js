const router = require('express').Router();
const { json } = require('sequelize');
const {BlogPost} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await BlogPost.findAll();
        console.log(blogData)
        //seralize data

        const jsonBlogData = blogData.map(post => post.toJSON());

        res.render('homepage', {
            blogData: jsonBlogData,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// TODO: route at post ID for getting a post where id matches body

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

// Render the dashboard with the logged in user's blog posts
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userId = req.session.user_id;

        const blogData = await BlogPost.findAll({
            where: {
                user_id: userId,
            }
        });

        const jsonBlogData = blogData.map(post => post.toJSON());

        res.render('dashboard', {
            blogData: jsonBlogData,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;