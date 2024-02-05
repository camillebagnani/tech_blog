// if logged in and have existing posts, the fetch request will hit this to populate the data
const router = require('express').Router();
const {User, BlogPost} = require('../../models');
const withAuth = require('../../utils/auth');

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
router.post('/', withAuth, async (req, res) => {
    try {
        const userId = req.session.user_id;

        const newPost = await BlogPost.create({
            blog_title: req.body.blog_title,
            blog_content: req.body.blog_content,
            blog_username: req.body.blog_username,
            blog_date: req.body.blog_date,
            user_id: userId
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// TODO: put route to add a comment on a post with a specific id (queryparameter)
router.put('/:id')

module.exports = router;