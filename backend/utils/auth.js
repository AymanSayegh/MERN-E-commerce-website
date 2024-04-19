import jwt, { decode } from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).json({ message: "Access Denied" });
    }

    if (token.startsWith("Bearer: ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token Expired" });
      }

      const { id, name, role } = decoded;
      req.user = { id, name, role };
      next();
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
