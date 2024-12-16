#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
  DROP TABLE IF EXISTS figures, FunkoPop, Category;

  CREATE TABLE Category (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

CREATE TABLE FunkoPop (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) NOT NULL,
    category_id INTEGER NOT NULL REFERENCES Category(id) ON DELETE CASCADE,
    price NUMERIC(10, 2) NOT NULL,
    imageurl VARCHAR ( 255 )
);

  INSERT INTO Category (name, description) 
  VALUES
    ('Naruto', 'Naruto Funko Pops'),
    ('One Piece', 'One Piece Funko Pops');

  INSERT INTO FunkoPop (name, category_id, price, imageurl)
  VALUES 
    ('Luffy Gear Five', 2, 15.00, 'https://m.media-amazon.com/images/I/71V7SWoZKKL.jpg'),
    ('Deluxe Buggy The Clown', 2, 34.99, 'https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dwf22d90a7/images/funko/upload/768666_OP_BuggyTheClown_POP_DELUXE_GLAM-1-FALLCON-WEB.png?sw=800&sh=800'),
    ('Katakuri', 2, 11.99, 'https://www.fugitivetoys.com/cdn/shop/files/katakuri.jpg?v=1716944390');
    
`


// const SQL = `
// DROP TABLE IF EXISTS figures;

// CREATE TABLE IF NOT EXISTS figures (
//   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
//   name VARCHAR ( 255 ),
//   price DECIMAL(10, 2),
//   imageurl VARCHAR ( 255 )
// );

// INSERT INTO figures (name, price, imageUrl) 
// VALUES
//   ('Luffy Gear Five', 15.00, 'https://m.media-amazon.com/images/I/71V7SWoZKKL.jpg'),
//   ('Deluxe Buggy The Clown', 34.99, 'https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dwf22d90a7/images/funko/upload/768666_OP_BuggyTheClown_POP_DELUXE_GLAM-1-FALLCON-WEB.png?sw=800&sh=800'),
//   ('Katakuri', 11.99, 'https://m.media-amazon.com/images/I/71wKVlkstoL._AC_UF894,1000_QL80_.jpg');
// `;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: "postgresql://chaos:Uchiha0603@localhost:5432/figures",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
