const nodemailer = require('nodemailer');
const config = require('../local.settings.json').emailCredentials;

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: config
});

let mailOptions = {
  from: 'testerniklas1@gmail.com',
  to: 'ppbvb.digi@cbs.dk',
  subject: 'Sending Email using Node.js',
  text: 'Hello!'
};


module.exports = function (context, myTimer) {
    let timeStamp = new Date().toISOString();

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        context.log(error);
      } else {
        context.log('Email sent: ' + info.response);
      }
    });

    if (myTimer.isPastDue)
    {
        context.log('JavaScript is running late!');
    }
    context.log('JavaScript timer trigger function ran!', timeStamp);
};