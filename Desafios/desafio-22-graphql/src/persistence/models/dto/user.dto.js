class UserDto {
	constructor({ _id, username }) {
		this.id = `${_id}`;
		this.fullname = `${username}`;
	}
}

export const convertToDto = (users) => {
	if (Array.isArray(users)) {
		const newData = users.map((user) => new UserDto(user));
		return newData;
	} else {
		const newData = new UserDto(users);
		return newData;
	}
};
