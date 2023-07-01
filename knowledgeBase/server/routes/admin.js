const express = require('express');
const router = express.Router();
const mainController = require('../controllers/admin');

/**
 * App Routes 
*/
router.get('/admin/', mainController.adminAuth);
router.post('/admin/user', mainController.listUsers);
router.get('/admin/notes/:id', mainController.viewNote);
router.get('/deleteUser/:id', mainController.deleteNote);

module.exports = router;