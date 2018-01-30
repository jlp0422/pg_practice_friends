const express = require('express');
const app = express();
const path = require('path')
const db = require('./db');
const nunjucks = require('nunjucks');
nunjucks.configure({ noCache: true });

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));

app.use((req, res, next) => {
  res.locals.path = req.url;
  next();
})

app.use('/friends', require('./routes/friends'));

app.get('/', (req, res, next) => {
  res.render('index', {title: 'Home'})
});

// app.get('/friends', (req, res, next) => {
//   res.render('friends', {title: 'Friends'})
// })

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

// app.get('/friends', (req, res, next) => {
//   db.getFriends((err, friends) => {
//     if (err) next(err);
//     res.send(friends);
//   })
// })

db.sync((err, result) => {
  if (err) return console.log(err);
  // console.log(`table has been created!`);

  db.getFriends((err, friends) => {
    if (err) console.log(err);
    console.log(`I have ${friends.length} friends!`);

    db.seed((err, result) => {
      if (err) return console.log(err);
      // console.log(`friends have been added!`);

      db.getFriends((err, friends) => {
        if (err) return console.log(err);
        console.log(`I have ${friends.length} friends!`);

        db.getFriend(5, (err, friend) => {
          if (err) return console.log(err);
          console.log(`My best friend is ${friend.first_name} ${friend.last_name}`);
        })
      })
    });
  })
});
