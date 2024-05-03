
// backend/controllers/storyController.js

const Story = require('../models/stories');

const createStory = async (req, res) => {
  try {
    const { heading, description, imageUrl, category, slides } = req.body;
    const newStory = new Story({ heading, description, imageUrl, category, slides });
    await newStory.save();
    res.status(201).json({ message: 'Story created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};




// Get all stories
const getAllStories = async (req, res) => {
  try {
    const stories = await Story.find();
    res.status(200).json(stories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a specific story by ID
const getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    res.status(200).json(story);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a story by ID
const updateStory = async (req, res) => {
  try {
    const { heading, description, imageUrl, category, slides } = req.body;
    const updatedStory = await Story.findByIdAndUpdate(req.params.id,
      { heading, description, imageUrl, category, slides },
      { new: true }
    );
    if (!updatedStory) {
      return res.status(404).json({ error: 'Story not found' });
    }
    res.status(200).json(updatedStory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a story by ID
const deleteStory = async (req, res) => {
  try {
    const deletedStory = await Story.findByIdAndDelete(req.params.id);
    if (!deletedStory) {
      return res.status(404).json({ error: 'Story not found' });
    }
    res.status(200).json({ message: 'Story deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


const shareStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    // Generate unique link and copy to clipboard logic
    const shareLink = `https://example.com/story/${story._id}`;
    // Logic to copy shareLink to clipboard
    res.status(200).json({ message: 'Story shared', link: shareLink });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};




  
const getStoriesByCategory = async (req, res) => {
  const category = req.params.category;
  try {
    const stories = await Story.find({ category });
    res.status(200).json({ stories });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { createStory, getAllStories, getStoryById, updateStory, deleteStory, shareStory,getStoriesByCategory };
