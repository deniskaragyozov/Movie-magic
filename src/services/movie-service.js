import Movie from '../models/Movie.js';
import movies from '../movies.js';
import { v4 as uuid } from 'uuid';

export default {
    getAll(filter = {}){
        //let result = await Movie.find({}).lean();
//
       // if (filter.search){
       //     result = result.filter(movie => movie.title.toLowerCase().includes(filter.search.toLowerCase()));
       // }
//
       // if (filter.genre){
       //     result = result.filter(movie => movie.genre.toLowerCase().includes(filter.genre.toLowerCase()));
       // }
//
       // if (filter.year){
       //     result = result.filter(movie => movie.year === filter.year);
       // }
        return Movie.find({});
    },
    getOne(movieId){
            
    const movie = Movie.findById(movieId);

    return movie;
    },
    create(movieData){
        const newId = uuid();

        movies.push({
            id: newId,
            ...movieData,
            rating: Number(movieData.rating),
        });

        return newId;
    }
}