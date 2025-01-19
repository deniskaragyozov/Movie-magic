import { Router } from 'express';
import movieService from '../services/movie-service.js';

const homeController = Router();

homeController.get('/', (req, res) => {
    const movies = movieService.getAll();
    res.render('home', {movies});
});

homeController.get('/about', (req, res) => {
    res.render('about');
});


export default homeController;