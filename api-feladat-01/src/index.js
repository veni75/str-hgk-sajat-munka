const express = require('express');
const app = express();
const port = 3000;

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument));

app.use('/person',require('./controllers/person/routes'));

app.listen(port,()=>{
    console.log(`App listening at http://localhost:${port}`);
})