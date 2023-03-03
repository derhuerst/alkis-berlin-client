import getFeatures from 'query-fis-broker-wfs/get-features.js'
import through from 'through2'

import {createParseStructure} from './lib/parse-structure.js'

const endpoint = 'https://fbinter.stadt-berlin.de/fb/wfs/data/senstadt/s_wfs_alkis_bauwerkeflaechen'

const isObj = (v) => 'object' === typeof v && !Array.isArray(v)

const getItems = (layer, bbox, opt = {}) => {
	if ('string' !== typeof layer) throw new Error('layer must be a string')
	if (!Array.isArray(bbox)) throw new Error('bbox must be an array')

	if (('fields' in opt) && !isObj(opt.fields)) {
		throw new Error('opt.fields must be an object')
	}
	const parse = createParseStructure(opt.fields)

	return getFeatures(endpoint, layer, {
		bbox,
		crs: 'urn:ogc:def:crs:EPSG:6.9:25833'
	})
	.pipe(through.obj((feature, _, cb) => {
		try {
			cb(null, parse(feature))
		} catch (err) {
			cb(err)
		}
	}))
}

// todo: getItem, bbox, etc

export {
	getItems,
}
