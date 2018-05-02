const express = require('express');
const app = express();

require('./routes/order_routes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});