const router = require('express').Router();
const userRoutes = require('./userRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const commentRoutes = require('./commentRoutes');
const editRoutes = require('./editRoutes');

router.use('/user', userRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/comment', commentRoutes);
router.use('/editpost', editRoutes);

module.exports = router;