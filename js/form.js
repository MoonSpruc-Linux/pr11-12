import { createItem, getItemById, updateItem } from './api.js'

const form = document.querySelector('#form')
const status = document.querySelector('#form-status')

export async function initItemFormPage() {
	if (!form) return

	const params = new URLSearchParams(window.location.search)
	const id = params.get('id')

	if (id) {
		const item = await getItemById(id)
		fillForm(item)
	}

	form.addEventListener('submit', async e => {
		e.preventDefault()

		const data = getFormData()

		if (!validate(data)) return

		try {
			status.textContent = 'Saving...'

			if (id) {
				await updateItem(id, data)
			} else {
				await createItem(data)
			}

			status.textContent = 'Успішно!'
			form.reset()
		} catch {
			status.textContent = 'Помилка'
		}
	})
}

function getFormData() {
	return {
		title: form.title.value.trim(),
		category: form.category.value,
		status: form.status.value,
		price: Number(form.price.value),
		description: form.description.value.trim(),
	}
}

function validate(data) {
	if (!data.title || data.price <= 0) {
		alert('Некоректні дані')
		return false
	}
	return true
}

function fillForm(item) {
	form.title.value = item.title
	form.category.value = item.category
	form.status.value = item.status
	form.price.value = item.price
	form.description.value = item.description
}
