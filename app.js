
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const actors = require('./routers/actor');
const movies = require('./routers/movie');

const app = express();

app.listen(8080);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/movies', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');

});

//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll); // retrive all actors  O
app.post('/actors', actors.createOne); // add a new actor  O
app.get('/actors/:id', actors.getOne); // retrive an actor by ID O
app.put('/actors/:id', actors.updateOne); // update an actor  O
app.post('/actors/:id/movies', actors.addMovie); // add a movie to an actor's movie list  O
app.delete('/actors/:id', actors.deleteOne); // delete an actor by ID  O
app.delete('/actors/:id/allmovies', actors.deleteOneandMovie); // delete an actor and all relevent movies O
app.delete('/actors/:aid/:mid', actors.deleteMovieFromActor); // delete a movie from an actor's movies O


//Movie RESTFul  endpoints
app.get('/movies', movies.getAll); // retrive all movies  O
app.post('/movies', movies.createOne); // add a new movie  O
app.get('/movies/:id', movies.getOne); // retrive a movie by ID  O
app.put('/movies/:id', movies.updateOne); // update a movie  O
app.delete('/movies/:id', movies.deleteById); // delete a movie by ID  O
app.delete('/movies/:mid/:aid', movies.deleteActorFromMovie); // delete an actor from a movie's actors O
app.put('/movies/:mid/:aid', movies.addActor); // add an actor to movie  O
app.get('/movies/:year2/:year1', movies.getAllYear); // get all movies between year1 and year2  O
app.delete('/movies', movies.deleteAllYear); // delete all movies between year1 and year2  O