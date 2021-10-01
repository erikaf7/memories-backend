const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Entry = require('./models/Entry')
const User = require('./models/User')
const config = require('./config/database');
const app = express();
const PORT = process.env.PORT || 4000;

// mongoose configuration
mongoose.connection.on('error', err => console.log(err.message + ' is Mongo not running?'));
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'));

//connect to database
mongoose.Promise = require('bluebird')
mongoose.connect(config.database, { useNewUrlParser: true });

mongoose.connection.once('open', () => {
  console.log('connected to mongoose!!')
});

//import seeds
const seeds = require('./models/seeds')
const seed_user = require('./models/seed-users');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

//seed route
app.get('/seed-data', (req, res, next) => {
  Entry.insertMany(seeds)
    .then((res) => console.log(res))
    .catch(next)
  res.send('Seed entries inserted.')
})

app.get('/seed-user', (req, res, next) => {
  User.insertMany(seed_user)
    .then((res) => console.log(res))
    .catch(next)
  res.send('Seed users inserted.')
})

app.get('/', (req, res, next) => {
  User.find({})
    .then(entries => res.json(entries))
    .catch(next)
})

/*
Controllers code here
*/
const entriesController = require('./controllers/entries')
app.use('/entries/', entriesController)

const usersController = require('./controllers/users');
app.use('/user/', usersController);

app.listen(PORT, () => {
  console.log(`✅ PORT: ${PORT} 🌟`)
})
