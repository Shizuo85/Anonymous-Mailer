const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const mail = require('./routes/mail');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

app.set('view engine', 'pug');
app.set('views', './views');

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

app.use(upload.array());
app.use(express.static('./public'));

app.use('/', mail);

app.use(notFoundMiddleware);
app.use(errorHandler);

const port = process.env.PORT || 3000;

const start = () => {
	app.listen(port, () => {
		console.log(`Server is listening on port ${port}...`);
	});
};

start();
