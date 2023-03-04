import express from 'express';
import faker from 'faker';

const router = express.Router();
const { datatype, commerce, image } = faker;

faker.locale = 'es';

// Home products
router.get('/', (req, res) => {
	res.send('Test products');
});

router.get('/randoms', (req, res) => {
	try {
		let products = [];

		for (let i = 0; i < 5; i++) {
			products.push({
				id: datatype.uuid(),
				title: commerce.productName(),
				price: commerce.price(),
				thumbnail: image.image(),
			});
		}

		res.render('products', { products: products });
	} catch (error) {
		res.status(500).send('Se produjo un error en el servidor :(');
	}
});

export { router as ProductsRouter };
