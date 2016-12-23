'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var fs=require('fs');

var nodemailer = require('nodemailer');

var mailtemplate=null;
mailtemplate=fs.readFileSync('./mailtemplate.html');

var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: "zanmilearning@gmail.com",
        pass: "zanmi@123"
    }
};

//var smtpConfig = 'smtps://zanmilearning%40gmail.com:zanmi%40123@smtp.gmail.com';

var smtpTransport = nodemailer.createTransport(smtpConfig);

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"Zanmi Learn ✉" <zanmilearning@gmail.com>', // sender address
    to: "raj.nagaraj1990@gmail.com",// list of receivers
    subject: 'Activate your account ✔', // Subject line
    text: '', // plaintext body
    html: mailtemplate,
     // html body
};

var sendMail = function (mailid) {

    // send mail with defined transport object
    if(mailid)
    mailOptions.to=mailid;

    smtpTransport.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });

}


var userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        required: true,
        trim: true
    },
    location: String,
    active: {
        type: Boolean,
        default: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    created_at: String,
    updated_at: String
});

userSchema.pre('save', function (next) {
    var now = new Date();
    this.updated_at = now.toString();
    if (!this.created_at) {
        this.created_at = now.toString();
    }
    sendMail(this.email);
    next();
});

var usermodel = mongoose.model('User', userSchema);
module.exports = usermodel;
