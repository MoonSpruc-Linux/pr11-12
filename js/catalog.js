import { getItems, deleteItem } from './api.js'

const list = document.querySelector('#list')
const status = document.querySelector('#status')

export async function initCatalogPage() {
	if (!list) return

	loadItems()

	list.addEventListener('click', async e => {
		if (e.target.classList.contains('delete-btn')) {
			const id = e.target.dataset.id

			if (confirm('Видалити?')) {
				await deleteItem(id)
				loadItems()
			}
		}
	})
}

async function loadItems() {
	try {
		status.textContent = 'Loading...'

		const items = await getItems()

		if (items.length === 0) {
			list.innerHTML = '<p>Немає даних</p>'
			return
		}

		render(items)
		status.textContent = ''
	} catch (err) {
		status.textContent = 'Помилка завантаження'
	}
}

function render(items) {
	list.innerHTML = items
		.map(
			item => `
    <div class="card">
      <h3>${item.title}</h3>
      <p>${item.category}</p>
      <p>${item.price}</p>
      <button class="delete-btn" data-id="${item.id}">Delete</button>
      <a href="item-form.html?id=${item.id}">Edit</a>
    </div>
  `,
		)
		.join('')
}
