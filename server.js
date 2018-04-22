const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const schema = require('./models/schema')
const api = require('./routes/api')


const app = express();
const port = process.env.PORT || 3000;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, './dist')));


app.use('/schema', schema);
app.use('/api', api);


app.listen(port, function(){
	console.log('server is running...');
})