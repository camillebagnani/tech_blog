const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const sequelize = require('../../config/connection');

router.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const userData = await User.create({
            username: req.body.username,
            password: hashedPassword,
        });

        const serializedUserData = userData.get({plain: true});

        req.session.save(() => {
            req.session.user_id = serializedUserData.id;
            req.session.logged_in = true;

            res.status(200).json(userData)
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password. Please try again.' });
            return;
        }

        const validPassword = await bcrypt.compare(
            req.body.password,
            userData.password
        );

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password. Please try again.' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'Logged in successfully!' });
        });
    } catch (err) {
        res.status(400).json(err);
    };
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;