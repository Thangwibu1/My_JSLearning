# Bài 17: Selecting Elements

## 📖 Lý thuyết

Có nhiều cách để select elements trong DOM. Modern way là dùng `querySelector()` và `querySelectorAll()`.

---

## 💡 CSS Selectors

```javascript
// ID selector
document.querySelector('#myId');

// Class selector
document.querySelector('.myClass');
document.querySelectorAll('.myClass');

// Tag selector
document.querySelector('div');
document.querySelectorAll('p');

// Attribute selector
document.querySelector('[type="text"]');
document.querySelector('[data-id="123"]');

// Pseudo-class
document.querySelector('li:first-child');
document.querySelector('li:last-child');
document.querySelector('li:nth-child(2)');

// Combinators
document.querySelector('div > p');           // Direct child
document.querySelector('div p');             // Descendant
document.querySelector('h1 + p');            // Adjacent sibling
document.querySelector('h1 ~ p');            // General sibling

// Multiple selectors
document.querySelectorAll('input, button');
document.querySelector('.active, .selected');
```

---

## 💡 Performance Considerations

```javascript
// ✅ FAST - ID selector
const element = document.getElementById('myId');

// ✅ FAST - querySelector với ID
const element = document.querySelector('#myId');

// ⚠️ SLOWER - getElementsByClassName
const elements = document.getElementsByClassName('myClass');

// ✅ GOOD - querySelectorAll
const elements = document.querySelectorAll('.myClass');

// ❌ SLOW - Complex selectors
const elements = document.querySelectorAll('body div.container > ul li:nth-child(odd)');
```

---

## ✏️ Bài tập

### Bài tập: Advanced Selectors

```html
<div class="container">
    <h1 id="title">Title</h1>
    <ul class="list">
        <li class="item active">Item 1</li>
        <li class="item">Item 2</li>
        <li class="item">Item 3</li>
    </ul>
    <input type="text" name="username">
    <input type="email" name="email">
</div>
```

```javascript
// TODO:
// 1. Get active item
// 2. Get all items
// 3. Get text input
// 4. Get all inputs
// 5. Get first item in list
```

**Đáp án**:
```javascript
const activeItem = document.querySelector('.item.active');
const allItems = document.querySelectorAll('.item');
const textInput = document.querySelector('input[type="text"]');
const allInputs = document.querySelectorAll('input');
const firstItem = document.querySelector('.list .item:first-child');
```

---

**Bài tiếp theo**: [Bài 18 - Manipulating Elements](./Lesson_18_Manipulating_Elements.md)

