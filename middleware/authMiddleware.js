const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Token is invalid' });
  }
};

const roleCheck = (roles) => (req, res, next) => {
  console.log("Текущая роль пользователя:", req.user.role);
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied. Clients only" });
  }
  next();
};

module.exports = { protect, roleCheck };
