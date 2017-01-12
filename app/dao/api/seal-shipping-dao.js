'use strict'

const connectorHelper = require('ralali-connector')
const SealShipping = {}

SealShipping.getShippingPrice = (data) => {
    let shipping_price
    const url =process.env.API_SEAL_SHIPPING
    console.log(url);
    return connectorHelper.postService(url, null, null, data)
        .then(data => {
            let list = JSON.parse(data.body)
            console.log(list);
            shipping_price = list 
            return shipping_price
        })
}

module.exports = SealShipping