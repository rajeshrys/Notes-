require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

module.exports = transporter;


// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Notes" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const sendRegistrationEmail = async (userEmail, username) => {
  const subject = "Welcome to Notes Website 🎉";

  const text = `Hello ${username},

Your account has been successfully created on Notes Website.

You can now login and start creating your notes.

Thank you for registering!
`;

  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Welcome to Notes Website 🎉</h2>

      <p>Hello <b>${username}</b>,</p>

      <p>Your account has been successfully created.</p>

      <p>You can now login and start creating your notes easily.</p>

      <br/>

      <a 
        href="http://localhost:5173/login"
        style="
          background: #2563eb;
          color: white;
          padding: 10px 18px;
          text-decoration: none;
          border-radius: 6px;
          display: inline-block;
        "
      >
        Login Now
      </a>

      <br/><br/>

      <p>Thank you for joining us ❤️</p>
    </div>
  `;

  await sendEmail(userEmail, subject, text, html);
};

module.exports ={
    sendRegistrationEmail
}

