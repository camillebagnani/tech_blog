const router = require('express').Router();
const { json } = require('sequelize');
const {BlogPost} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await BlogPost.findAll();
      
        const blogPosts = blogData.map((post) => {
            return post.get({plain: true})
        });

        res.render('homepage', {
            blogPosts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

// Render the dashboard with the logged in user's blog posts
//TODO: Add withAuth
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userId = req.session.user_id;

        const blogData = await BlogPost.findAll({
            where: {
                user_id: userId,
            }
        });

        const blogPosts = blogData.map((post) => {
            return post.get({plain: true})
        });

        console.log('blogposts by user:', blogPosts)

        res.render('dashboard', {
            blogPosts,
            logged_in: req.session.logged_in,
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

// TODO: get route at post ID for getting a post where id matches body

module.exports = router;