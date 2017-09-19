'use strict'

const request = require('./lib/request')
const parseStructure = require('./lib/parse-structure')

const getItems = (layer, bbox, opt = {}) => {
	if ('string' !== typeof layer) throw new Error('layer must be a string')
	if (!Array.isArray(bbox)) throw new Error('bbox must be an array')

	const filter = opt.filter || layer
	if ('string' !== typeof filter) throw new Error('filter must be a string')
	const parse = opt.parse || parseStructure
	if ('function' !== typeof parse) throw new Error('parse must be a function')

	return request({
		request: 'GetFeature',
		bbox: bbox.join(','),
		typeNames: layer,
		srcName: 'urn:ogc:def:crs:EPSG:6.9:25833'
	}, filter, parse)
}

// todo: getItem, bbox, etc
module.exports = {getItems}
