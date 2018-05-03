const nodemailer = require('nodemailer');
const pdf = require('html-pdf');
const mailSetup = require('../config/mailSetup');

module.exports = app => {
  app.post('/api/orders', (req, res) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: mailSetup.user,
        pass: mailSetup.pass
      }
    });

    let html = '<table>';
    for(var item in req.body.measurementProfile) {
      html += '<tr><td>' + item + '</td><td>' + req.body.measurementProfile[item] + '</td></tr>';
    }

    html += '</table><tr><th>type</th><th>value</th></tr>';

    const options = { format: 'Letter' };


    pdf.create(html, options, ((err, buffer) => {
      const mailOptions = {
        from: 'jamesgggill@gmail.com',
        to: 'james@jgdev.me',
        subject: 'more messages i say',
        text: 'in life, that is the only way.',
        html,
        attachments: [{filename: 'order123.pdf', path: buffer.filename }]
      };

      transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
    }))
  })
}