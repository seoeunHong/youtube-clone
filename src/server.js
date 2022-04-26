import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import rootRouter from './routers/rootRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import {localsMiddleware} from './middlewares';

const app = express();
const logger = morgan('dev'); // return middleware

// Html helper -> express uses pug to return html
app.set('view engine', 'pug');
// Since we run server with package.json the default dir is .../youtube_clone
// If so, .../youtube_clone/views does not exist
// -> change the dir to /.../youtube_clone/src/views
app.set('views', process.cwd() + '/src/views');

// Use middleware globally; Used for whole urls
app.use(logger);

app.use(express.urlencoded({extended: true}));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.DB_URL}),
  }),
);

app.use(localsMiddleware);
app.use('/uploads', express.static('uploads'));
app.use('/', rootRouter);
app.use('/users', userRouter);
app.use('/videos', videoRouter);

export default app;
