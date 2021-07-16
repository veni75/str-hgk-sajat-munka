const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const port = 3000;

mongoose
    .connect('mongodb://localhost:27017/na', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then( () => logger.info('MongoDB connection has been established successfully.'))
    .catch( err => {
        logger.error(err);
        process.exit();
    });

app.use(bodyParser.json());

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument));

app.use('/person',require('./controllers/person/routes'));

app.use( (err, req, res, next) => {
    res.status(err.statusCode);
    res.json({
        hasError: true,
        message: err.message
    });
})

app.listen(port,()=>{
    console.log(`App listening at http://localhost:${port}`);
})