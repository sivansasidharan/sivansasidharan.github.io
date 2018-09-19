var nodemailer = require('nodemailer');

// Create the transporter with the required configuration for Gmail
// change the user and pass !
var transporter = nodemailer.createTransport({
    host: 'smtp-in.ey.net',
    port: 587,
    secureConnection: true,    
    tls: {
       ciphers:'SSLv3'
    },
    auth: {
        user: 'sivan.sasidharan@xe04.ey.com',
        pass: 'KrishnaAug@2018'
    }
});

// verify connection configuration
transporter.verify(function(error, success) {
   if (error) {
        console.log(error);
   } else {
        console.log('Server is ready to take our messages');
   }
});



// setup e-mail data
var mailOptions = {
    from: '"Our Code World " <aipractice@xe04.ey.com>', // sender address (who sends)
    to: 'sivan.sasidharan@xe04.ey.com', // list of receivers (who receives)
    subject: 'Hello', // Subject line
    text: 'Hello world ', // plaintext body
    html: '<b>Hello world </b><br> This is the first email sent with Nodemailer in Node.js' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }

    console.log('Message sent: ' + info.response);
});
