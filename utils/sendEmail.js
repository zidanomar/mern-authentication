const sgMail = require('@sendgrid/mail');

const sendEmail = (options) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text,
    text: 'and easy to do anywhere, even with Node.js',
  };

  sgMail
    .send(mailOptions)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = sendEmail;
