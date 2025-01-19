import {Router} from 'express';
import movies from '../movies.js'; 

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.get('/:movieId/details', (req, res) => {
    res.render('details', {movies});
});

export default movieController;