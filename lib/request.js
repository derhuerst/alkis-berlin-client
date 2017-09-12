'use strict'

const peek = require('peek-stream')
const iconv = require('iconv-lite')
const {stringify} = require('qs')
const Promise = require('pinkie-promise')
const {fetch} = require('fetch-ponyfill')({Promise})
const xmlParser = require('xml-flow')
const {Readable} = require('stream')

const endpoint = 'http://fbinter.stadt-berlin.de/fb/wfs/data/senstadt/s_wfs_alkis_bauwerkeflaechen'
const userAgent = 'https://github.com/derhuerst/alkis-berlin-client'

const createDecoder = () => {
	return peek({maxBuffer: 100}, (data, cb) => {
		const head = data.slice(0, 100).toString('utf8')
		const attr = /\sencoding="([^"]+)"/.exec(head)
		const encoding = attr && attr[1] && attr[1].toLowerCase() || 'utf-8'
		cb(null, iconv.decodeStream(encoding))
	})
}

const request = (query) => {
	query = Object.assign({
		service: 'WFS',
		version: '2.0.0'
	}, query)

	return fetch(endpoint + '?' + stringify(query), {
		mode: 'cors',
		redirect: 'follow',
		headers: {'User-Agent': userAgent}
	})
	.then((res) => {
		if (!res.ok) {
			const err = new Error(res.statusText)
			err.statusCode = res.status
			throw err
		}

		const decoder = createDecoder()
		res.body.pipe(decoder)
		res.body.once('error', (err) => decoder.emit('error', err))

		const parser = xmlParser(decoder, {lowercase: false})
		decoder.once('error', (err) => parser.emit('error', err))

		return parser
	})
}

module.exports = request
