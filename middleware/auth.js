// Imports jwt library
import jwt from 'jsonwebtoken';


const isAuthenticated = async (req, res, next) => {
    try {
        const token = await req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const user = decodedToken;
        req.user = user;
        next();
    } catch (error) {
       res.status(401).json({ error: "Invalid request"})
    }
}

export default isAuthenticated;