import {Router} from 'express';

import movieService from '../services/movie-service.js';
import castService from '../services/cast-service.js';
import { isAuth } from '../middlewares/auth-middleware.js';
import { getErrorMessage } from '../utils/error-utils.js';

const movieController = Router();

movieController.get('/search', async (req, res) => {
    const filter = req.query;
    const movies = await movieService.getAll(filter);

    res.render('search', { movies, filter });
});

movieController.get('/create', isAuth, (req, res) => {
    res.render('create');
});

movieController.post('/create', isAuth, async (req, res) => {
    const newMovieData = req.body;
    const userId= req.user?.id;

    await movieService.create(newMovieData, userId);

    res.redirect('/');  
});

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOneWithCasts(movieId); 
    const isCreator = movie.creator?.equals(req.user?.id);

    res.render('movie/details', { movie, isCreator });
});

movieController.get('/:movieId/attach-cast', isAuth, async(req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId);
    const casts = await castService.getAll({exclude: movie.casts})
    res.render('movie/attach-cast', { movie, casts } );
})

movieController.post('/:movieId/attach-cast', isAuth, async(req, res) => {
    const castId = req.body.cast;
    const movieId = req.params.movieId;
    await movieService.attachCast(movieId, castId);

    res.redirect(`/movies/${movieId}/details`);
});

movieController.get('/:movieId/delete', isAuth, async(req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId);

    if(!movie.creator?.equals(req.user?.id)){
        res.setError('You are not the movie creator!');
        return res.redirect('/404');
    }

    await movieService.delete(movieId);

    res.redirect('/');
});

movieController.get('/:movieId/edit', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId);

    const categories = getCategoriesViewData(movie.category);
    
    res.render('movie/edit', { movie, categories } );
});

movieController.post('/:movieId/edit', isAuth, async (req, res) => {
    const movieData = req.body;
    const movieId = req.params.movieId;

    // TODO: check if creator

    try{
        await movieService.update(movieId, movieData);
    }catch(err){
        const categories = getCategoriesViewData(movie.category);

        return res.render('movie/edit', {movie: movieData, categories, error: getErrorMessage(err)});
    }

    res.redirect(`/movies/${movieId}/details`)
});

function getCategoriesViewData(category){
    const categoriesMap = {
        'tv-show': 'TV Show',
        'animation': 'Animation' ,
        'movie': 'Movie',
        'documentary': 'Documentary' ,
        'short-film': 'Short Film' ,
    };

    const categories = Object.keys(categoriesMap).map(value => ({
        value,
        label: categoriesMap[value],
        selected: value === category ? 'selected' : '',
    }));

    return categories;
}

export default movieController;