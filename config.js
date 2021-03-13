const {
  PORT = 3000, NODE_ENV, JWT_SECRET, BD,
} = process.env;
const DB_URL = NODE_ENV === 'production' ? BD : 'mongodb://localhost:27017/moviesdb';
const SECRET_JWT = NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key';

// Конфигурация для express-rate-limit
const LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
};

module.exports = {
  PORT, DB_URL, SECRET_JWT, LIMIT,
};
