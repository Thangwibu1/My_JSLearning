# Bài 48: Event Loop

## 📖 Lý thuyết

**Event Loop** là cơ chế cho phép JavaScript (single-threaded) xử lý async operations một cách non-blocking.

### JavaScript Runtime Components

```
┌─────────────────────────────────────────────────┐
│           JavaScript Runtime                     │
│                                                   │
│  ┌──────────────┐      ┌────────────────────┐  │
│  │  Call Stack  │      │   Web APIs         │  │
│  │              │      │  - setTimeout      │  │
│  │              │      │  - fetch           │  │
│  │              │      │  - DOM events      │  │
│  └──────────────┘      └────────────────────┘  │
│                                                   │
│  ┌──────────────────────────────────────────┐  │
│  │         Event Loop                        │  │
│  └──────────────────────────────────────────┘  │
│                                                   │
│  ┌──────────────┐      ┌────────────────────┐  │
│  │ Callback     │      │  Microtask         │  │
│  │ Queue        │      │  Queue             │  │
│  │ (Macrotasks) │      │  (Promises)        │  │
│  └──────────────┘      └────────────────────┘  │
└─────────────────────────────────────────────────┘
```

---

## 💡 Call Stack

Call stack là nơi JavaScript track function execution.

```javascript
function first() {
    console.log('First');
    second();
    console.log('First again');
}

function second() {
    console.log('Second');
    third();
}

function third() {
    console.log('Third');
}

first();

// Call Stack flow:
// 1. first() pushed
// 2. second() pushed
// 3. third() pushed
// 4. third() popped (done)
// 5. second() popped
// 6. first() popped

// Output:
// First
// Second
// Third
// First again
```

---

## 💡 Event Loop Mechanism

### Synchronous Code

```javascript
console.log('1');
console.log('2');
console.log('3');

// Output: 1, 2, 3 (theo thứ tự)
```

### Asynchronous Code

```javascript
console.log('1');

setTimeout(() => {
    console.log('2');
}, 0);

console.log('3');

// Output: 1, 3, 2 (không phải 1, 2, 3!)

// Why?
// 1. console.log('1') - Execute immediately
// 2. setTimeout - Sent to Web API, callback to Callback Queue
// 3. console.log('3') - Execute immediately
// 4. Call stack empty → Event Loop moves callback to stack
// 5. console.log('2') - Execute
```

---

## 💡 Macrotasks vs Microtasks

### Macrotasks (Task Queue / Callback Queue)

- setTimeout
- setInterval
- setImmediate (Node.js)
- I/O operations
- UI rendering

### Microtasks (Job Queue)

- Promise callbacks (.then, .catch, .finally)
- queueMicrotask()
- MutationObserver
- process.nextTick (Node.js)

**Priority**: Microtasks execute **before** Macrotasks!

```javascript
console.log('1');

setTimeout(() => {
    console.log('2 - Macrotask');
}, 0);

Promise.resolve().then(() => {
    console.log('3 - Microtask');
});

console.log('4');

// Output:
// 1
// 4
// 3 - Microtask (Promise first!)
// 2 - Macrotask (setTimeout last)
```

---

## 💡 Complex Example

```javascript
console.log('Start');

setTimeout(() => {
    console.log('setTimeout 1');
    Promise.resolve().then(() => {
        console.log('Promise inside setTimeout');
    });
}, 0);

Promise.resolve()
    .then(() => {
        console.log('Promise 1');
        setTimeout(() => {
            console.log('setTimeout inside Promise');
        }, 0);
    })
    .then(() => {
        console.log('Promise 2');
    });

setTimeout(() => {
    console.log('setTimeout 2');
}, 0);

console.log('End');

// Output:
// Start
// End
// Promise 1
// Promise 2
// setTimeout 1
// Promise inside setTimeout
// setTimeout 2
// setTimeout inside Promise

// Why this order?
// 1. Sync: Start, End
// 2. Microtasks: Promise 1, Promise 2
// 3. Macrotask: setTimeout 1
// 4. Microtask from setTimeout: Promise inside setTimeout
// 5. Macrotask: setTimeout 2
// 6. Macrotask: setTimeout inside Promise
```

