import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
      origin: '*',
      credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

import { authRoutes } from './routes/authRoutes.js';
import { noteRoutes } from './routes/noteRoutes.js';


app.use('/api/v1/users', authRoutes);
app.use('/api/v1/note', noteRoutes);

export { app };