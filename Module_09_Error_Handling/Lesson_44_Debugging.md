# Bài 44: Debugging Techniques

## 📖 Lý thuyết

Debugging là process tìm và fix bugs trong code.

---

## 💡 Console Methods

```javascript
// Basic logging
console.log('Value:', value);
console.warn('Warning message');
console.error('Error message');
console.info('Info message');

// Table
console.table([
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 }
]);

// Group
console.group('User Details');
console.log('Name:', 'John');
console.log('Age:', 30);
console.groupEnd();

// Time
console.time('operation');
// ... code ...
console.timeEnd('operation');

// Trace
function a() { b(); }
function b() { c(); }
function c() { console.trace(); }
a(); // Shows call stack
```

---

## 💡 Debugger Statement

```javascript
function calculate(a, b) {
    debugger; // Pause execution here
    return a + b;
}
```

---

## 💡 Chrome DevTools

- **Sources tab** - Set breakpoints
- **Console tab** - Run commands
- **Network tab** - Monitor requests
- **Performance tab** - Profile performance

---

**Bài tiếp theo**: [Bài 45 - Console Methods](./Lesson_45_Console_Methods.md)

