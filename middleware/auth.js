// Imports jwt library
const jwt = require('jsonwebtoken');

// Creates authentification function to protect endpoint
const isAuthenticated = async (req, res, next) => {
    try {
        // Retrieves the token from the header
        const token = await req.headers.authorization.split(" ")[1];
        // Checks that the token matches the supposed origin
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const user = decodedToken;
        req.user = user;
        // Terminates the middleware cycle
        next();
    } catch (error) {
       res.status(401).json({ error: "Invalid request"})
    }
}

module.exports = isAuthenticated;