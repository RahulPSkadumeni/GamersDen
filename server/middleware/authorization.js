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

export const authMiddleware = async (req, res, next) => {
  console.log("here>>>>>>>>>>>>>>>>>>");
  try {
    console.log(req.headers.authorization);
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token);
    if (!token) return res.status(401).json({ msg: "Token not found" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded", decoded.id);
    req.body.userId = decoded.id;

    console.log("userId", req.body.userId);
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
