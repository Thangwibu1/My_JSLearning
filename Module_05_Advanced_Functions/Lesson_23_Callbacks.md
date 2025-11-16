# Bài 23: Callback Functions

## 📖 Lý thuyết

**Callback** là function được pass làm argument cho function khác và được execute sau khi operation hoàn thành.

```javascript
function doSomething(callback) {
    // Do something...
    callback();
}

doSomething(() => {
    console.log('Done!');
});
```

---

## 💡 Synchronous Callbacks

```javascript
// Array methods
[1, 2, 3].forEach(num => console.log(num));

// Custom callback
function processArray(arr, callback) {
    const result = [];
    for (let item of arr) {
        result.push(callback(item));
    }
    return result;
}

processArray([1, 2, 3], num => num * 2); // [2, 4, 6]
```

---

## 💡 Asynchronous Callbacks

```javascript
// setTimeout
setTimeout(() => {
    console.log('After 1 second');
}, 1000);

// Event listeners
button.addEventListener('click', () => {
    console.log('Clicked!');
});

// API callback (old style)
function fetchData(url, callback) {
    // Simulate API call
    setTimeout(() => {
        const data = { id: 1, name: 'John' };
        callback(null, data); // Error-first callback
    }, 1000);
}

fetchData('/api/users/1', (error, data) => {
    if (error) {
        console.error(error);
    } else {
        console.log(data);
    }
});
```

---

## 💡 Callback Hell (Pyramid of Doom)

```javascript
// ❌ BAD - Callback hell
getData(function(a) {
    getMoreData(a, function(b) {
        getMoreData(b, function(c) {
            getMoreData(c, function(d) {
                getMoreData(d, function(e) {
                    // ...
                });
            });
        });
    });
});

// ✅ SOLUTION 1: Named functions
function step1(a) {
    getMoreData(a, step2);
}
function step2(b) {
    getMoreData(b, step3);
}
// ...

getData(step1);

// ✅ SOLUTION 2: Promises (better)
getData()
    .then(a => getMoreData(a))
    .then(b => getMoreData(b))
    .then(c => getMoreData(c));

// ✅ SOLUTION 3: Async/Await (best)
async function fetchAll() {
    const a = await getData();
    const b = await getMoreData(a);
    const c = await getMoreData(b);
}
```

---

**Bài tiếp theo**: [Bài 24 - IIFE](./Lesson_24_IIFE.md)

