var fs = require('fs');
const nodemailer = require('nodemailer');
const mailSetup = require('../config/mailSetup');
const pdf = require('html-pdf');

module.exports = app => {
  app.post('/api/orders', (req, res) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: mailSetup.user,
        pass: mailSetup.pass
      }
    });

    const html = '<h2>Take my hand and we\'ll make it I swear</h2>';
    const options = { format: 'Letter' };

    pdf.create(html, options).toStream((err, stream) => {
      stream.pipe(fs.createWriteStream('order123.pdf'));
    });

    const mailOptions = {
      from: 'jamesgggill@gmail.com',
      to: 'james@jgdev.me',
      subject: 'more messages i say',
      text: 'in life, that is the only way.',
      html,
      attachments: [{filename: 'order123.pdf', content: fs.createReadStream('order123.pdf')}]
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if(err)
        console.log(err)
      else
        console.log(info);
   });
  })
}