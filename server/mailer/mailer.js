const nodeMailer = require('nodemailer');
const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;





module.exports = async function(to, subject, text, fullName){
        // let mailSendCorrectly = false;
        const template = `
            <h1>Trabajo de ${fullName}</h1>
            <ul>
                <li>Nombre completo: ${fullName}</li>
                <li>Correo: ${to}</li>
                <li>Asunto: ${subject}</li>
            </ul>
            <p>Descripcion del mail: ${text}</p>
        `;

        const oauth2Client = new OAuth2(
            process.env.CID,
            process.env.CSECR,
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
            secure : false,
            auth : {
                type : 'OAuth2',
                user : process.env.MAL,
                // pass : process.env.ACC
                clientId : process.env.CID,
                clientSecret : process.env.CSECR,
                refreshToken : process.env.REFTKN,
                accessToken : accessToken

            }
        });
        console.log(`CID ${process.env.CID}`);
    
        const mailOptions = {
            to : process.env.MAL,
            subject : `Trabajo de ${fullName}`,
            text,
            html : template
        };
    
        const mailSendCorrectly = await transport.sendMail(mailOptions);

        // console.log(`Mail sendgene ${mailSendCorrectly}`);
        // console.log(`Mail send id ${mailSendCorrectly.messageId}`);
        // console.log(`Mail info ${mailSendCorrectly.info}`);

        return mailSendCorrectly;
};
