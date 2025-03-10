import Movie from '../models/Movie.js';
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
    getOneWithCasts(movieId){
        return this.getOne(movieId).populate('casts'); 
    },
    create(movieData, creatorId){
        const result = Movie.create({
            ...movieData,
            rating: Number(movieData.rating),
            year: Number(movieData.year),
            creator: creatorId,
        });

        return result;
    },
    async attachCast(movieId, castId){
        // First way
        //const movie = await Movie.findById(movieId);
        //if(movie.casts.includes(castId)){
        //    return;
        //}
        //movie.casts.push(castId);
        //await movie.save();

        //return movie;

        // Second way
        return Movie.findByIdAndUpdate(movieId, {$push: {casts: castId}});
    },
    delete(movieId){
        return Movie.findByIdAndDelete(movieId,  {runValidators: true});
    },
    update(movieId, movieData){
        return Movie.findByIdAndUpdate(movieId, movieData, {runValidators: true});
    }
}