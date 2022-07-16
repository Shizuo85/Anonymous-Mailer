const nodemailer = require('nodemailer');

const sendMail = (req, res, next) => {
	const { from, to, subject, html } = req.body;
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			type: 'OAuth2',
			user: process.env.MAIL_USERNAME,
			pass: process.env.MAIL_PASSWORD,
			clientId: process.env.OAUTH_CLIENTID,
			clientSecret: process.env.OAUTH_CLIENT_SECRET,
			refreshToken: process.env.OAUTH_REFRESH_TOKEN,
		},
	});
	let mailOptions = {
		from,
		to,
		subject,
		html,
	};
	transporter.sendMail(mailOptions, function (err, data) {
		if (err) {
			console.log('Error ' + err);
		} else {
			console.log('Email sent successfully');
			res.send(`<h1>Email sent successfully!</h1><h3><a href="/">Send another mail</a></h3>`);
		}
	});
};
const render = (req, res) => {
	res.render('form');
};

module.exports = {
	sendMail,
	render,
};
