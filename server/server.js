const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');
const sendMail = require('./mailer/mailer');




const port = process.env.PORT || 8000;

app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.static(path.resolve( __dirname, '../views')));

// const pathView = path.resolve(__dirname, '../views');

// app.use(express.urlencoded({
// 	extended : true
// }));
app.use(bodyParser.json());


app.get('/', function(req, res){
	res.sendFile('index.html');
});
app.post('/sendmail', function(req, res){
	console.log(`params : ${req.params}`);
	console.log(`Body : ${req.body.to}`);

	console.log(sendMail(req.body.to, req.body.subject, req.body.text, req.body.fullName));

	res.status(200).json({
		ok : true,
		data : 'Success'
	});
});
app.listen(port, function(){
	console.log(`Listening in the port ${port}`);
});
