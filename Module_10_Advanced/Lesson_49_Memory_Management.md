# Bài 49: Memory Management

## 📖 Lý thuyết

JavaScript tự động manage memory thông qua **Garbage Collection**, nhưng vẫn có thể có **memory leaks**.

---

## 💡 Memory Lifecycle

1. **Allocate** - OS allocates memory
2. **Use** - Code reads/writes to memory
3. **Release** - Memory được freed khi không cần

---

## 💡 Garbage Collection

JavaScript sử dụng **Mark-and-Sweep** algorithm:

```javascript
let obj = { data: 'Some data' }; // Allocated

obj = null; // No longer referenced → Will be collected
```

---

## 💡 Common Memory Leaks

### 1. Global Variables

```javascript
// ❌ Accidental global
function leak() {
    leakyVar = 'Oops'; // No var/let/const!
}

// ✅ Proper scope
function noLeak() {
    let properVar = 'Good';
}
```

### 2. Forgotten Timers

```javascript
// ❌ Memory leak
setInterval(() => {
    const hugeData = new Array(1000000);
    // hugeData never freed!
}, 1000);

// ✅ Clear when done
const intervalId = setInterval(() => {
    // ...
}, 1000);

clearInterval(intervalId); // Clean up!
```

### 3. Event Listeners

```javascript
// ❌ Leak
element.addEventListener('click', handler);
// If element removed but listener not removed

// ✅ Clean up
element.removeEventListener('click', handler);
```

### 4. Closures

```javascript
// ❌ Potential leak
function outer() {
    const hugeArray = new Array(1000000);
    
    return function inner() {
        console.log(hugeArray.length);
        // hugeArray kept in memory even if not needed
    };
}
```

---

## 💡 WeakMap & WeakSet

```javascript
// Regular Map - Strong references
const map = new Map();
let obj = { data: 'value' };
map.set(obj, 'some value');
obj = null; // Object still in Map!

// WeakMap - Weak references
const weakMap = new WeakMap();
let obj2 = { data: 'value' };
weakMap.set(obj2, 'some value');
obj2 = null; // Object can be garbage collected
```

---

## 💡 Best Practices

1. Use `let`/`const` (not global variables)
2. Clear timers và intervals
3. Remove event listeners
4. Be careful với closures
5. Use WeakMap/WeakSet khi appropriate

---

**Bài tiếp theo**: [Bài 50 - Performance Optimization](./Lesson_50_Performance.md)

