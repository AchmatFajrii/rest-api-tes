const express = require('express')
const cors = require('cors')
const mainRoutes = require('./routes/main');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')
const app = express()
const port = 3001

var options = {
  customCss : '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; } .swagger-ui button.opblock-control-arrow {cursor: pointer;border: none; background: none;}',
  customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.6.2/swagger-ui.css',
  customSiteTitle: "Movie App API Documentation",
};

app.use(cors())
app.use(express.json())
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile, options))
app.use('/', mainRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})