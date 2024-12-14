const pool = require('./pool.js');

async function getTable() {
    const { rows } = await pool.query("SELECT * FROM figures")
    return rows;
}

async function getNames() {
    const { rows } = await pool.query("SELECT name FROM figures")
    return rows;
}

async function getPrices() {
    const { rows } = await pool.query("SELECT price FROM figures")
    return rows;
}

async function getImageUrl() {
    const { rows } = await pool.query("SELECT imageUrl FROM figures")
    return rows;
}

module.exports = {
    getTable,
    getNames,
    getPrices,
    getImageUrl,
}


