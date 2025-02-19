const { Comment } = require('../models');

// Create a new comment
exports.createComment = async (req, res) => {
    try {
        const { text } = req.body;
        const { reviewId } = req.params;
        const comment = await Comment.create({
            text,
            userId: req.user.id,
            reviewId
        });
        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create comment' });
    }
};

// Update a comment
exports.updateComment = async (req, res) => {
    try {
        const { text } = req.body;
        const { commentId } = req.params;
        const comment = await Comment.findByPk(commentId);
        if (comment) {
            comment.text = text;
            await comment.save();
            res.json(comment);
        } else {
            res.status(404).json({ error: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update comment' });
    }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const comment = await Comment.findByPk(commentId);
        if (comment) {
            await comment.destroy();
            res.json({ message: 'Comment deleted' });
        } else {
            res.status(404).json({ error: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete comment' });
    }
};
