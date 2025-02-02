import express from 'express';
import handlebars from 'express-handlebars';
import routes from './routes.js';
import showRatingHelper from './helpers/rating-helper.js';
import mongoose from 'mongoose';
import 'dotenv/config';

const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
runtimeOptions: {
    allowProtoPropertiesByDefault: true,
},
    helpers: {
        showRating: showRatingHelper
    }
}));

//db config
try{
    const defaultUri = 'mongodb://localhost:27017/magic-movies-workshop'
    await mongoose.connect(process.env.DATABASE_URI ?? defaultUri);

    console.log('DB Connected Successfully');
}catch(err){

    console.log('Can not connect to DB');
    console.error(err.message);
}


//handlebars config
app.set('view engine', 'hbs');
app.set('views', './src/views');

//express config
app.use('/static', express.static('src/public'));
app.use(express.urlencoded({extended: false}));  //Learn express to parse form data

//setup rotues
app.use(routes);

//start server
app.listen(5000, () => console.log('Server is listening on http://localhost:5000...'));