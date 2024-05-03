// backend/models/Story.js

const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  post: [
    {
      heading: { type: String, required: true },
      description: { type: String, required: true },
      imgUrl: { type: String, required: true },
      category: { type: String, required: true },
    },
  ],
  category: {
    type: String,
    required: true,
  },
  likes: {
    type: [],
  },
},
{
  timestamps: true,
});

module.exports = mongoose.model('Story', storySchema);
