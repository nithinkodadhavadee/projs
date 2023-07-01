const express = require('express');
const router = express.Router();
const mainController = require('../controllers/view');

/**
 * App Routes 
*/
router.get('/view/:id', mainController.viewNote);

module.exports = router;