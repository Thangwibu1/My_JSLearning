# Bài 19: Events

## 📖 Lý thuyết

**Events** là actions hoặc occurrences xảy ra trong browser mà JavaScript có thể respond.

---

## 💡 addEventListener()

```javascript
const button = document.querySelector('#myBtn');

// addEventListener(event, handler, options)
button.addEventListener('click', function(event) {
    console.log('Button clicked!');
    console.log(event);
});

// Arrow function
button.addEventListener('click', (e) => {
    console.log('Clicked!', e);
});

// Named function
function handleClick(event) {
    console.log('Clicked!');
}
button.addEventListener('click', handleClick);

// Remove listener
button.removeEventListener('click', handleClick);
```

---

## 💡 Common Events

### Mouse Events

```javascript
element.addEventListener('click', handler);
element.addEventListener('dblclick', handler);
element.addEventListener('mousedown', handler);
element.addEventListener('mouseup', handler);
element.addEventListener('mouseenter', handler);
element.addEventListener('mouseleave', handler);
element.addEventListener('mousemove', handler);
```

### Keyboard Events

```javascript
input.addEventListener('keydown', (e) => {
    console.log(e.key);          // Key name
    console.log(e.code);         // Physical key code
    console.log(e.ctrlKey);      // Ctrl pressed?
    console.log(e.shiftKey);     // Shift pressed?
});

input.addEventListener('keyup', handler);
input.addEventListener('keypress', handler); // Deprecated
```

### Form Events

```javascript
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission
    console.log('Form submitted');
});

input.addEventListener('input', (e) => {
    console.log(e.target.value); // Current value
});

input.addEventListener('change', handler);  // When value changes and loses focus
input.addEventListener('focus', handler);
input.addEventListener('blur', handler);
```

### Window Events

```javascript
window.addEventListener('load', () => {
    console.log('Page fully loaded');
});

window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM ready');
});

window.addEventListener('resize', () => {
    console.log('Window resized');
});

window.addEventListener('scroll', () => {
    console.log('Page scrolled');
});
```

---

## 💡 Event Object

```javascript
button.addEventListener('click', (event) => {
    console.log(event.type);        // 'click'
    console.log(event.target);      // Element that triggered
    console.log(event.currentTarget); // Element with listener
    console.log(event.clientX);     // Mouse X
    console.log(event.clientY);     // Mouse Y
    console.log(event.timeStamp);   // When event occurred
});
```

---

## 💡 Event Flow

### Bubbling (Default)

```html
<div class="outer">
    <div class="inner">
        <button>Click me</button>
    </div>
</div>
```

```javascript
// Event bubbles up: button → inner → outer
document.querySelector('.outer').addEventListener('click', () => {
    console.log('Outer clicked');
});

document.querySelector('.inner').addEventListener('click', () => {
    console.log('Inner clicked');
});

document.querySelector('button').addEventListener('click', () => {
    console.log('Button clicked');
});

// Click button logs: Button, Inner, Outer
```

### Capturing

```javascript
// Use capture phase
element.addEventListener('click', handler, true);
// or
element.addEventListener('click', handler, { capture: true });
```

### Stop Propagation

```javascript
button.addEventListener('click', (e) => {
    e.stopPropagation(); // Stop bubbling
    console.log('Button clicked');
});
```

---

## 💡 Event Delegation

```javascript
// ❌ BAD - Add listener to each item
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', () => {
        console.log('Item clicked');
    });
});

// ✅ GOOD - One listener on parent
document.querySelector('.list').addEventListener('click', (e) => {
    if (e.target.classList.contains('item')) {
        console.log('Item clicked:', e.target);
    }
});
```

---

## ✏️ Bài tập

### Bài tập: Interactive Todo List

```javascript
// TODO: Implement features:
// 1. Add todo on Enter key
// 2. Toggle complete on click
// 3. Delete on button click
// 4. Count active/completed todos
```

**Đáp án trong file đầy đủ...**

---

**Bài tiếp theo**: [Bài 20 - Event Delegation](./Lesson_20_Event_Delegation.md)

