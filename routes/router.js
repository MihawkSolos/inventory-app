const {Router} = require('express');
const router = Router();
const controller = require('../controllers/inventoryController');

router.get('/', controller.getIndex);




module.exports = router;