const express = require('express');
const pg = require('pg');
const router = express.Router();

//"postgres://nqzxqzmuuxgxrv:3cd0338e69c90dbd19564ccc4a7a0cf418cc887cb16d7a40ae007bc4a76199ba@ec2-54-243-213-188.compute-1.amazonaws.com:5432/db4vmrs4s06roc"
//"postgres://postgres:akshit168@localhost:5432/postgres"

var pool = new pg.Pool({
	connectionString: "postgres://postgres:akshit168@localhost:5432/postgres"
})

router.post('/', function(req, res){
	pool.connect((err, client, done) => {
		if (err) throw err;
		client.query("CREATE TABLE requests (id SERIAL PRIMARY KEY, username TEXT NOT NULL, status TEXT NOT NULL, u_mail TEXT NOT NULL, a_mail TEXT NOT NULL, u_mobile TEXT NOT NULL, a_mobile TEXT NOT NULL, u_otp INT NOT NULL, a_otp INT NOT NULL)", (err, data) => {
			if (err) throw err;
			console.log('success');
			res.send('success');
			done();
			pool.end();
		})
	})
})

module.exports = router;