const express = require('express');
const router = express.Router();
const users = require("../controllers/users");

/**
 * Selectors
 */

router.get('/', users.selector.getAll);
router.get('/:id', users.selector.getById);
router.get('/:id/permissions', users.selector.getPermissions);

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
router.post('/password', users.auth.updatePassword);


module.exports = router;