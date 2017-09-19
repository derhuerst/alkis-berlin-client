'use strict'

const {getItems} = require('.')

const alex = [392500, 5820000, 392000, 5820500]
const someHouse = [393377, 5823461, 393127, 5823608]

getItems('fis:s_wfs_alkis_bauwerkeflaechen', someHouse)
.on('data', (structure) => {
	console.log(structure)
})
.on('error', console.error)
