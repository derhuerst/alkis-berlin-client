import createTransform from 'transform-coordinates'
import parseGmlPolygon from 'parse-gml-polygon'

const transform = createTransform('25833', '4326')

const transformCoords = (x, y) => {
	const pos = transform.forward({x, y})
	return [
		Math.round(pos.x * 1000000) / 1000000,
		Math.round(pos.y * 1000000) / 1000000,
	]
}

const parsePolygon = p => parseGmlPolygon(p, transformCoords)

export {
	transformCoords,
	parsePolygon,
}
