import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import userRoute from './routes/user.js';
import tagRoute from './routes/tags.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import connect from './db/connect.js';

dotenv.config();

const dirname = path.resolve();

const app = express();

app.use(morgan('dev'));
app.use(helmet());

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE_URL,
    }),
    name: process.env.SESSION_NAME,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2,
      httpOnly: false,
      sameSite: true,
    },
    secret: process.env.SECRET,
  }),
);

app.use(express.static(path.join(dirname, '/public')));

app.use(express.json());

app.use('/user', userRoute);
app.use('/tag', tagRoute);
app.use(errorHandler);
app.use(notFoundHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
connect();
