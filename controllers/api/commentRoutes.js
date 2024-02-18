const router = require('express').Router();
const { User, BlogPost, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

router.post('/', withAuth, async (req, res) => {
    try {
        const username = req.session.username;
        const commentDate = req.session.createdAt;
        const userId = req.session.user_id;

        const newComment = await Comment.create({
            comment_content: req.body.comment_content,
            comment_username: username,
            comment_date: commentDate,
            blog_id: req.body.blog_id,
            user_id: userId
        });

        const serilizedNewComment = newComment.get({ plain: true });

        res.status(200).json(serilizedNewComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;