# alkis-berlin-client

**Query [ALKIS](https://de.wikipedia.org/wiki/Amtliches_Liegenschaftskatasterinformationssystem), the [cadastral map](https://en.wikipedia.org/wiki/Plat) of Berlin**, containing shapes of all Buildings, land use zones, sections of owned land, etc. Caveats:

- Sending requests with a filter by item type doesn't work yet.
- Ability to query a single item is missing.

[![npm version](https://img.shields.io/npm/v/alkis-berlin-client.svg)](https://www.npmjs.com/package/alkis-berlin-client)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/alkis-berlin-client.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)
[![support me on Patreon](https://img.shields.io/badge/support%20me-on%20patreon-fa7664.svg)](https://patreon.com/derhuerst)


## Installing

```shell
npm install alkis-berlin-client
```


## Usage

Items will be parsed XML elements in the format of [xml-reader](https://github.com/pladaria/xml-reader#node-structure).

```js
import {getItems} from 'alkis-berlin-client'

const alexanderplatz = [392500, 5820000, 392000, 5820500]

const structures = getItems('fis:s_wfs_alkis_bauwerkeflaechen', alexanderplatz)
for await (const structure of structures) {
	console.log(structure)
}
```


## Contributing

If you have a question or have difficulties using `alkis-berlin-client`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/alkis-berlin-client/issues).
