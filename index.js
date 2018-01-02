const app = require('express')(),
	bodyParser = require('body-parser'),
	passport = require('passport'),
	GoogleStrategy = require('passport-google-oauth20').Strategy,
	keys = require('./config/keys'); // this key is really important, so it will not pushed to git

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback' // user will redirect to this is the url after grant us access to their google+ information
		},
		accessToken => {
			console.log(accessToken);
		}
	)
);

app.get(
	'/auth/google',
	passport.authenticate('google', {
		scope: ['profile', 'email']
	})
); // authenticate using GoogleStrategy by calling 'google',
// because inside GoogleStrategy already declared the string 'google'
// a scope is the information that google gives us to access about the user,
// there is quite some scope, can just google it

const PORT = process.env.PORT || 5000;
app.listen(PORT);
