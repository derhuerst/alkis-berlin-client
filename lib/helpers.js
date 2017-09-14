'use strict'

const findIn = (root, ...tags) => {
	let el = root
	for (let tag of tags) {
		if (!el.children) return null
		const child = el.children.find(c => c.name === tag)
		if (!child) return null
		el = child
	}
	return el
}

const textOf = (el) => {
	if (!el || !el.children) return null
	const c = el.children.find(c => c.type === 'text')
	return c && c.value || null
}

module.exports = {findIn, textOf}
