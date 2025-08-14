import jwt from 'jsonwebtoken';

// admin authentication middleware
const authDoctor = (req, res, next) => { 
    try {
        const dtoken = req.headers;
        if (!dtoken) {
            return res.json({ success: false, message: "Not Authorized, login Again" });
        }
        const token_decoded = jwt.verify(dtoken, process.env.JWT_SECRET);
        req.body.docId = token_decoded.id; // Assuming you want to attach userId to the request body
        next();
    } 
    
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }      
}

export default authDoctor;