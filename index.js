const app = require('express')(),
	bodyParser = require('body-parser');

app.get('/', (req, res) => {
	res.send({ hi: 'there' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
// process.env.PORT is for heroku
// to assign the port later on after we deploy the app.
// 5000 is for localhost on my PC
