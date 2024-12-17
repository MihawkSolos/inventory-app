const db = require('../db/queries');



async function getHome(req, res) {
    //res.send('nothing going to be on this home page until user clicks either categories or products.');
    res.render('homePage');
}

async function getProducts(req, res) {
    //res.send('products will be displayed here');
    const data = await db.getFunkoPopTable();
    res.render('products', {data:data});
}

async function getCategories(req, res) {
    //res.send('different categoreis will be here');
    const data = await db.getCategoryTable();
    res.render('categories', {data: data});
}

async function getNewCategory(req, res) {
    //res.send('will provide input for a new category');
    res.render('newCategory');
}

async function postNewCategory(req,res) {
    const {name, description} = req.body;
    await db.addCategory(name,description);
    res.redirect('/categories');
}

async function getNewProduct(req, res) {
    //res.send('will provide input for new product');
    const categories = await db.getCategoryTable();
    res.render('newProduct', {categories: categories});
}
async function postNewProduct(req,res) {
    const {name, category_id, price, imageurl} = req.body;
    await db.addProduct(name, category_id, price, imageurl);
    res.redirect('/products');
}

// update 
async function getUpdate(req, res) {

    const {type, id } = req.params;

    if(type === 'products'){
        const product = await db.getProductById(id);
        const categories = await db.getCategoryTable();

        res.render('update', {product: product, categories: categories, type: type});
    }
    else if(type === 'categories'){
        const category = await db.getCategoryById(id);

        res.render('update', {category: category, type: type})
    }
}
async function postUpdate(req, res) {
    const { type, id } = req.params;
    if(type === 'products'){
        const {name, price, imageurl, category_id} = req.body;
        //console.log(id);
        //console.log(name, price, imageurl, category_id);
        await db.updateProduct(name, category_id, price, imageurl, id);
        res.redirect('/products');
    }
    else if (type === 'categories'){
        const {name, description} = req.body;
        await db.updateCategory(name, description, id);

        res.redirect('/categories')
    }
}

async function getDelete(req, res) {
    const { type, id } = req.params;
    if(type === 'products'){
        const product = await db.getProductById(id);
        
        res.render('delete', {type, id, product});
    } 
    else if (type === 'categories'){
        const category = await db.getCategoryById(id);
        
        res.render('delete', {type, id, category});
    }
}
async function postDelete(req, res) {
    const { type, id } = req.params;
    if (type === 'products'){
        console.log(id);
        await db.delProductById(id);
        res.redirect('/products');
    }
    else if (type === 'categories'){
        console.log(id);
        await db.delCategoryById(id);
        res.redirect('/categories');
    }
}

async function getIndex (req, res){
    console.log('will display products here');
    const data = await db.getTable();
    console.log(data);
    res.render('index', {data: data});
};

module.exports = {
    getHome,
    getProducts,
    getCategories,
    getNewCategory,
    getNewProduct,
    postNewCategory,
    postNewProduct,
    getUpdate,
    postUpdate,
    getDelete,
    postDelete,
    getIndex,
}

