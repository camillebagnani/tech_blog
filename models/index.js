const User = require('./User');
const Comment = require('./Comment');
const BlogPost = require('./BlogPost');

User.hasMany(BlogPost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

BlogPost.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE',
});

Comment.belongsTo(BlogPost, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

module.exports = {
    User,
    BlogPost,
    Comment,
};