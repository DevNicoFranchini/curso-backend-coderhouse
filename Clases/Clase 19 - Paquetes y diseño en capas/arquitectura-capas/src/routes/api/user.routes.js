import express from 'express';

const router = express.Router();

router.get('/all', (req, res) => {
	res.send('Todos los usuarios');
});

export { router as UserRouter };
