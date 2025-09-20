
import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
<<<<<<< HEAD
  
=======

>>>>>>> b099cc6c134b382c086cfb6eebf55361afbbdc3a
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

<<<<<<< HEAD
    
=======
>>>>>>> b099cc6c134b382c086cfb6eebf55361afbbdc3a
    const decode = jwt.verify(token, process.env.SECRET_KEY);

    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

<<<<<<< HEAD
   
=======

>>>>>>> b099cc6c134b382c086cfb6eebf55361afbbdc3a
    req.id = decode.userId;
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res.status(401).json({
      message: "Authentication failed",
      success: false,
    });
  }
};


export default isAuthenticated;
