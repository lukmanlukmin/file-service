'use strict'

let AWSService = module.exports = {}

// for upload to s3 library
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

let s3Client = new aws.S3({
    accessKeyId: process.env.S3_KEY,
    secretAccessKey: process.env.S3_SECRET,
    region: process.env.S3_REGION
})

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET,
        metadata: (req, file, cb) => {
            cb(null, {
                fieldName: `profile_${Date.now().toString()}`
            })
        },
        key: (req, file, cb) => {
            cb(null, `${process.env.S3_PATH}profile_${Date.now().toString()}`)
        }
    })
})

AWSService.getBucketList = () => {
    return s3Client.listBuckets().promise()
}

AWSService.getObjectListingWithPrefix = (bucketName, prefix) => {
	const params = { 
	  Bucket: bucketName,
	  Delimiter: '/',
	  Prefix: prefix 
	}
	let fucker =  s3Client.listObjects(params).promise()
	return fucker.then(data=>{
		console.log(data.Contents)
		return data
	})
}

AWSService.getObjectListing = (bucketName) => {
	const params = { 
	  Bucket: bucketName,
	  Delimiter: '/'
	}
	return s3Client.listObjects(params).promise()
}