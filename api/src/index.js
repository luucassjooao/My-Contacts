const express = require('express');
require('express-async-errors');

const cors = require('./app/middlewares/cors')
const errorHandle = require('./app/middlewares/errorHandle')
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(cors)
app.use(routes);
app.use(errorHandle);

app.listen(3001, () => console.log('Server started at http://localhost:3001'));
