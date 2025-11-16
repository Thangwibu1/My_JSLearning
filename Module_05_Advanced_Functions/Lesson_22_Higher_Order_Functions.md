# Bài 22: Higher-Order Functions

## 📖 Lý thuyết

**Higher-Order Function** là function nhận functions khác làm arguments, hoặc return function, hoặc cả hai.

```javascript
// Function nhận function làm argument
function higherOrder(callback) {
    callback();
}

// Function return function
function createMultiplier(multiplier) {
    return function(number) {
        return number * multiplier;
    };
}
```

---

## 💡 Functions as Arguments

```javascript
// map, filter, reduce là higher-order functions
const numbers = [1, 2, 3, 4, 5];

numbers.map(num => num * 2);          // [2, 4, 6, 8, 10]
numbers.filter(num => num > 2);       // [3, 4, 5]
numbers.reduce((sum, num) => sum + num, 0); // 15

// Custom higher-order function
function repeat(n, action) {
    for (let i = 0; i < n; i++) {
        action(i);
    }
}

repeat(3, console.log);  // 0, 1, 2
```

---

## 💡 Functions Returning Functions

```javascript
function createGreeter(greeting) {
    return function(name) {
        return `${greeting}, ${name}!`;
    };
}

const sayHello = createGreeter('Hello');
const sayHi = createGreeter('Hi');

console.log(sayHello('John'));  // Hello, John!
console.log(sayHi('Jane'));     // Hi, Jane!
```

---

## 💡 Practical Examples

### 1. Once Function

```javascript
function once(fn) {
    let called = false;
    let result;
    
    return function(...args) {
        if (!called) {
            called = true;
            result = fn.apply(this, args);
        }
        return result;
    };
}

const initialize = once(() => {
    console.log('Initialized!');
    return 'Init complete';
});

initialize(); // Logs & returns
initialize(); // Just returns (không log)
```

### 2. Memoization

```javascript
function memoize(fn) {
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            return cache.get(key);
        }
        
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

const expensiveCalc = memoize((n) => {
    console.log('Calculating...');
    return n * n;
});

expensiveCalc(5); // Calculating... 25
expensiveCalc(5); // 25 (from cache)
```

---

## ✏️ Bài tập

```javascript
// TODO: Implement debounce function
function debounce(fn, delay) {
    // Your code
}

// TODO: Implement throttle function
function throttle(fn, limit) {
    // Your code
}
```

---

**Bài tiếp theo**: [Bài 23 - Callbacks](./Lesson_23_Callbacks.md)

