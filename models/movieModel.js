const {Schema, model} = require('mongoose');

const movie = new Schema({
    name: {type: String, required: true},
   releaseYear: {type: Date, required: true},
   genre: {type: String, required: true},
},{
    toObject:{
        virtuals:true
    }
});
movie.statics.getmovieByName = async function(name){
 let movie = await this.findOne({name});

 if(movie){
     return movie.toObject();
 } else {
     return false;
 }

}
movie.statics.checkmovieExists = async function(name){
    let exists = await this.exists({name});
    return exists;
}
module.exports = model('movies', movie);