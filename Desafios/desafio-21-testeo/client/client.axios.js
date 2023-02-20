import axios from 'axios';

const baseURL = 'http://localhost:8080';

const getUsers = async () => {
	try {
		const response = await axios.get(`${baseURL}/api/all-users`);
		console.log(response.data);
	} catch (error) {
		console.log(error);
	}
};

getUsers();
