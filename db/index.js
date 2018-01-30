/* eslint-disable */

const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
// console.log(process.env.DATABASE_URL)

client.connect();

const SQL_CREATE = `
  DROP TABLE IF EXISTS friends;
  CREATE TABLE friends (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    known VARCHAR(255)
  );
`;

const SQL_SEED = `
  INSERT INTO friends (first_name, last_name, known) VALUES ('Steve', 'Collins', 'College');
  INSERT INTO friends (first_name, last_name, known) VALUES ('Andrew', 'Greif', 'College');
  INSERT INTO friends (first_name, last_name, known) VALUES ('Dave', 'Ehrlich', 'College');
  INSERT INTO friends (first_name, last_name, known) VALUES ('Luke', 'Andrews', 'College');
  INSERT INTO friends (first_name, last_name, known) VALUES ('Nick', 'Palumbo', 'High School');
  INSERT INTO friends (first_name, last_name, known) VALUES ('Manish', 'Rao', 'High School');
  INSERT INTO friends (first_name, last_name, known) VALUES ('John', 'Capecelatro', 'High School');
  INSERT INTO friends (first_name, last_name, known) VALUES ('Jake', 'Love', 'High School');
`;

const sync = (cb) => {
  client.query(SQL_CREATE, cb);
};

const seed = (cb) => {
  client.query(SQL_SEED, cb)
};

const getFriends = (cb) => {
  client.query(`SELECT * FROM friends`, (err, result) => {
    if (err) return cb(err);
    cb(null, result.rows)
  });
};

const getFriend = (id, cb) => {
  client.query(`SELECT * FROM friends WHERE id=$1`, [id], (err, result) => {
    if (err) return cb(err);
    cb(null, result.rows.length ? result.rows[0] : null)
  })
}

module.exports= {
  sync,
  seed,
  getFriends,
  getFriend
}
