'use strict'

const request = require('./lib/request')

const getItems = (layer, bbox, filter = layer) => {
	if ('string' !== typeof layer) throw new Error('layer must be a string')
	if (!Array.isArray(bbox)) throw new Error('bbox must be an array')

	return request({
		request: 'GetFeature',
		bbox: bbox.join(','),
		typeNames: layer,
		srcName: 'urn:ogc:def:crs:EPSG:6.9:25833'
	}, filter)
}

// todo: getItem, bbox, etc
module.exports = {getItems}
