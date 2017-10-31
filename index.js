'use strict'

const request = require('./lib/request')
const createParseStructure = require('./lib/parse-structure')

const isObj = (v) => 'object' === typeof v && !Array.isArray(v)

const getItems = (layer, bbox, opt = {}) => {
	if ('string' !== typeof layer) throw new Error('layer must be a string')
	if (!Array.isArray(bbox)) throw new Error('bbox must be an array')

	const filter = opt.filter || layer
	if ('string' !== typeof filter) throw new Error('filter must be a string')

	if (('fields' in opt) && !isObj(opt.fields)) {
		throw new Error('opt.fields must be an object')
	}
	const parse = createParseStructure(opt.fields)

	return request({
		request: 'GetFeature',
		bbox: bbox.join(','),
		typeNames: layer,
		srcName: 'urn:ogc:def:crs:EPSG:6.9:25833'
	}, filter, parse)
}

// todo: getItem, bbox, etc
module.exports = {getItems}
