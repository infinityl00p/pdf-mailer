const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors')
const mongoose = require('mongoose');

app.use(bodyParser.json({ type: 'application/json' }))
app.use(cors());
//mongoose.connect(keys.mongoURI);

//require('./models/Images');
//require('./routes/uploadRoutes')(app);
//require('./routes/imageRoutes')(app);
require('./routes/order_routes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});
