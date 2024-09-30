import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import projectRoute from './routes/projects.js';
import userRoute from './routes/user.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import connect from './db/connect.js';

dotenv.config();

const app = express();

app.use(morgan('dev'));

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

app.use(express.static(path.join(process.cwd(), '/client')));
app.use(express.static(path.join(process.cwd(), '/public')));

app.use(express.json());
app.use('/api/project', projectRoute);
app.use('/api/user', userRoute);
app.use(errorHandler);
app.use(notFoundHandler);

const PORT = 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
connect();
