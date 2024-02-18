const router = require('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');

// TODO: put route to edit a post with a specific id (parameter)
router.put('/:id', withAuth, async (req, res) => {
    try {
        const userId = req.session.user_id;
        const username = req.session.username;
        const blogDate = req.session.updatedAt;
        const blogId = req.params.id;

        const editedPost = await BlogPost.update(
            {
                blog_title: req.body.blogTitle,
                blog_content: req.body.blogContent,
                blog_username: username,
                blog_date: blogDate,
                user_id: userId,
            },
            {
                where: {
                    id: blogId,
                },
            });

        if (editedPost[0] === 1) {
            const updatedPost = await BlogPost.findByPk(blogId);
            serializedNewPost = updatedPost.get({ plain: true });
            return res.json(serializedNewPost);
        } else {
            return res.status(404).json({ error: 'Blog post not found or not updated' });
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;