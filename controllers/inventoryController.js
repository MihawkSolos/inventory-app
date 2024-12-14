const db = require('../db/queries');


async function getIndex (req, res){
    console.log('will display products here');
    const data = await db.getTable();
    console.log(data);
    res.render('index', {data: data});
};


module.exports = {
    getIndex,
}

