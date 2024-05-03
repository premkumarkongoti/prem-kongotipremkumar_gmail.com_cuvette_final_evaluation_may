// // models/User.js
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   password: { type: String, required: true },
// });

// module.exports = mongoose.model('User', userSchema);





const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
  bookmarks: {
    type: [], // bookmarked stories ids
  },
  liked: {
    type: [], // liked stories ids
  },
},
{
  timestamps: true,

});

module.exports = mongoose.model('User', userSchema);
