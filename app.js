require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const urlencodedParser = bodyParser.urlencoded({ extended: true });
const { PORT, DB_URL, LIMIT } = require('./config');

const app = express();
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(cors());
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(urlencodedParser);
app.use(requestLogger);
app.use(helmet());
app.use(rateLimit(LIMIT));
app.use('/', router);
app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT);
