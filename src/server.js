import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import usersRouter from './routes/users.js';
import notesRouter from './routes/notes.js';
import cors from 'cors';
import './config/database.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/notes', notesRouter);
app.use('/users', usersRouter);


app.listen(8000, () => {
    console.log('Servidor rodando'); 
});