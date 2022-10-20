const nodemailer = require("nodemailer")
const { HOST_EMAIL, PORT_EMAIL, EMAIL, EMAIL_PASS, DB_HOST, DB_PORT, CLIENT_PORT, URL_FRONT } = process.env;

async function bannedUserNotification(email,banned){
    let transporter = nodemailer.createTransport({
        host: `${HOST_EMAIL}`,
        port:`${PORT_EMAIL}`,
        secure:false,
        auth:{
            user:`${EMAIL}`,
            pass:`${EMAIL_PASS}`
        }
    });


if(banned.toString() == "false"){
    return transporter.sendMail({
        from: "nutri.u.contact@gmail.com",
        to: email,
        subject:"Your nutri-u account has been unbanned",
        html:`<p>Your account has been unbanned for administrator  <a href="nutri.u.contact@gmail.com">nutri.u.contact@gmail.com</a></p>`,
    })
}

if(banned.toString() == "true") {
    return transporter.sendMail({
        from: "nutri.u.contact@gmail.com",
        to: email,
        subject:"Your nutri-u account has been banned",
        html:`<p>You were blocked by a Nutri-u administrator, if you see that this was an error, contact this email  <a href="nutri.u.contact@gmail.com">nutri.u.contact@gmail.com</a></p>`,
    })
}


}

async function changePasswordNotification(email,token){
    let transporter = nodemailer.createTransport({
        host: `${HOST_EMAIL}`,
        port:`${PORT_EMAIL}`,
        secure:false,
        auth:{
            user:`${EMAIL}`,
            pass:`${EMAIL_PASS}`
        }
    });

const urlConfirm = `http://${URL_FRONT}/change-password/${token}`;
if(email && token){
    return transporter.sendMail({
        from: "nutri.u.contact@gmail.com",
        to: email,
        subject:"Change Password your Nutri-u Account",
        html:`<p>Enter the following link and reset your password<a href="${urlConfirm}"> Change Password</a></p>`,
    })
}


}

async function paymentNotification(email, recibo){
    let transporter = nodemailer.createTransport({
        host: `${HOST_EMAIL}`,
        port:`${PORT_EMAIL}`,
        secure:false,
        auth:{
            user:`${EMAIL}`,
            pass:`${EMAIL_PASS}`
        }
    });
    return transporter.sendMail({
        from: "nutri.u.contact@gmail.com",
        to: email,
        subject:"Your suscription to Nutri-U has been successful!",
        html:`<p>You are a Premium User now, enjoy!<br/> <br/>You can download your invoice here: <br/> ${recibo}<a href="nutri.u.contact@gmail.com">nutri.u.contact@gmail.com</a></p>`,
    })
    
}

module.exports = {
    //adminLogin,
    bannedUserNotification,
    changePasswordNotification,
    paymentNotification
}