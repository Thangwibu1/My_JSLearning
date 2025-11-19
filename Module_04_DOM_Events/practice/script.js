const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

document.querySelectorAll('#todoList li').forEach((li) => {
	if (!li.querySelector('.delete-btn')) {
		const btn = document.createElement('button');
		btn.textContent = 'Xóa';
		btn.className = 'delete-btn';
		btn.style.marginLeft = '8px';
		li.appendChild(btn);
	}
});

todoList.addEventListener('click', (e) => {
	const btn = e.target.closest('.delete-btn');
	console.log('btn:', btn);
	if (!btn) return;
	const li = btn.closest('li');
	if (li) li.remove();
});

addBtn.addEventListener('click', () => {
	const todoText = todoInput.value.trim();
	console.log(todoText);
	if (todoText !== '') {
		const li = document.createElement('li');
		li.textContent = todoText;
		todoList.appendChild(li);
		console.log(todoList);

		const deleteBtn = document.createElement('button');
		deleteBtn.textContent = 'Xóa';
		deleteBtn.className = 'delete-btn';
		deleteBtn.style.marginLeft = '8px';
		li.appendChild(deleteBtn);

		todoInput.value = '';
	} else {
		alert('Please enter a todo item.');
	}
});
