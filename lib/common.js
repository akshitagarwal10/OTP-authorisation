var nodemailer = require('nodemailer');
// var Nexmo = require('nexmo');

// var nexmo = new Nexmo({
//   apiKey: '8cd564c2',
//   apiSecret: 'ksZaBhwKYnDJfar7'
// }, {debug: true});

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'musicforlife3128@gmail.com',
    pass: 'faker123#'
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
      // nexmo.message.sendSms(
      //   'NEXMO', u_mobile, otp.u_otp, { type: 'unicode' },
      //   (err, res) => {
      //     if(err) throw err;
      //     console.log(res);
      //   }
      // );
      // nexmo.message.sendSms(
      //   'NEXMO', a_mobile, otp.a_otp, { type: 'unicode' },
      //   (err, res) => {
      //     if(err) throw err;
      //     console.log(res);
      //   }
      // );
        return 'sms sent';
    }
}