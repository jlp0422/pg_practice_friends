/* eslint-disable */

const app = require('express').Router();
const db = require('../db')

module.exports = app

app.get('/', (req, res, next) => {
  db.getFriends((err, friends) => {
    if (err) return console.log(err)
    res.render('friends', {title: 'Friends', friends})
  })
  // res.render('friends', { title: 'Friends' });
});
