# Bài 31: Template Literals

## 📖 Lý thuyết

Template literals (backticks `` ` ``) cho phép string interpolation và multi-line strings.

---

## 💡 Basic Usage

```javascript
// Old way
const name = 'John';
const age = 30;
const message = 'My name is ' + name + ' and I am ' + age + ' years old.';

// New way - Template literals
const message2 = `My name is ${name} and I am ${age} years old.`;

// Expressions
const total = `Total: ${10 + 20}`; // 'Total: 30'
const upper = `NAME: ${name.toUpperCase()}`; // 'NAME: JOHN'
```

---

## 💡 Multi-line Strings

```javascript
// Old way
const html = '<div>\n' +
             '  <h1>Title</h1>\n' +
             '  <p>Content</p>\n' +
             '</div>';

// New way
const html2 = `
<div>
  <h1>Title</h1>
  <p>Content</p>
</div>
`;
```

---

## 💡 Tagged Templates

```javascript
function highlight(strings, ...values) {
    return strings.reduce((result, str, i) => {
        return result + str + (values[i] ? `<mark>${values[i]}</mark>` : '');
    }, '');
}

const name = 'John';
const age = 30;
const result = highlight`My name is ${name} and I'm ${age} years old.`;
// My name is <mark>John</mark> and I'm <mark>30</mark> years old.
```

---

**Bài tiếp theo**: [Bài 32 - Enhanced Object Literals](./Lesson_32_Enhanced_Object_Literals.md)

