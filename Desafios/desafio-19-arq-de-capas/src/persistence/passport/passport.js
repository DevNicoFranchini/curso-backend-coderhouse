import passport from 'passport';
import bCrypt from 'bcrypt';

import { Strategy as LocalStrategy } from 'passport-local';

import { UserModel } from './../models/user.model.js';

const isValidPassword = (user, password) => {
	return bCrypt.compareSync(password, user.password);
};

const createHash = (password) => {
	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

// Login Strategy
const loginStrategy = () => {
	passport.use(
		'login',
		new LocalStrategy(async (username, password, done) => {
			let user = await UserModel.findOne({ username });

			if (!user) {
				console.log(`User not found with username: ${username}`);
				return done(null, false, { message: 'User not found' });
			}

			if (!isValidPassword(user, password)) {
				console.log('Invalid password');
				return done(null, false, { message: 'Password incorrect' });
			}

			done(null, user);
		})
	);
};

// Signup Strategy
const signupStrategy = () => {
	passport.use(
		'signup',
		new LocalStrategy(
			{
				passReqToCallback: true,
			},
			async (req, username, password, done) => {
				let user = await UserModel.findOne({ username: username });

				if (user) {
					console.log(`El usuario ${username} ya existe`);
					return done(null, false, { message: 'El usuario ya existe' });
				}

				const newUser = new UserModel({
					username: username,
					password: createHash(password),
				});

				await newUser.save();

				return done(null, req.body);
			}
		)
	);
};

// Serialize user
const serializeUser = () => {
	passport.serializeUser(function (user, cb) {
		process.nextTick(function () {
			return cb(null, {
				id: user['_id'],
				username: user.username,
			});
		});
	});
};

// Deserialize user
const deserializeUser = () => {
	passport.deserializeUser(function (user, cb) {
		process.nextTick(function () {
			return cb(null, user);
		});
	});
};

export { loginStrategy, signupStrategy, serializeUser, deserializeUser };
