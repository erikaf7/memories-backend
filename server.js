const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Entry = require('./models/Entry')
const app = express();
const PORT = process.env.PORT || 4000;

// mongoose configuration
mongoose.connection.on('error', err => console.log(err.message + ' is Mongo not running?'));
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'));

mongoose.connect('mongodb://localhost:27017/scrapbook', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('connected to mongoose!!')
});

//import seeds
const seeds = require('./models/seeds')

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

app.get('/', (req, res, next) => {
  Entry.find({})
    .then(entries => res.json(entries))
    .catch(next)
})

/*
Controllers code here
*/
const entriesController = require('./controllers/entries')
app.use('/entries/', entriesController)

app.listen(PORT, () => {
  console.log(`✅ PORT: ${PORT} 🌟`)
})
