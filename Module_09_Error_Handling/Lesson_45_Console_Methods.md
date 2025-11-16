# Bài 45: Console Methods Chi tiết

## 📖 Lý thuyết

Console object cung cấp nhiều methods hữu ích cho debugging.

---

## 💡 Logging Methods

```javascript
// Basic
console.log('Log');
console.info('Info');
console.warn('Warning');
console.error('Error');

// Multiple values
console.log('Name:', name, 'Age:', age);

// Styled (browser only)
console.log('%cStyled!', 'color: red; font-size: 20px;');
```

---

## 💡 Grouping

```javascript
console.group('Outer Group');
console.log('Inside outer');

console.group('Inner Group');
console.log('Inside inner');
console.groupEnd();

console.groupEnd();

// Collapsed by default
console.groupCollapsed('Collapsed Group');
console.log('Hidden initially');
console.groupEnd();
```

---

## 💡 Table

```javascript
const users = [
    { id: 1, name: 'John', age: 30 },
    { id: 2, name: 'Jane', age: 25 }
];

console.table(users);

// Specific columns
console.table(users, ['name', 'age']);
```

---

## 💡 Timing

```javascript
console.time('operation');
for (let i = 0; i < 1000000; i++) {
    // Some operation
}
console.timeEnd('operation');
// operation: 15.234ms
```

---

## 💡 Assertions

```javascript
const x = 5;
console.assert(x === 10, 'x is not 10');
// Assertion failed: x is not 10
```

---

## 💡 Count

```javascript
function greet(name) {
    console.count(name);
}

greet('John'); // John: 1
greet('Jane'); // Jane: 1
greet('John'); // John: 2

console.countReset('John');
greet('John'); // John: 1
```

---

## 💡 Clear

```javascript
console.clear(); // Clear console
```

---

**🎉 HOÀN THÀNH MODULE 9 - ERROR HANDLING!**

