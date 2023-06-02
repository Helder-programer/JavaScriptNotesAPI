import express from 'express';
import logger from 'morgan';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import 'express-async-errors';

import usersRouter from './routes/users.js';
import notesRouter from './routes/notes.js';
import { errorMiddleware } from './middlewares/error.js';
import './config/database.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/notes', notesRouter);
app.use('/users', usersRouter);

app.use(errorMiddleware);


app.listen(8000, () => {
    console.log('Servidor rodando'); 
});