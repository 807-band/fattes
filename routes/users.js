const express = require('express');
const router = express.Router();
const users = require("../controllers/users");

/**
 * Selectors
 */

router.get('/', users.selector.getAll);
router.get('/sections', users.selector.getAllSections);

module.exports = router;