import express from 'express';
import passport from 'passport';

const router = express.Router();

// Signup
router.get('/signup', (req, res) => {
	if (req.isAuthenticated()) {
		res.redirect('/');
	} else {
		res.render('signup');
	}
});

router.post(
	'/',
	passport.authenticate('signup', {
		successRedirect: '/',
		failureRedirect: '/signupError',
	}),
	(req, res) => {
		res.redirect('/');
	}
);

// Signup error
router.get('/signupError', (req, res) => {
	res.render('signupError');
});

export { router as UserRouter };
