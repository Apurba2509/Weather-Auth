// server/middleware/requireAuth.js
import jwt from "jsonwebtoken";

export default function requireAuth(req, res, next) {
  try {
    let token = req.headers["authorization"] || "";

    // Accept both "Bearer <token>" and raw "<token>"
    if (token.startsWith("Bearer ")) token = token.slice(7).trim();

    if (!token) return res.status(401).json({ msg: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // stash on request for later
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
}
