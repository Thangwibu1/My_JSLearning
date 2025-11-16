# Bài 42: Try...Catch...Finally

## 📖 Lý thuyết

`try...catch...finally` cho phép handle errors gracefully.

---

## 💡 Basic Usage

```javascript
try {
    // Code that might throw error
    const result = riskyOperation();
} catch (error) {
    // Handle error
    console.error('Error occurred:', error.message);
} finally {
    // Always executes
    console.log('Cleanup');
}
```

---

## 💡 Catching Specific Errors

```javascript
try {
    JSON.parse('invalid json');
} catch (error) {
    if (error instanceof SyntaxError) {
        console.log('Invalid JSON');
    } else {
        console.log('Other error');
    }
}
```

---

## 💡 Throwing Errors

```javascript
function divide(a, b) {
    if (b === 0) {
        throw new Error('Cannot divide by zero');
    }
    return a / b;
}

try {
    divide(10, 0);
} catch (error) {
    console.error(error.message);
}
```

---

## 💡 Async Error Handling

```javascript
// Promises
fetch('/api/data')
    .then(r => r.json())
    .catch(error => console.error(error));

// Async/Await
async function fetchData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    } finally {
        console.log('Request completed');
    }
}
```

---

**Bài tiếp theo**: [Bài 43 - Custom Errors](./Lesson_43_Custom_Errors.md)

