const express = require('express');
const router = express.Router();
const evaluations = require("../controllers/evaluations");

/**
 * User Progress Info
 */

router.get('/u/:userid', evaluations.user.progress);
router.get('/u/:userid/next', evaluations.user.next);

module.exports = router;
