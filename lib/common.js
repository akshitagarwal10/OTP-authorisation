var nodemailer = require('nodemailer');
var msg91=require('msg91-sms');


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'musicforlife3128@gmail.com',
    pass: '**********'
  }
});

module.exports = {
    get_OTP: function() {
      var otp = {
        u_otp: Math.floor(Math.random()*90000) + 10000,
        a_otp: Math.floor(Math.random()*90000) + 10000
      }

      return otp;
    },
    sendMail: function(otp, u_mail, a_mail) {
        var mailOptions1 = {
          from: 'musicforlife3128@gmail.com',
          to: u_mail,
          subject: 'OTP for verifying your Request',
          text: 'Your OTP is: ' + otp.u_otp
        };

        var mailOptions2 = {
          from: 'musicforlife3128@gmail.com',
          to: a_mail,
          subject: 'OTP for verifying a Request',
          text: 'Your OTP is: ' + otp.a_otp
        };



        transporter.sendMail(mailOptions1, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

        transporter.sendMail(mailOptions2, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        }); 

        return true;
    },
    sendSMS: function(otp, u_mobile, a_mobile) {
      var authkey='212102ANWFe8Cf5adf409e';
      var number1=u_mobile;
      var number2=a_mobile;
      var message1=otp.u_otp;
      var message2=otp.a_otp;
      var senderid='ZOLOIN';
      var route='4';
      var dialcode='91';

      console.log(authkey, number1, number2, message1, message2, senderid, dialcode);

      msg91.sendOne(authkey,number1,message1,senderid,route,dialcode,function(response){
       
      //Returns Message ID, If Sent Successfully or the appropriate Error Message 
      console.log(response);
      });
      msg91.sendOne(authkey,number2,message2,senderid,route,dialcode,function(response){
       
      //Returns Message ID, If Sent Successfully or the appropriate Error Message 
      console.log(response);
      });
        return true;
    }
}