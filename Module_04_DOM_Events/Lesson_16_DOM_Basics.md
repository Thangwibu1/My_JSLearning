# Bài 16: DOM Basics

## 📖 Lý thuyết

**DOM (Document Object Model)** là programming interface cho HTML/XML documents. DOM đại diện cho document như một tree structure, nơi mỗi node là một object đại diện cho một phần của document.

### DOM là gì?

```
Document (HTML)
    ↓
DOM Tree
    ↓
JavaScript có thể manipulate
```

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <h1 id="title">Hello World</h1>
    <p class="text">Welcome!</p>
</body>
</html>
```

**DOM Tree**:
```
Document
  └─ html
      ├─ head
      │   └─ title
      │       └─ "My Page"
      └─ body
          ├─ h1#title
          │   └─ "Hello World"
          └─ p.text
              └─ "Welcome!"
```

---

## 💡 Document Object

```javascript
// document object - đại diện cho toàn bộ page
console.log(document);
console.log(document.title);        // Page title
console.log(document.URL);          // Current URL
console.log(document.domain);       // Domain name
console.log(document.doctype);      // <!DOCTYPE html>
console.log(document.head);         // <head> element
console.log(document.body);         // <body> element
```

---

## 💡 Node Types

DOM có nhiều loại nodes:

```javascript
// Node types
console.log(Node.ELEMENT_NODE);      // 1
console.log(Node.TEXT_NODE);         // 3
console.log(Node.COMMENT_NODE);      // 8
console.log(Node.DOCUMENT_NODE);     // 9

// Check node type
const element = document.getElementById('title');
console.log(element.nodeType);       // 1 (ELEMENT_NODE)
console.log(element.nodeName);       // "H1"
console.log(element.nodeValue);      // null (for elements)
```

---

## 💡 Accessing Elements

### getElementById()

```javascript
const title = document.getElementById('title');
console.log(title);                  // <h1 id="title">...</h1>
console.log(title.textContent);      // Text content
console.log(title.innerHTML);        // HTML content
```

### getElementsByClassName()

```javascript
const items = document.getElementsByClassName('item');
console.log(items);                  // HTMLCollection
console.log(items.length);           // Number of elements
console.log(items[0]);               // First element

// Convert to Array
const itemsArray = Array.from(items);
itemsArray.forEach(item => console.log(item));
```

### getElementsByTagName()

```javascript
const paragraphs = document.getElementsByTagName('p');
console.log(paragraphs);             // HTMLCollection

const allElements = document.getElementsByTagName('*');
console.log(allElements.length);     // All elements in document
```

### querySelector() - Modern (Preferred)

```javascript
// CSS selector - Returns FIRST match
const title = document.querySelector('#title');
const firstItem = document.querySelector('.item');
const firstP = document.querySelector('p');

// Complex selectors
const link = document.querySelector('nav a.active');
const input = document.querySelector('input[type="text"]');
```

### querySelectorAll() - Modern (Preferred)

```javascript
// Returns NodeList (not live)
const items = document.querySelectorAll('.item');
console.log(items);                  // NodeList

// Can use forEach directly
items.forEach(item => {
    console.log(item.textContent);
});

// Complex selectors
const activeLinks = document.querySelectorAll('nav a.active');
const inputs = document.querySelectorAll('input[type="text"], input[type="email"]');
```

---

## 💡 HTMLCollection vs NodeList

```javascript
// HTMLCollection - Live (updates automatically)
const divs = document.getElementsByTagName('div');
console.log(divs.length);            // e.g., 3

const newDiv = document.createElement('div');
document.body.appendChild(newDiv);
console.log(divs.length);            // 4 (automatically updated!)

// NodeList - Static (from querySelectorAll)
const divs2 = document.querySelectorAll('div');
console.log(divs2.length);           // 4

const anotherDiv = document.createElement('div');
document.body.appendChild(anotherDiv);
console.log(divs2.length);           // Still 4 (not updated)

// Convert to Array
const divsArray = Array.from(divs);
const divs2Array = [...divs2];
```

---

## 💡 Element Properties

```javascript
const element = document.querySelector('#title');

