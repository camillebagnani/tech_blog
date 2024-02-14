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
        console.log(serializedUserData)
        req.session.save(() => {
            req.session.user_id = serializedUserData.id;
            req.session.logged_in = true;
            req.session.username = serializedUserData.username;
            req.session.createdAt = serializedUserData.createdAt;

            res.status(200).json(userData)
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });
        
        const serializedUserData = userData.get({plain: true});
        
        if (!serializedUserData) {
            res.status(400).json({ message: 'Incorrect email or password. Please try again.' });
            return;
        }

        const validPassword = await bcrypt.compare(
            req.body.password,
            serializedUserData.password
        );

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password. Please try again.' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = serializedUserData.id;
            req.session.logged_in = true;


            req.session.username = serializedUserData.username;
            req.session.createdAt = serializedUserData.createdAt;

            res.json({ user: serializedUserData, message: 'Logged in successfully!' });
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