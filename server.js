const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// mongoose configuration
mongoose.connection.on('error', err => console.log(err.message + ' is Mongo not running?'));
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'));


mongoose.connect('mongodb://localhost:27017/bookmarks', { useNewUrlParser: true})
mongoose.connection.once('open', () => {
    console.log('connected to mongoose!')
  })
/*
Mongoose conection code here, waiting on the set up of the database
*/

//importing schema
const Book = require('./models/Book')

//cors
const whitelist = ['http://localhost:3000']
const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }

  app.use(cors(corsOptions)) // all routes are now exposed, sometimes you just want to limit access (ie OMDB - it's ok for anyone to see the movies, but you don't want just anyone updating the movies)


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Hello, World!');

})

/*
Seed route here
*/

/*
Controllers code here
*/
const booksController = require('./controllers/books')
app.use('/books/', booksController)


app.listen(PORT, () => {
    console.log(`✅ PORT: ${PORT} 🌟`)
})
