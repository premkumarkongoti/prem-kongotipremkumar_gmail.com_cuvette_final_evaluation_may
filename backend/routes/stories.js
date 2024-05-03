// // routes/stories.js
// const express = require('express');
// const router = express.Router();
// const storyController = require('../controller/stories');
// const authMiddleware = require('../middleware/authmiddleware');

// router.post('/', authMiddleware, storyController.create);
// router.get('/', storyController.getAll);
// //router.get('/:id', storyController.getById);
// //router.put('/:id', authMiddleware, storyController.update);
// //router.delete('/:id', authMiddleware, storyController.delete);

// module.exports = router;





const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authmiddleware');
const storyController = require('../controller/stories');

// POST /api/stories (protected route)
router.post('/', storyController.createStory);

router.post('/share/:id', storyController.shareStory);


router.get('/category/:category', storyController.getStoriesByCategory);

// GET: Get all stories
router.get('/', storyController.getAllStories);

// GET: Get a specific story by ID
router.get('/:id', storyController.getStoryById);

// PUT: Update a story by ID
router.put('/:id', authMiddleware, storyController.updateStory);

// DELETE: Delete a story by ID
router.delete('/:id', authMiddleware, storyController.deleteStory);




module.exports = router;
