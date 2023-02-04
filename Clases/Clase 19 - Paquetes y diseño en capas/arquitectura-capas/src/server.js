import express from 'express';
import { connectDB } from './config/dbConfig.js';
import { options } from './config/options.js';
import { apiRouter } from './routes/index.routes.js';

const app = express();
const PORT = options.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

connectDB();

app.use('/api', apiRouter);
