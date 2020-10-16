const mailgun = require("mailgun-js");
const DOMAIN = process.env.MAIL_DOMAIN;
const API_KEY = process.env.MAIL_GUN_API
const mg = mailgun({apiKey: API_KEY, domain: DOMAIN});

const sendEmailVerification = (firstname, email, token, host) => {
    const data = {
        from: 'Easy News Verification <no-reply@mg.easynews.tech>',
        to: `${email}`,
        subject: 'Email Verification - Easy News',
        text: `
            #Hello! ${firstname}.
            Please verify your account by clicking the next link: \nhttp://${host}/api/confirmation/${token}
            `
    };

    mg.messages().send(data, function (error, body) {
        if (error) {
            console.log(error)
        }
        return body
    });
}


module.exports = {
    sendEmail: sendEmailVerification
}