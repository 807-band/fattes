const express = require('express');
const router = express.Router();
const stations = require("../controllers/stations");

/**
 * Admin operations
 */

router.post('/', stations.admin.create);
router.put('/:id', stations.admin.updateStation);
router.put('/:id/order', stations.admin.updateStationOrder)
router.delete('/:id', stations.admin.delete);

/**
 * Selectors
 */

router.get('/', stations.selector.getAll);
router.get('/sorted', stations.selector.getAllSorted)
router.get('/:id', stations.selector.getById);

/**
 * Information operations
 */

router.put('/:sid/info/:iid', stations.info.updateInfo);

/**
 * Grouping operations
 */

router.post('/:id', stations.grouping.createGrouping);
router.put('/:sid/:gid', stations.grouping.updateGrouping);
router.delete('/:sid/:gid', stations.grouping.deleteGrouping);

/**
 * Item operations
 */

router.post('/:sid/:gid/', stations.item.createItem);
router.put('/:sid/:gid/:iid', stations.item.updateItem);
router.delete('/:sid/:gid/:iid', stations.item.deleteItem);

module.exports = router;
