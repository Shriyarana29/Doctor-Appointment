import jwt from 'jsonwebtoken';

// admin authentication middleware
const authUser = (req, res, next) => { 
    try {
        const token = req.headers;
        if (!token) {
            return res.json({ success: false, message: "Not Authorized, login Again" });
        }
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decoded.id; // Assuming you want to attach userId to the request body
        next();
    } 
    
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }      
}

export default authAdmin;