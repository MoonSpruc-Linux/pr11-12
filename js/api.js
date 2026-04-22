const BASE_URL = 'http://localhost:3000/items'

export async function getItems(query = '') {
	const res = await fetch(`${BASE_URL}?${query}`)
	return res.json()
}

export async function getItemById(id) {
	const res = await fetch(`${BASE_URL}/${id}`)
	return res.json()
}

export async function createItem(data) {
	const res = await fetch(BASE_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	})
	return res.json()
}

export async function updateItem(id, data) {
	const res = await fetch(`${BASE_URL}/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	})
	return res.json()
}

export async function deleteItem(id) {
	await fetch(`${BASE_URL}/${id}`, {
		method: 'DELETE',
	})
}
