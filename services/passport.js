const passport = require('passport'),
	GoogleStrategy = require('passport-google-oauth20').Strategy,
	keys = require('../config/keys'),
	mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
});
passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleId: profile.id }).then(existingUser => {
				if (existingUser) {
					done(null, existingUser);
				} else {
					new User({ googleId: profile.id, email: profile.emails[0].value }).save().then(user => done(null, user)); // remember the 'user' here need to be the same as serialize 'user'
					console.log(profile);
				}
			});
		}
	)
);
