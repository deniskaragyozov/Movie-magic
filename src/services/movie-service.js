import movies from '../movies.js'; 

export default {
    findOne(movieId){
    //TODO: Solution if a movie is missing
    
    const movie = movies.find(movie => movie.id === movieId);

    return movie;
    }
}