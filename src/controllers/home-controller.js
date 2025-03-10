import { Router } from 'express';
import movieService from '../services/movie-service.js';

const homeController = Router();

homeController.get('/', async (req, res) => {
    //const movies = await movieService.getAll().lean(); //Without runtimeOptions: { allowProtoPropertiesByDefault: true }
    const movies = await movieService.getAll();
    
    res.render('home', { movies });
});

homeController.get('/about', (req, res) => {
    res.render('about', {pageTitle: 'About'});
});

export default homeController;