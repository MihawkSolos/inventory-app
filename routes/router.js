const {Router} = require('express');
const router = Router();
const controller = require('../controllers/inventoryController');

router.get('/', controller.getHome);
router.get('/products', controller.getProducts);
router.get('/categories', controller.getCategories);
router.get('/new-category', controller.getNewCategory);
router.post('/new-category', controller.postNewCategory);
router.get('/new-product', controller.getNewProduct);
router.post('/new-product', controller.postNewProduct);
router.get('/:type/update/:id', controller.getUpdate);
router.post('/:type/update/:id', controller.postUpdate);
//router.get('/:type/update/:id', controller.getCategoryUpdate);
//router.get('/update/:id'))

module.exports = router;