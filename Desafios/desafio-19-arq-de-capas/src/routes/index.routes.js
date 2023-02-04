import express from 'express';

import { ProductsRouter } from './api/products.routes';
import { UserRouter } from './api/user.routes';

const router = express.Router();

router.use('/users', UserRouter);
router.use('/products', ProductsRouter);

export { router as apiRouter };
