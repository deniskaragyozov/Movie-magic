import express from 'express';
import handlebars from 'express-handlebars';
import expressSession from 'express-session';
import routes from './routes.js';
import showRatingHelper from './helpers/rating-helper.js';
import mongoose from 'mongoose';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { authMiddleware } from './middlewares/auth-middleware.js';
import { tempData } from './middlewares/temp-data-middleware.js';

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
app.use(cookieParser());
app.use(expressSession({
    secret: 'okjhfasl;kfoi231u9u90g0ieshb12545ojhnkofjsa',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
         httpOnly: true
    }
}));
app.use(tempData);
app.use(authMiddleware);

//setup rotues
app.use(routes);

//start server
app.listen(5000, () => console.log('Server is listening on http://localhost:5000...'));