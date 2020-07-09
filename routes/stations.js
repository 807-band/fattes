const express = require('express');
const router = express.Router();
const stations = require("../controllers/stations");

router.get('/', stations.getAll);

router.post('/', stations.post);

router.delete('/', stations.delete);

router.get('/:id', stations.getById);

router.put('/:id', stations.putById);

router.post('/:id', stations.postGrouping);

router.delete('/:id', stations.deleteGrouping);

module.exports = router;
