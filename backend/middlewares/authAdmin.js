import jwt from 'jsonwebtoken';

// admin authentication middleware
const authAdmin = (req, res, next) => { 
    try {
        const atoken = req.headers.authorization;
        if (!atoken) {
            return res.json({ success: false, message: "Not Authorized, login Again" });
        }
        const token_decoded = jwt.verify(atoken, process.env.JWT_SECRET);
        if (token_decoded != process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: "Not Authorized, login Again" });
        }
        
        next();
    } 
    
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }      
}

export default authAdmin;