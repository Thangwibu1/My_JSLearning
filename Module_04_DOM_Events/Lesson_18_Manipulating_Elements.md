# Bài 18: Manipulating Elements

## 📖 Lý thuyết

DOM manipulation là cách JavaScript thay đổi nội dung, structure, và style của HTML.

---

## 💡 Changing Content

### textContent vs innerHTML

```javascript
const element = document.querySelector('#content');

// textContent - Text only (safe)
element.textContent = 'Hello World';
console.log(element.textContent);

// innerHTML - HTML content (⚠️ XSS risk)
element.innerHTML = '<strong>Hello</strong> World';
console.log(element.innerHTML);

// outerHTML - Element + content
console.log(element.outerHTML);
```

---

## 💡 Changing Attributes

```javascript
const img = document.querySelector('img');

// getAttribute, setAttribute
img.getAttribute('src');
img.setAttribute('src', 'new-image.jpg');
img.setAttribute('alt', 'New image');

// Direct property access
img.src = 'image.jpg';
img.alt = 'An image';

// Remove attribute
img.removeAttribute('title');

// data attributes
const element = document.querySelector('[data-id="123"]');
element.dataset.id;              // '123'
element.dataset.name = 'John';   // data-name="John"
```

---

## 💡 Changing Styles

```javascript
const element = document.querySelector('.box');

// Inline styles
element.style.color = 'red';
element.style.backgroundColor = 'blue';
element.style.fontSize = '20px';

// Multiple styles
Object.assign(element.style, {
    color: 'red',
    backgroundColor: 'blue',
    padding: '10px'
});

// Get computed style
const styles = window.getComputedStyle(element);
console.log(styles.color);
console.log(styles.fontSize);
```

---

## 💡 Working with Classes

```javascript
const element = document.querySelector('.box');

// className - String of classes
element.className = 'box active';

// classList - Better way
element.classList.add('highlight');
element.classList.remove('active');
element.classList.toggle('hidden');
element.classList.contains('box');        // true

// Multiple classes
element.classList.add('class1', 'class2');
element.classList.remove('class1', 'class2');
```

---

## 💡 Creating Elements

```javascript
// createElement
const div = document.createElement('div');
div.textContent = 'Hello';
div.className = 'box';

// appendChild
document.body.appendChild(div);

// insertBefore
const reference = document.querySelector('.reference');
document.body.insertBefore(div, reference);

// append (modern - can append multiple)
document.body.append(div, 'Some text', anotherElement);

// prepend - Add to beginning
document.body.prepend(div);

// insertAdjacentHTML
element.insertAdjacentHTML('beforebegin', '<div>Before</div>');
element.insertAdjacentHTML('afterbegin', '<div>Start</div>');
element.insertAdjacentHTML('beforeend', '<div>End</div>');
element.insertAdjacentHTML('afterend', '<div>After</div>');
```

---

## 💡 Removing Elements

```javascript
const element = document.querySelector('.remove-me');

// remove() - Modern
element.remove();

// removeChild() - Old way
element.parentElement.removeChild(element);

// Clear all children
element.innerHTML = '';
// or
while (element.firstChild) {
    element.removeChild(element.firstChild);
}
```

---

## 💡 Cloning Elements

```javascript
const original = document.querySelector('.original');

// Shallow clone (no children)
const clone = original.cloneNode(false);

// Deep clone (with children)
const deepClone = original.cloneNode(true);

document.body.appendChild(deepClone);
```

---

## ✏️ Bài tập

### Bài tập 1: Todo List

```html
<input type="text" id="todoInput" placeholder="New todo">
<button id="addBtn">Add</button>
<ul id="todoList"></ul>
```

```javascript
// TODO: Implement
// 1. Khi click Add, tạo <li> mới với text từ input
// 2. Add vào ul#todoList
// 3. Clear input
// 4. Thêm button "Delete" cho mỗi todo
```

**Đáp án**:
```javascript
const input = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('todoList');

addBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;
    
    const li = document.createElement('li');
    li.textContent = text;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => li.remove());
    
    li.appendChild(deleteBtn);
    list.appendChild(li);
    
    input.value = '';
});
```

---

**Bài tiếp theo**: [Bài 19 - Events](./Lesson_19_Events.md)

