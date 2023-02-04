import express from 'express';
import { UserRouter } from './api/user.routes.js';

const router = express.Router();

router.use('/users', UserRouter);

export { router as apiRouter };