// Content
console.log(element.textContent);    // Text only
console.log(element.innerHTML);      // HTML content
console.log(element.outerHTML);      // Element + HTML

// Attributes
console.log(element.id);             // 'title'
console.log(element.className);      // CSS classes as string
console.log(element.classList);      // DOMTokenList

// Style
console.log(element.style);          // CSSStyleDeclaration

// Dimensions
console.log(element.offsetWidth);    // Width including border
console.log(element.offsetHeight);   // Height including border
console.log(element.clientWidth);    // Width excluding border
console.log(element.clientHeight);   // Height excluding border
```

---

## 💡 Traversing DOM

### Parent

```javascript
const child = document.querySelector('.child');

console.log(child.parentElement);    // Parent element
console.log(child.parentNode);       // Parent node
```

### Children

```javascript
const parent = document.querySelector('.parent');

console.log(parent.children);        // HTMLCollection of child elements
console.log(parent.childNodes);      // NodeList (includes text nodes)
console.log(parent.firstElementChild);
console.log(parent.lastElementChild);
```

### Siblings

```javascript
const element = document.querySelector('.middle');

console.log(element.previousElementSibling);
console.log(element.nextElementSibling);
```

### Example

```html
<div class="container">
    <div class="header">Header</div>
    <div class="content">
        <p>Paragraph 1</p>
        <p class="highlight">Paragraph 2</p>
        <p>Paragraph 3</p>
    </div>
    <div class="footer">Footer</div>
</div>
```

```javascript
const highlight = document.querySelector('.highlight');

// Parent
console.log(highlight.parentElement);           // <div class="content">

// Siblings
console.log(highlight.previousElementSibling);  // <p>Paragraph 1</p>
console.log(highlight.nextElementSibling);      // <p>Paragraph 3</p>

// Go up and get siblings of parent
const content = highlight.parentElement;
console.log(content.previousElementSibling);    // <div class="header">
console.log(content.nextElementSibling);        // <div class="footer">
```

---

## ✏️ Bài tập

### Bài tập 1: Accessing Elements

```html
<!DOCTYPE html>
<html>
<body>
    <h1 id="main-title">My Website</h1>
    <div class="container">
        <p class="text">Paragraph 1</p>
        <p class="text highlight">Paragraph 2</p>
        <p class="text">Paragraph 3</p>
    </div>
    <ul id="list">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>
</body>
</html>
```

```javascript
// TODO: 
// 1. Get element với id "main-title"
// 2. Get tất cả elements với class "text"
// 3. Get element đầu tiên có class "highlight"
// 4. Get tất cả <li> elements
// 5. Log ra số lượng paragraphs trong .container
```

**Đáp án**:
```javascript
const mainTitle = document.getElementById('main-title');
// hoặc: document.querySelector('#main-title');

const textElements = document.querySelectorAll('.text');

const highlight = document.querySelector('.highlight');

const listItems = document.querySelectorAll('#list li');

const container = document.querySelector('.container');
const paragraphs = container.querySelectorAll('p');
console.log(paragraphs.length);
```

### Bài tập 2: DOM Traversal

```javascript
// TODO: Từ element .highlight
const highlight = document.querySelector('.highlight');

// 1. Get parent element
// 2. Get previous sibling
// 3. Get next sibling
// 4. Get all siblings (hint: parent.children)
// 5. Check if có class "highlight"
```

**Đáp án**:
```javascript
const highlight = document.querySelector('.highlight');

// 1.
const parent = highlight.parentElement;

// 2.
const prevSibling = highlight.previousElementSibling;

// 3.
const nextSibling = highlight.nextElementSibling;

// 4.
const allSiblings = Array.from(parent.children);

// 5.
const hasHighlight = highlight.classList.contains('highlight');
```

---

## 📝 Tóm tắt

- ✅ DOM là tree structure của HTML
- ✅ document object - root của DOM
- ✅ getElementById, querySelector, querySelectorAll
- ✅ HTMLCollection vs NodeList
- ✅ Element properties (content, attributes, style)
- ✅ DOM traversal (parent, children, siblings)

---

**Bài tiếp theo**: [Bài 17 - Selecting Elements](./Lesson_17_Selecting_Elements.md)

