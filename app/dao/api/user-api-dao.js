'use strict'

const connectorHelper = require('ralali-connector')
const apiUser = {}

apiUser.getVendorReport = (header, limit, datestart, dateend) => {
	const query = {
		limit: limit,
		datestart: datestart,
		dateend: dateend
	}
	const url = process.env.API_USER + '/vendor/new/list'
	return connectorHelper.getService(url, query, header)
}

apiUser.getUserReport = (header, limit, datestart, dateend) => {
	const query = {
		limit: limit,
		datestart: datestart,
		dateend: dateend
	}
	const url = process.env.API_USER + '/user/new/list'
	return connectorHelper.getService(url, query, header)
}

apiUser.getUserProfile = (header) => {
	// header = header
	const url = process.env.API_USER + '/profile'
	return connectorHelper.getService(url, {}, header)
		.then(data => {
			// console.log(data);
			return JSON.parse(data.body)
		})
}

apiUser.getUserAddressByAddressId = (header, address_id) => {
	const url = process.env.API_USER + '/address/' + address_id
	return connectorHelper.getService(url, {}, header)
		.then(data => {
			return JSON.parse(data.body)
		}) 

}

apiUser.getVendorDetailByVendorId = (header, vendor_id) => {
	const url = process.env.API_USER + '/vendor/detail/' + vendor_id
	return connectorHelper.getService(url, {}, header)
		.then(data => {
			return JSON.parse(data.body)
		})
}

apiUser.checkPostalCode = (header, postal_code) => {
	const url = process.env.API_USER + '/location/subdistrict/postal-code/' + postal_code
	return connectorHelper.getService(url, {}, header)
		.then(data => {
			return JSON.parse(data.body)
		})
}
module.exports = apiUser