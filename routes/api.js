const express = require('express');
const router = express.Router();
const pg = require('pg');
const common = require('./../lib/common');

// "postgres://ytmmdocvowsidk:79a467327aed451e7ba72431c971b70a3151a7976f1d8aa8cc2b8f7c8dce9dde@ec2-23-23-142-5.compute-1.amazonaws.com:5432/d9ldmv57g2ogtm"
//"postgres://postgres:akshit168@localhost:5432/postgres"

var pool = new pg.Pool({
 	connectionString: "postgres://ytmmdocvowsidk:79a467327aed451e7ba72431c971b70a3151a7976f1d8aa8cc2b8f7c8dce9dde@ec2-23-23-142-5.compute-1.amazonaws.com:5432/d9ldmv57g2ogtm",
})

router.get('/getAllReq', function(req, res){
	pool.connect((err, client, done) => {
		if (err) throw err;

		var sql = 'SELECT id, username, status FROM requests';
		client.query(sql, (err, data) => {
	    	if (err) throw err;
			done();
			res.send(data.rows);
	    	// console.log(data);
	    })			
	})
})

router.post('/raisereq', function(req, res){
	console.log('got a post raisereq request');
	console.log(req.body);
	var a_mail = 'abhishek.lahiri86@gmail.com';
	var a_mobile = 8989132237;
	var otp = common.get_OTP();

	pool.connect((err, client, done) => {
		if (err) throw err;

		var data = req.body;
		var sql = 'INSERT INTO requests (username, status, u_mail, a_mail, u_mobile, a_mobile, u_otp, a_otp) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
		client.query(sql, [data.user, 'Not Approved', data.u_mail, a_mail, data.u_mobile, a_mobile, otp.u_otp, otp.a_otp], (err, data) => {
	    	if (err) throw err;
			done();
	    	// console.log(data);
	    })			
	})

	// console.log(otp);
	common.sendMail(otp, req.body.u_mail, a_mail);
	// common.sendSMS(otp, data.u_mobile, a_mobile);
	res.send('true');
})

router.put('/verifyreq', function(req, res){
	console.log('got a post verifyreq request');
	id = 0;
	pool.connect((err, client, done) => {
		if (err) throw err;

		var sql1 = 'SELECT max(id) FROM requests';
		client.query(sql1, (err, data) => {
	    	if (err) throw err;
	    	id = data.rows[0].max;
	    	var sql2 = 'SELECT u_otp, a_otp FROM requests WHERE id=$1';
	    	client.query(sql2, [id], (err, data) => {
	    		if (err) throw err;

	    		console.log()
	    		if(req.body.u_otp == data.rows[0].u_otp && req.body.a_otp == data.rows[0].a_otp){
	    			var sql3 = 'UPDATE requests SET status = $1 WHERE id=$2';
	    			client.query(sql3, ['Approved', id], (err, data) => {
	    				if (err) throw err;
	    				done();
	    			res.send('true');
	    			})
	    		} 
	    		else{
	    			done();
	    			res.send('false');
	    		} 

	    		// console.log(data.rows[0].u_otp);
	    	})
	    })
	})
})






















module.exports = router;