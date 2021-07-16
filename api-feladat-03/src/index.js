const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

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