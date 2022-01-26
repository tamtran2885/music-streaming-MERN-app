import express from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import {usersRoutes} from './routes/login.routes.js'

const app = express();

//?settings

app.set('port', process.env.PORT || 4000)

//?middlewares

app.use(morgan('dev'));
app.use(express.json());

//?routes

app.use('/api/users', usersRoutes);

//?static files

//app.use(express.static(path.join(__dirname, 'public')));

//?port

app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});