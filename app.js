const express = require('express');
const app = express();
const bodyPaser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyPaser.json());

let Genre = require('./models/genre');
let Book = require('./models/book'); 

// Connect to Mongoose
mongoose.connect('mongodb://localhost/booksite');
const db = mongoose.connection;

app.get('/', function(req, res){
    res.send('Hello World!');
});

app.get('/api/genres', function(req, res){
    Genre.getGenres(function(err,genres){
        if(err){
            console.log(err);
        }
        res.json(genres);
    });
});

app.post('/api/genres', function(req, res){
    let genre = req.body;
    Genre.addGenres(genre, function(err, genre){
        if(err){
            console.log(err);
        }
        res.json(genre);
    });
});

app.put('/api/genres/:_id', function(req, res){
    let id = req.params._id;
    let genre = req.body;
    Genre.updateGenre(id, genre, {}, function(err, genre){
        if(err){
            console.log(err);
        }
        res.json(genre);
    });
});

app.delete('/api/genres/:_id', function(req, res){
    let id = req.params._id;
    let genre = req.body;
    Genre.deleteGenre(id, function(err, genre){
        if(err){
            console.log(err);
        }
        res.json(genre);
    });
});

app.get('/api/books', function(req, res){
    Book.getBooks(function(err,books){
        if(err){
            console.log(err);
        }
        res.json(books);
    });
});

app.get('/api/books/:_id', function(req, res){
    Book.getBookById(req.params._id, function(err,book){
        if(err){
            console.log(err);
        }
        res.json(book);
    });
});

app.post('/api/books', function(req, res){
    let book = req.body;
    Book.addBook(book, function(err, book){
        if(err){
            console.log(err);
        }
        res.json(book);
    });
});

app.put('/api/books/:_id', function(req, res){
    let id = req.params._id;
    let book = req.body;
    Book.updateBook(id, book, {}, function(err, book){
        if(err){
            console.log(err);
        }
        res.json(book);
    });
});

app.delete('/api/books/:_id', function(req, res){
    let id = req.params._id;
    let book = req.body;
    Book.deleteBook(id, function(err, book){
        if(err){
            console.log(err);
        }
        res.json(book);
    });
});

app.listen(3000);
console.log('Running on Port 3000 ...');