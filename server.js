const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const books = require('./controllers/books');
const Book = require('./models/Book')
const app = express();
const PORT = process.env.PORT || 4000;

// mongoose configuration
mongoose.connection.on('error', err => console.log(err.message + ' is Mongo not running?'));
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'));

mongoose.connect('mongodb://localhost:27017/scrapbook', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('connected to mongoose!!')
});

//**I had to temporarily comment out these CORS settings--I don't think the configuration is correct.  I could not run any GET requests with it like this. -Alli */

// const whitelist = ['http://localhost:4000']
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

// app.use(cors(corsOptions)) 

app.use(cors())

//import seeds
const seeds = require('./models/seeds')

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//seed route
app.get('/seed-data', (req, res, next) => {
  Book.insertMany(seeds)
    .then((res) => console.log(res))
    .catch(next)
  res.send('Seed entries inserted.')
})

app.get('/', (req, res, next) => {
  Book.find({})
    .then(books => res.json(books))
    .catch(next)
})

/*
Controllers code here
*/
const booksController = require('./controllers/books')
app.use('/books/', booksController)

app.listen(PORT, () => {
  console.log(`✅ PORT: ${PORT} 🌟`)
})
