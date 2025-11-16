# Bài 41: Errors trong JavaScript

## 📖 Lý thuyết

**Errors** là objects đại diện cho runtime errors trong JavaScript.

---

## 💡 Error Types

```javascript
// ReferenceError - Variable không tồn tại
console.log(nonExistent); // ReferenceError

// TypeError - Wrong type
null.toString(); // TypeError

// SyntaxError - Invalid syntax
// eval('const x = ;'); // SyntaxError

// RangeError - Out of range
const arr = new Array(-1); // RangeError

// URIError - URI functions
decodeURIComponent('%'); // URIError
```

---

## 💡 Error Object

```javascript
const error = new Error('Something went wrong');

console.log(error.name);     // 'Error'
console.log(error.message);  // 'Something went wrong'
console.log(error.stack);    // Stack trace
```

---

**Bài tiếp theo**: [Bài 42 - Try...Catch...Finally](./Lesson_42_Try_Catch.md)

