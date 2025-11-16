# Bài 26: Async JavaScript Basics

## 📖 Lý thuyết

JavaScript là **single-threaded** nhưng có thể xử lý **asynchronous operations** nhờ Event Loop.

---

## 💡 Synchronous vs Asynchronous

```javascript
// Synchronous - Blocking
console.log('1');
console.log('2');
console.log('3');
// Output: 1, 2, 3

// Asynchronous - Non-blocking
console.log('1');
setTimeout(() => console.log('2'), 0);
console.log('3');
// Output: 1, 3, 2
```

---

## 💡 Why Async?

```javascript
// ❌ BAD - Blocking (imagine this is a slow operation)
function getUserSync(id) {
    // Wait 3 seconds...
    return { id, name: 'John' };
}

const user = getUserSync(1); // Blocks everything!
console.log(user);

// ✅ GOOD - Non-blocking
function getUserAsync(id, callback) {
    setTimeout(() => {
        callback({ id, name: 'John' });
    }, 3000);
}

getUserAsync(1, (user) => {
    console.log(user); // Không block!
});
console.log('This runs immediately!');
```

---

## 💡 Common Async Operations

1. **setTimeout / setInterval**
2. **AJAX / Fetch requests**
3. **File operations** (Node.js)
4. **Database queries**
5. **Event listeners**

---

**Bài tiếp theo**: [Bài 27 - Callback Hell](./Lesson_27_Callbacks_Hell.md)

