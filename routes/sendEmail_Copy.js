var express = require('express');
var router = express.Router();
var con = require('../connection_pool');
const nodemailer = require('nodemailer');



router.post('/',function(req,res,next){
    console.log( req.body.lead_id);
  
    con.query('select leads.email as leademail,users.email as franchisemail,company_name, frankey from leads join users on leads.user_id=users.id where leads.id=?',[req.body.lead_id],function(err,result){
      console.log(result[0].leademail);
      nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: "lemurfranchiseconnect@gmail.com", // generated ethereal user
            pass: "lemur123" // generated ethereal password
          }
        });
    
        // setup email data with unicode symbols
        let mailOptions = {
          from: '"Lemur System" <lemurfranchiseconnect@gmail.com>', // sender address
          to: result[0].leademail, // list of receivers
          subject: 'Franchising Opprutunity, You Have Been Waiting For', // Subject line
          text: 'Congratulations!!! You Have Selected as Prospective Franchisee for ' + result[0].company_name+
          '.Please Sign in on http://localhost:3000/ with you email and this Key: '+result[0].frankey, // plain text body
          // html body
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          res.json({ data: 'Email Sent' });
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
      });
    
    });
    });




module.exports = router;
