const express = require('express');
const pg = require('pg');
const router = express.Router();

//"postgres://ytmmdocvowsidk:79a467327aed451e7ba72431c971b70a3151a7976f1d8aa8cc2b8f7c8dce9dde@ec2-23-23-142-5.compute-1.amazonaws.com:5432/d9ldmv57g2ogtm"
//"postgres://postgres:akshit168@localhost:5432/postgres"

var pool = new pg.Pool({
	connectionString: "postgres://ytmmdocvowsidk:79a467327aed451e7ba72431c971b70a3151a7976f1d8aa8cc2b8f7c8dce9dde@ec2-23-23-142-5.compute-1.amazonaws.com:5432/d9ldmv57g2ogtm"
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