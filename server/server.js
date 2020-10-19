const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');
const sendMail = require('./mailer/mailer');




const port = process.env.PORT || 8000;

app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.static(path.resolve( __dirname, '../views')));


app.use(bodyParser.json());


app.get('/', function(req, res){
	res.sendFile('index.html');
});
app.post('/sendmail', function(req, res){
	let status = 500;
	const resMail = sendMail(req.body.to, req.body.subject, req.body.text, req.body.fullName);
	try {
		resMail
			.then(function(data){
				res.status(200).json({
					ok : true,
					data : 'success'
				});
			})
			.catch(function(err){
				console.error(`Error desde el server ${err}`);
				res.status(500).json({
					ok : false,
					data : 'error'
				});
			});
		
	} catch (error) {
		res.status(500).json({
			ok : false,
			data : 'error'
		});
	}
	
	// res.status(200).json({
	// 	ok : true,
	// 	data : 'success'
	// });
});
app.listen(port, function(){
	// console.log(`Listening in the port ${port}`);
	console.log('Running...');
});
