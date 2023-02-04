import express from 'express';

import { ProductsRouter } from './api/products.routes.js';
import { UserRouter } from './api/user.routes.js';

const router = express.Router();

// GET
router.get('/', (req, res) => {
	res.send('Test');
});

router.use('/users', UserRouter);
router.use('/products', ProductsRouter);

export { router as apiRouter };
