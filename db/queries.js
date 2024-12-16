const pool = require('./pool.js');

async function getFunkoPopTable() {
    const { rows } = await pool.query("SELECT * FROM FunkoPop")
    return rows;
}
async function addProduct(name, category_id, price, imageurl) {
    await pool.query(`
        INSERT INTO FunkoPop (name, category_id, price, imageurl) 
        VALUES
        ('${name}', ${category_id}, ${price}, '${imageurl}');
        `
)}
async function updateProduct(name, category_id, price, imageurl, id) {
    await pool.query(
        `UPDATE FunkoPop 
         SET name = $1, 
             category_id = $2, 
             price = $3, 
             imageurl = $4 
         WHERE id = $5;`,
        [name, category_id, price, imageurl, id]
    );    
}
async function getProductById(id) {
    const {rows} = await pool.query("SELECT * FROM FunkoPop WHERE id = $1;" ,[id])
    return rows[0];
}

async function getCategoryTable() {
    const { rows } = await pool.query("SELECT * FROM Category")
    return rows;
}
async function addCategory(name, description) {
    await pool.query(`
        INSERT INTO Category (name, description) 
        VALUES
        ('${name}', '${description}');
        `
)}
async function getCategoryById(id) {
    const {rows} = await pool.query("SELECT * FROM Category WHERE id = $1;" ,[id])
    return rows[0];
}

async function delCategory(name, description) {
    await pool.query(`
        DELETE FROM Category
        WHERE name = ${name};
        `
)}



module.exports = {
    getFunkoPopTable,
    addProduct,
    getProductById,
    updateProduct,
    getCategoryTable,
    addCategory,
    getCategoryById,
}