---

## 💡 Execution Order

```
1. Execute synchronous code (Call Stack)
2. Execute ALL Microtasks
3. Execute ONE Macrotask
4. Execute ALL Microtasks (if any added)
5. Repeat from step 3
```

### Visual Example

```javascript
console.log('Script start');

setTimeout(() => {
    console.log('setTimeout');
}, 0);

Promise.resolve()
    .then(() => {
        console.log('Promise 1');
    })
    .then(() => {
        console.log('Promise 2');
    });

console.log('Script end');

// Execution:
// 1. Sync: Script start, Script end
// 2. Microtasks: Promise 1, Promise 2
// 3. Macrotask: setTimeout
```

---

## 💡 Real-World Implications

### 1. Promise vs setTimeout

```javascript
// Which runs first?
setTimeout(() => console.log('setTimeout'), 0);
Promise.resolve().then(() => console.log('Promise'));

// Output:
// Promise (microtask)
// setTimeout (macrotask)
```

### 2. Nested Timers

```javascript
setTimeout(() => {
    console.log('Timer 1');
    setTimeout(() => {
        console.log('Timer 2');
    }, 0);
}, 0);

Promise.resolve().then(() => {
    console.log('Promise 1');
});

// Output:
// Promise 1 (microtask first)
// Timer 1 (first macrotask)
// Timer 2 (second macrotask)
```

### 3. Blocking Event Loop

```javascript
// ❌ BAD - Blocks event loop
function blockEventLoop() {
    const start = Date.now();
    while (Date.now() - start < 3000) {
        // Do nothing for 3 seconds
    }
    console.log('Done blocking');
}

console.log('Start');
blockEventLoop(); // Blocks everything!
console.log('End');

// UI freezes, no events processed for 3 seconds

// ✅ GOOD - Non-blocking
async function nonBlocking() {
    console.log('Start');
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log('Done');
}

nonBlocking();
console.log('End'); // Logs immediately
```

---

## 💡 Common Interview Questions

### Question 1

```javascript
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');

// Output: ???
```

**Answer**: 1, 4, 3, 2

### Question 2

```javascript
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}

async function async2() {
    console.log('async2');
}

console.log('script start');

setTimeout(() => {
    console.log('setTimeout');
}, 0);

async1();

new Promise((resolve) => {
    console.log('promise1');
    resolve();
}).then(() => {
    console.log('promise2');
});

console.log('script end');

// Output: ???
```

**Answer**:
```
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
```

---

## ✏️ Bài tập

### Bài tập 1: Predict Output

```javascript
// Dự đoán output:

console.log('A');

setTimeout(() => console.log('B'), 0);

Promise.resolve()
    .then(() => console.log('C'))
    .then(() => console.log('D'));

setTimeout(() => console.log('E'), 0);

console.log('F');

// Your answer: ???
```

### Bài tập 2: Complex Scenario

```javascript
// Dự đoán output:

console.log('1');

setTimeout(() => {
    console.log('2');
    Promise.resolve().then(() => console.log('3'));
}, 0);

Promise.resolve()
    .then(() => console.log('4'))
    .then(() => {
        console.log('5');
        setTimeout(() => console.log('6'), 0);
    });

console.log('7');

// Your answer: ???
```

---

## 📝 Tóm tắt

- ✅ JavaScript is single-threaded
- ✅ Call Stack tracks function execution
- ✅ Web APIs handle async operations
- ✅ Event Loop moves callbacks to stack
- ✅ Microtasks (Promises) > Macrotasks (setTimeout)
- ✅ Understanding order prevents bugs

---

**🌟 Event Loop là concept nâng cao quan trọng! Hiểu nó giúp debug async code!**

