const express = require('express');
const router = express.Router();
const users = require("../controllers/users");

/**
 * Selectors
 */

router.get('/', users.selector.getAll);
router.get('/:id', users.selector.getById);

/**
 * Admin Operations
 */

router.post('/', users.admin.create);
router.delete('/:id', users.admin.delete);

/**
 * Auth Operations
 */

router.post('/login', users.auth.login);
router.get('/auth/logout', users.auth.logout);


module.exports = router;