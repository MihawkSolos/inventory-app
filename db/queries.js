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

async function delCategory(name, description) {
    await pool.query(`
        DELETE FROM Category
        WHERE name = ${name};
        `
)}



module.exports = {
    getFunkoPopTable,
    addProduct,
    getCategoryTable,
    addCategory,
}


