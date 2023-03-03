import {findIn, textOf, attrOf} from './helpers.js'
import {parsePolygon} from './parse-polygon.js'

const hasProp = (o, k) => Object.prototype.hasOwnProperty.call(o, k)

const createParseStructure = (additionalFields = {}) => {
	const parseStructure = (s) => {
		const shp = findIn(s, 'fis:geom')
		const parsed = {
			id: attrOf(s, 'gml:id'),
			uuid: textOf(findIn(s, 'fis:uuid')),
			name: textOf(findIn(s, 'fis:nam')) || null,
			category: {
				id: textOf(findIn(s, 'fis:gfk')) || null,
				name: textOf(findIn(s, 'fis:bezgfk')) || null
			},
			aaa: textOf(findIn(s, 'fis:bezeich')) || null,
			shape: shp && shp.children[0] && parsePolygon(shp.children[0]) || null

			// todo?
			// - fis:aog
			// - fis:hoh
			// - fis:gkn
			// - fis:des & fis:bezdes
			// - fis:lag & fis:namlag
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

export {
	createParseStructure,
}
