const app = require('express')(),
	bodyParser = require('body-parser');

app.get('/', (req, res) => {
	res.send({ hi: 'there' });
});

app.listen(5000);
