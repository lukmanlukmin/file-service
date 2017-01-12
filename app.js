'use strict'

require('dotenv').load()
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const validator = require('express-validator')
const logger = require('morgan')
const fs = require('fs')
const swaggerJSDoc = require('swagger-jsdoc')

const routePath = './app/routes/v1/'
const app = express()

const aclService = require('./app/auth/ACL-service')

// swagger definition
var swaggerDefinition = {
    info: {
        title: 'Ralali Order Api Play Ground',
        version: '1.0.0',
        description: 'Demonstrating how to use a this microservices'
    },
    basePath: '/'
}

// options for the swagger docs
var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./app/routes/v1/*.js']
}

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options)

app.get('/api/v1/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
})
app.use('/api/v1/api-docs', express.static('./api-docs'))

// middleware
app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
    // for security disable the X-Powered-By header
app.use(validator())

app.disable('x-powered-by')

// routes ======================================================================
fs.readdirSync(routePath).forEach((file) => {
    let route = routePath + file
    require(route)(app)
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
    err.message = process.env.APP_ENV === 'development' ? err.message : []
    res.status(err.status || 500).send({ message: err.message })
    throw err
})

/*register resource to database*/
let kampret = []
app._router.stack.forEach(function(middleware){
    if(middleware.route){ // routes registered directly on the app
        let data
        Object.keys(middleware.route.methods).forEach(function(jancuk) {
            kampret.push({
                path: middleware.route.path,
                method: jancuk
            })
        })
    }
});
aclService.updateEndpoint(kampret,process.env.APP_SERRVICE_NAME)


/*
 |--------------------------------------------------------------------------
 | Start the Server
 | !module.parent === avoid error Uncaught error outside test suite:
 |--------------------------------------------------------------------------
 */

if (!module.parent) {
    app.listen(process.env.APP_PORT, () => {
        console.log('Express server listening on port ' + process.env.APP_PORT)
    })
}
module.exports = app
