const User = require('./User');
const Comment = require('./Comment');
const BlogPost = require('./BlogPost');

User.hasMany(BlogPost, {
    foreignKey: 'user_id',
    onDelete: 'CASCASE',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCASE',
});

BlogPost.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: 'CASCASE',
});

Comment.belongsTo(BlogPost, {
    foreignKey: 'blog_id',
    onDelete: 'CASCASE',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCASE',
});

module.exports = {
    User,
    BlogPost,
    Comment,
};