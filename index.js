const express = require('express');
const bodyParser = require('body-parser');
const sendMail = require('./sendMail');
const session = require('express-session');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: '47e01e52a3d8af80404a098bf41d2e4495780e3db3275887485752fb04694df4',
    resave: false,
    saveUninitialized: true,
}));

app.get('/', (req, res) => {
    res.render('index', { retry: false, email: '' });
});

app.post('/sendOTP', async (req, res) => {
    const email = req.body.email;

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root@123',
        database: 'email_database',
    });

    connection.query('SELECT * FROM email_table WHERE email = ?', [email], async (error, results) => {
        if (error) {
            res.send(`Database error: ${error.message}`);
        } else if (results.length > 0) {
            const otp = Math.floor(100000 + Math.random() * 900000);
            req.session.generatedOTP = otp.toString();
            try {
                const result = await sendMail(email, otp);
                res.render('verify', { emailExists: true, email });
            } catch (error) {
                res.send(`Error: ${error.message}`);
            }
        } else {
            res.send('Email not found in the database. Please try again with a valid email.');
        }
    });
});

app.post('/verifyOTP', (req, res) => {
    const { email, otp: enteredOTP } = req.body;
    const generatedOTP = req.session.generatedOTP;
    const isOTPValid = generatedOTP === enteredOTP;

    if (isOTPValid) {
        const redirectLink = 'https://www.playbook.com/s/forfree/dMbbWrVpsvdT2qTqFWUE3akh';
        res.redirect(redirectLink);
    } else {
        res.render('index', { retry: true, email });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
