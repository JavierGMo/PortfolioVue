const nodeMailer = require('nodemailer');
const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;





module.exports = function(req, res){
        // let mailSendCorrectly = false;
        const template = `
            <h1>Trabajo de ${req.body.fullName}</h1>
            <ul>
                <li>Nombre completo: ${req.body.fullName}</li>
                <li>Correo: ${req.body.to}</li>
                <li>Asunto: ${req.body.subject}</li>
            </ul>
            <p>Descripcion del mail: ${req.body.text}</p>
        `;

        let mailSendCorrectly = null;
        
        const oauth2Client = new OAuth2(
            process.env.CID ,
            process.env.CSECR ,
            'https://developers.google.com/oauthplayground'
        );
        

        oauth2Client.setCredentials({
            refresh_token : process.env.REFTKN 
        });
        
        //Cuando expire el token esta linea nos va a generar una nueva
        const accessToken = oauth2Client.getAccessToken();

        const transport = nodeMailer.createTransport({
            host : 'smtp.gmail.com',
            port : 465,
            secure : true,
            auth : {
                type : 'OAuth2',
                user : process.env.MAL,
                // pass : process.env.ACC
                clientId : process.env.CID ,
                clientSecret : process.env.CSECR ,
                refreshToken : process.env.REFTKN ,
                accessToken : accessToken

            },
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false
            }
        });
        
        const mailOptions = {
            to : process.env.MAL,
            subject : `Trabajo de ${req.body.fullName}`,
            text : req.body.text,
            html : template
        };
        
        mailSendCorrectly = transport.sendMail(mailOptions, function(err, result){
            if(err){
                console.error(`Error ---> ${err} `);
                res.status(500).json({
                    ok : false,
                    data : 'error'
                });
            }else{
                res.status(200).json({
                    ok : true,
                    data : 'succes'
                });
            }


        });

       
};
