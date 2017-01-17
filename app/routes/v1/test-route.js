'use strict'

const VERSION = '/api/v1'

const awsService = require('./../../services/AWS-Service')


module.exports = (app) => {
    
    app.get(VERSION + '/bucket/list', (req, res, next) => {
        let fucker = awsService.getBucketList(s3)
        fucker.then(data=>{
        	return res.send(data)
        }).catch(error=> {
		  return res.send(error)
		})
		
    })

    app.get(VERSION + '/bucket/objectlist/:bucketName/:prefix', (req, res, next) => {
        let fucker = awsService.getObjectListingWithPrefix(s3, req.params.bucketName, req.params.prefix)
        fucker.then(data=>{
        	return res.send(data)
        }).catch(error=> {
		  return res.send(error)
		})
    })

    app.get(VERSION + '/bucket/objectlist/:bucketName', (req, res, next) => {
        let fucker = awsService.getObjectListing(s3, req.params.bucketName, req.params.prefix)
        fucker.then(data=>{
        	return res.send(data)
        }).catch(error=> {
		  return res.send(error)
		})
    })
}
