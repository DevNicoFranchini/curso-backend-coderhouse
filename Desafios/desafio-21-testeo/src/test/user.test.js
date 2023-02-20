import supertest from 'supertest';

import { expect } from 'chai';

import { app } from './../app.js';

const request = supertest(app);

// Users' tests
describe('Api users tests', () => {
	// Get users test
	it('Get users', async () => {
		const response = await request.get('/api/all-users');
		expect(response.status).equal(200);
		expect(response.body.data).to.eql([]);
	});
});
