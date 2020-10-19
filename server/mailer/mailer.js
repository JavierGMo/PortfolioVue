const nodeMailer = require('nodemailer');


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
        const transport = nodeMailer.createTransport({
            host : 'smtp.gmail.com',
            port : 465,
            secure : true,
            auth : {
                user : process.env.MAL,
                pass : process.env.ACC
            }
        });
    
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
