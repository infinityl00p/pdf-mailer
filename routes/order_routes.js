const nodemailer = require('nodemailer');
const pdf = require('html-pdf');
const mailSetup = require('../config/mailSetup');

module.exports = app => {
  app.post('/api/customers/:cid/orders/:oid', (req, res) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: mailSetup.user,
        pass: mailSetup.pass
      }
    });

    const html = buildHtml(req.body.measurementProfile);

    const options = {
      "height": "10.5in",
      "width": "8in",
      "header": {
        "height": "20mm",
        "contents": '<h1 style="text-align: center;">Wear Modello - Order ' + req.params.oid + '</h1>'
      },
      "footer": {
        "height": "20mm",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
      },
      'paginationOffset': '1'
    };


    pdf.create(html, options, ((err, buffer) => {
      const mailOptions = {
        from: 'jamesgggill@gmail.com',
        to: 'james@jgdev.me',
        subject: 'Order' + req.params.oid,
        text: 'Order' + req.params.oid,
        //html,
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

  function buildHtml(measurementProfile) {
    let html = '<html><head>'
    html += '<style>html, body{ margin: 0; padding: 0; font-weight:500; font-size:7px;}'
    + '.measurements .table-header {letter-spacing: 1px;}'
    + '.measurements {font-family \'trebuchet MS\', Arial, Helvitica, sans-serif;  margin: 0 auto; border-collapse: collapse; width: 80%}'
    + '.measurements td, .measurements th { border: 1px solid #ddd; padding: 8px; text-align: center; }'
    + '.measurements tr:nth-child(even){background-color: #f2f2f2;}'
    + '.measurements th {padding-top: 12px; padding-bottom: 12px; background-color: #c4c47f; color: #fff}'
    + '</style></head>'
    + '<body><table class=\'measurements\'><tr><th class=\'table-header\' colspan=\'2\'>Measurement Profile</th></tr><tr><th>type</th><th>value</th></tr>'
    for(var item in measurementProfile) {
      html += '<tr><td>' + item + '</td><td>' + measurementProfile[item] + ' inches' + '</td></tr>';
    }

    html += '</table><body></html>';
    return html;
  };

}