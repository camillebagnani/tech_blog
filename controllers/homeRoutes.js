const router = require('express').Router();
const { User, BlogPost } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await BlogPost.findAll();
        console.log(blogData)
        //seralize data
        res.render('homepage', {
            blogData,
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

// Need route to render the dashboard with the logged in user's blog posts
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userId = req.session.user_id;

        const blogData = await BlogPost.findAll({
            where: {
                user_id: userId,
            }
        });

        res.render('dashboard', {
            blogData,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;