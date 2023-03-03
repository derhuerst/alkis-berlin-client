import {getItems} from './index.js'

const alexanderplatz = [392500, 5820000, 392000, 5820500]
// const wedding = [388995,5822577,389287,5822750]

getItems('fis:s_wfs_alkis_bauwerkeflaechen', alexanderplatz)
.on('data', (structure) => {
	console.log(structure)
})
.on('error', console.error)
