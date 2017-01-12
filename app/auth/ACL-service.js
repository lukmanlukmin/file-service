'use strict'

const connectorHelper = require('ralali-connector')
const aclService = {}
const keyTmpACL = process.env.APP_ACL_KEY

aclService.updateEndpoint = (data, resource_name) => {
  const header = {}
  header['ralali-update-endpoint_key'] = keyTmpACL
  const url = process.env.API_USER + '/actuator/update_endpoint'
  const dataPost = {
    endpoint: data,
    resource_name: resource_name
  }
  console.log('updating resource url')
  return connectorHelper.postService(url, dataPost, header).
  then(data => {
    if (data.body.authorized) {
      console.log('resource url updated')
    } else {
      console.log('resource url not updated')
    }
  })
}

aclService.authorize = (req, res, next) => {
  let thisActuator = {
      path: req.route.path,
      method: req.method.toLowerCase(),
      resource_name: process.env.APP_SERRVICE_NAME
    },
    statusAuth = false // jshint ignore: line
  const url = process.env.API_USER + '/actuator/check_endpoint'
  return connectorHelper.postService(url, thisActuator, req.headers)
    .then(pathInfo => {
      if (pathInfo.status === 200) {
        next()
      } else {
        return res.status(pathInfo.status).send(pathInfo.body)
      }
    }).catch(() => {
      return res.status(401).send({
        message: 'Can\'n Contact Main Server'
      })
    })
}


module.exports = aclService