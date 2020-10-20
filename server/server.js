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
app.post('/sendmail', sendMail);



app.listen(port, function(){
	// console.log(`Listening in the port ${port}`);
	console.log('Running...');
});
