import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import usersRouter from './routes/users';
import notesRouter from './routes/notes';
import { errorMiddleware } from './middlewares/error';
import { IUserDocument } from './models/types/User';
import './database/database';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/notes', notesRouter);
app.use('/users', usersRouter);

app.use(errorMiddleware);


declare global {
    namespace Express {
        interface Request {
            user?: IUserDocument | null;
        }
    }
}


app.listen(8000, () => {
    console.log('Servidor rodando'); 
});