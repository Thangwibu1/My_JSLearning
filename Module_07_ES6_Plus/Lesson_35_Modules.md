# Bài 35: ES6 Modules

## 📖 Lý thuyết

ES6 Modules cho phép organize code thành separate files và import/export giữa chúng.

---

## 💡 Named Exports

```javascript
// math.js
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export function multiply(a, b) {
    return a * b;
}

// Or export at end
const subtract = (a, b) => a - b;
const divide = (a, b) => a / b;

export { subtract, divide };
```

**Import**:
```javascript
// main.js
import { PI, add, multiply } from './math.js';

console.log(PI);           // 3.14159
console.log(add(2, 3));    // 5

// Import all
import * as math from './math.js';
console.log(math.PI);
console.log(math.add(2, 3));

// Rename imports
import { add as sum } from './math.js';
console.log(sum(2, 3));    // 5
```

---

## 💡 Default Export

```javascript
// user.js
export default class User {
    constructor(name) {
        this.name = name;
    }
}

// Or
class User {
    constructor(name) {
        this.name = name;
    }
}
export default User;
```

**Import**:
```javascript
// main.js
import User from './user.js';

const user = new User('John');
```

---

## 💡 Mixed Exports

```javascript
// api.js
export const API_URL = 'https://api.example.com';

export function get(endpoint) {
    return fetch(`${API_URL}${endpoint}`);
}

export default class API {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
}
```

**Import**:
```javascript
import API, { API_URL, get } from './api.js';
```

---

## 💡 Dynamic Import

```javascript
// Load module dynamically
async function loadModule() {
    const module = await import('./math.js');
    console.log(module.add(2, 3));
}

// Conditional import
if (condition) {
    import('./module1.js').then(module => {
        module.doSomething();
    });
}
```

---

**🎉 HOÀN THÀNH MODULE 7 - ES6+ FEATURES!**

