require('dotenv').config();
const config = require('config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('./config/logger');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Authenctication.
const authenticateJwt = require('./auth/authenticate');
const adminOnly = require('./auth/adminOnly');
const port = process.env.PORT || 3000;

if (!config.has('database')) {
    logger.error('Ne database config found.');
    process.exit();
}
const { databasename, host } = config.get('database');

mongoose
    .connect(`mongodb://${host}/${databasename}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connection has been established successfully.'))
    .catch(err => {
        console.error(err);
        process.exit();
    });

app.use(morgan('combined', { stream: logger.stream }));
app.use(bodyParser.json());

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post('/login', require('./auth/login'));
app.use('/person', authenticateJwt, adminOnly,require('./controllers/person/person.routes'));

app.use((err, req, res, next) => {
    res.status(err.statusCode);
    res.json({
        hasError: true,
        message: err.message
    });
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
})