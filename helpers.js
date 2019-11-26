const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

async function createHashedPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
}

async function sendEmailWithResetInstructions(email, res) {
    const transporter = createTransporter();
    await transporter.sendMail({
        from: 'aleksandar_radulovic@rocketmail.com',
        to: `${email}`, 
        subject: 'The Tasker',
        text: 'Reset account',
        html: `<a href=${"http://localhost:3000/user/login/reset"}>Click to reset your account</a>`
    }, (error, info) => {
        if (error) {
            return res.send({ error: error.message });
        } else {
            console.log("Message sent: " + info.response);
            socketTimeout: 30 * 1000
            transporter.close();
            res.send({ emailSent: 'Email sent' });
        }
    });
}

const createTransporter = () => {
    return nodemailer.createTransport({
        host: 'smtp.mail.yahoo.com',
        port: 465,
        secure: true,
        auth: {
            user: 'aleksandar_radulovic@rocketmail.com',
            pass: 'ljmifrgulxzbjqoy'
        },
        tls: {
            rejectUnauthorized: false
        }
    });
}

module.exports = { createHashedPassword, sendEmailWithResetInstructions };
