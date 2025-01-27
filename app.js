const express = require('express');
const app = express();
const router = require('./routes/router.js');
const path = require('node:path');

const methodOverride = require('method-override');

app.use(methodOverride('_method'));  // Allow DELETE using the _method field


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

// serving static assets
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
})