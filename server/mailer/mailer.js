const nodeMailer = require('nodemailer');


module.exports = function(to, subject, text, fullName){
        console.log(`from ${to} subject ${subject} text ${text}`);
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
            service : 'gmail',
            auth : {
                user : 'greffperonahaws@gmail.com',
                pass : 'firusteck Respre*cre'
            }
        });
    
        const mailOptions = {
            // from : '',
            to : 'greffperonahaws@gmail.com',
            subject : `Trabajo de ${fullName}`,
            text,
            html : template
        };
    
        transport.sendMail(mailOptions, function(error, info){
            console.log('Send mail');
            if(error) console.log(`Error send mail ${error}`);
            else console.log(`Success: ${ info.response }`);
        });
};
