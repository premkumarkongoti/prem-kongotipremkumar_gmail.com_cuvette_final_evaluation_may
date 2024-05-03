// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');
const authmiddleware = require('../middleware/authmiddleware')

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.options('/register', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.send();
  });
  

module.exports = router;
