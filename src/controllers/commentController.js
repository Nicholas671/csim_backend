const Comment = require('../models/Comment');

// Create a new comment
exports.createComment = async (req, res) => {
    try {
        const { text } = req.body;
        const { reviewId } = req.params;
        const comment = await Comment.create(text, req.user.id, reviewId);
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
        const comment = await Comment.update(commentId, text);
        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update comment' });
    }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        await Comment.delete(commentId);
        res.json({ message: 'Comment deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete comment' });
    }
};
