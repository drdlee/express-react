const app = require('express')(),
	mongoose = require('mongoose'),
	keys = require('./config/keys'),
	cookieSession = require('cookie-session'),
	passport = require('passport');
require('./models/userModel');
require('./services/passport');

mongoose.connect(keys.mongoURI);

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoute')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
	console.log('connected :5000');
});
