'use strict'

const {getItems} = require('.')

const alexanderplatz = [392500, 5820000, 392000, 5820500]

getItems('fis:s_wfs_alkis_bauwerkeflaechen', alexanderplatz)
.on('data', (structure) => {
	console.log(structure)
})
.on('error', console.error)
