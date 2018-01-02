const app = require('express')(),
	bodyParser = require('body-parser'),
	passport = require('passport'),
	GoogleStrategy = require('passport-google-oauth20').Strategy,
	keys = require('./config/keys');

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		},
		(accessToken, refreshToken, profile, done) => {
			console.log('access token', accessToken);
			console.log('refresh token', refreshToken);
			console.log('profile', profile);
		} // so here is the action / data we get after user grant us access to their information
	)
);

app.get(
	'/auth/google',
	passport.authenticate('google', {
		scope: ['profile', 'email']
	})
);

app.get('/auth/google/callback', passport.authenticate('google'));
// here is the redirected route after user grant us access to their information

const PORT = process.env.PORT || 5000;
app.listen(PORT);
