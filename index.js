import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import configurePassport from './config/passport.js';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js'; // <-- users.js correct
import jobRoutes from './routes/jobs.js';
import appRoutes from './routes/applications.js';
import uploadRoutes from './routes/upload.js';

dotenv.config();

console.log('GOOGLE_CLIENT_ID =', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET =', process.env.GOOGLE_CLIENT_SECRET);
console.log('GOOGLE_CALLBACK_URL =', process.env.GOOGLE_CALLBACK_URL);

const app = express();
configurePassport(app);

app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(morgan('dev'));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(process.cwd(), 'src', 'uploads')));

app.use(cors({ origin: process.env.CLIENT_URL, credentials: false }));

app.get('/', (_req, res) => res.json({ status: 'ok' }));

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/jobs', jobRoutes);
app.use('/applications', appRoutes);
app.use('/upload', uploadRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log('API running on ' + PORT));
  })
  .catch((err) => {
    console.error('Mongo error', err);
    process.exit(1);
  });
