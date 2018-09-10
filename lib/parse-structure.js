'use strict'

const {findIn, textOf, attrOf} = require('./helpers')
const parsePolygon = require('./parse-polygon')

const hasProp = (o, k) => Object.prototype.hasOwnProperty.call(o, k)

const createParseStructure = (additionalFields = {}) => {
	const parseStructure = (s) => {
		const shp = findIn(s, 'fis:SHAPE') || findIn(s, 'fis:ORA_GEOMETRY')
		const parsed = {
			id: attrOf(s, 'gml:id'),
			name: textOf(findIn(s, 'fis:Name') || findIn(s, 'fis:NAM')) || null,
			category: {
				id: textOf(findIn(s, 'fis:Bauwerksfunktion_schluessel') || findIn(s, 'fis:BWF')) || null,
				name: textOf(findIn(s, 'fis:Bauwerksfunktion_bezeichnung') || findIn(s, 'fis:BEZBWF')) || null
			},
			aaa: textOf(findIn(s, 'fis:AAA-Beschreibung') || findIn(s, 'fis:BEZEICH')) || null,
			shape: shp && shp.children[0] && parsePolygon(shp.children[0]) || null
		}

		for (let field in additionalFields) {
			if (!hasProp(additionalFields, field)) continue
			const parseField = additionalFields[field]
			parsed[field] = parseField(s)
		}

		return parsed
	}

	return parseStructure
}

module.exports = createParseStructure
