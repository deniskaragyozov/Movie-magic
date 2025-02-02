import jwt from 'jsonwebtoken';

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

        next();
    }catch(err){
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }
}