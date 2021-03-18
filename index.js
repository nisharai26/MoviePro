const mongoose = require('mongoose');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const MovieModel = require('./models/movieModel');
mongoose.connect('mongodb+srv://nisha:passwordabc123@cluster0.kstue.mongodb.net/movieName?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const app = express();
app.use(express.static(path.join(__dirname ,'public')));
app.engine('hbs',hbs({
    extname:'hbs'
}));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.render('index');
});
app.post('/',(req,res)=>{
const {name,releaseYear,genre}=req.body;
console.log(genre);
const movie = new MovieModel({
    
    name,
  releaseYear:new Date(releaseYear),
  genre
})
movie.save();
    res.render('index');
});

app.get('/movie',(req,res)=>{
    res.render('movie');
});
app.post('/movie',async(req,res)=>{
    // let movie = await MovieModel.getmovieByName(req.body.name);
     MovieModel.find( { $or:[  {'name':req.body.name}, {'releaseYear':req.body.releaseYear},{'genre':req.body.genre} ]}, 
  function(err,docs){
      let movies = docs.map(movie=>movie.toObject());
      
console.log(movies);
    if(!err) res.render('movie',{movies});
});
    // if(movie){
    //     res.render('movie',{movie})
    // } else {
    //     res.render('movie',{err:'movie not found'});
    // }
// res.render('movie');
});
app.listen(3000,()=>{
    console.log("http://localhost:3000");
});
