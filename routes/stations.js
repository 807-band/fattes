const express = require('express');
const router = express.Router();
const stations = require("../controllers/stations");

/**
 * General station operations
 */

router.get('/', stations.getAll);
router.post('/', stations.create);

/**
 * Station specific operations
 */

router.get('/:id', stations.getById);
router.put('/:id', stations.updateStation);
router.delete('/:id', stations.delete);

/**
 * Information operations
 */

router.put('/:sid/info/:iid', stations.updateInfo);

/**
 * Grouping operations
 */

router.post('/:id', stations.createGrouping);
router.put('/:sid/:gid', stations.updateGrouping);
router.delete('/:sid/:gid', stations.deleteGrouping);

/**
 * Item operations
 */

router.post('/:sid/:gid/', stations.createItem);
router.put('/:sid/:gid/:iid', stations.updateItem);
router.delete('/:sid/:gid/:iid', stations.deleteItem);

module.exports = router;
