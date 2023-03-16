import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    /*  grabbing token from frontend req header*/

    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startWith("Bearer")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    res.status(500).json({ error: err.message });
    req.user = verified;
    next();
  }
};
