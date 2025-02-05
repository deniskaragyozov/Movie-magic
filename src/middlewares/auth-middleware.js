import jwt from 'jsonwebtoken';
import 'dotenv/config';

const SECRET = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
    //Get token
    const token = req.cookies['auth'];

    if(!token) {
     return next();
    }

    //Validate token
    try{
        const decodedToken = jwt.verify(token, SECRET);

        req.user = decodedToken;
        res.locals.user = decodedToken;

        next();
    }catch(err){
        res.setError('Invalid authentication');
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }
};

export const isAuth = (req, res, next) => {
    if(!req.user){
        res.setError('You must be logged in in order to proceed')
        return res.redirect('/auth/login')
    }

    next();
}