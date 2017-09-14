'use strict'

const {getItems} = require('.')
const parsePolygon = require('./parse-polygon')

const {findIn, textOf} = require('./lib/helpers')

const parseStructure = (s) => {
	const shp = findIn(s, 'fis:SHAPE')
	return {
		id: s.attributes && s.attributes['gml:id'] || null,
		name: textOf(findIn(s, 'fis:Name')) || null,
		category: {
			id: textOf(findIn(s, 'fis:Bauwerksfunktion_schluessel')) || null,
			name: textOf(findIn(s, 'fis:Bauwerksfunktion_bezeichnung')) || null
		},
		shape: shp && shp.children[0] && parsePolygon(shp.children[0]) || null
	}
}

const alex = [392500, 5820000, 392000, 5820500]
const someHouse = [393377, 5823461, 393127, 5823608]

getItems('fis:s_wfs_alkis_bauwerkeflaechen', someHouse)
.on('data', (structure) => {
	structure = parseStructure(structure)
	console.log(structure)
})
.on('error', console.error)
