import Movie from '../models/Movie.js';
import movies from '../movies.js';
import { v4 as uuid } from 'uuid';

export default {
    getAll(filter = {}){
        let query = Movie.find({});

        if (filter.search){
        //TODO: fix partial case insensitive search
        query = query.where({title: filter.search});
        }

        if (filter.genre){
        //TODO: fix partial case insensitive search
        query = query.where({genre: filter.genre});
        }

        if (filter.year){
            query = query.where({year: Number(filter.year)})
        }
        return query;
    },
    getOne(movieId){

    const movie = Movie.findById(movieId);

    return movie;
    },
    create(movieData){

        movies.push({
            id: newId,
            ...movieData,
            rating: Number(movieData.rating),
        });

        return newId;
    }
}