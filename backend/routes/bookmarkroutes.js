const express = require('express');
const router = express.Router();
const Bookmark = require('../models/bookmarks');

// Add a bookmark
router.post('/', async (req, res) => {
  try {
    const { storyId, userId } = req.body;
    const bookmark = new Bookmark({ storyId, userId });
    await bookmark.save();
    res.status(201).json(bookmark);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all bookmarks for a user
router.get('/', async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookmarks = await Bookmark.find({ userId }).populate('storyId');
    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove a bookmark
router.delete('/remove/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Bookmark.findByIdAndDelete(id);
    res.json({ message: 'Bookmark removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
