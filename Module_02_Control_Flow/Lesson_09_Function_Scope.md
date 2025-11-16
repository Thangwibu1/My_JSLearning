# Bài 09: Function Scope và Hoisting

## 📖 Lý thuyết

**Scope** là phạm vi mà một biến có thể được truy cập. Hiểu rõ scope là chìa khóa để viết code JavaScript tốt.

### Các loại Scope

1. **Global Scope** - Truy cập được ở mọi nơi
2. **Function Scope** - Chỉ trong function
3. **Block Scope** - Chỉ trong block {} (let, const)
4. **Lexical Scope** - Scope được xác định khi viết code

---

## 💡 Global Scope

Biến khai báo ngoài function có global scope.

```javascript
// Global scope
const globalVar = 'I am global';
let globalLet = 'Me too';
var globalOldStyle = 'Old but global';

function test() {
    console.log(globalVar);      // OK - Access được
    console.log(globalLet);      // OK - Access được
    console.log(globalOldStyle); // OK - Access được
}

test();

if (true) {
    console.log(globalVar); // OK - Access được
}

// Global variables trên window object (browser)
// window.globalOldStyle // 'Old but global'
// window.globalVar      // undefined (let/const không lên window)
```

**⚠️ Tránh global variables**:
```javascript
// ❌ BAD - Polluting global scope
var name = 'John';
var age = 30;
var email = 'john@example.com';

// ✅ GOOD - Encapsulate trong object hoặc function
const user = {
    name: 'John',
    age: 30,
    email: 'john@example.com'
};
```

---

## 💡 Function Scope

Biến khai báo trong function chỉ access được trong function đó.

```javascript
function myFunction() {
    const functionVar = 'I am in function';
    let anotherVar = 'Me too';
    var oldStyleVar = 'Also here';
    
    console.log(functionVar);  // OK
    console.log(anotherVar);   // OK
    console.log(oldStyleVar);  // OK
}

myFunction();

// console.log(functionVar);  // ❌ ReferenceError
// console.log(anotherVar);   // ❌ ReferenceError
// console.log(oldStyleVar);  // ❌ ReferenceError

// Nested functions
function outer() {
    const outerVar = 'Outer';
    
    function inner() {
        const innerVar = 'Inner';
        console.log(outerVar);  // OK - Access outer scope
        console.log(innerVar);  // OK - Access own scope
    }
    
    inner();
    // console.log(innerVar);  // ❌ Error - Cannot access inner scope
}

outer();
```

---

## 💡 Block Scope

`let` và `const` có block scope (trong `{}`).

```javascript
// if block
if (true) {
    let blockVar = 'Block scoped';
    const alsoBlock = 'Me too';
    var notBlock = 'I escape!';
    
    console.log(blockVar);   // OK
    console.log(alsoBlock);  // OK
    console.log(notBlock);   // OK
}

// console.log(blockVar);   // ❌ ReferenceError
// console.log(alsoBlock);  // ❌ ReferenceError
console.log(notBlock);      // ✅ OK - var escapes block!

// for loop
for (let i = 0; i < 3; i++) {
    console.log(i); // 0, 1, 2
}
// console.log(i); // ❌ ReferenceError

// vs var
for (var j = 0; j < 3; j++) {
    console.log(j); // 0, 1, 2
}
console.log(j); // 3 - var escapes!

// Block scope với {}
{
    let x = 10;
    const y = 20;
    console.log(x, y); // 10, 20
}
// console.log(x, y); // ❌ Error
```

---

## 💡 Lexical Scope (Static Scope)

Scope được xác định bởi **vị trí viết code**, không phải runtime.

```javascript
const name = 'Global';

function outer() {
    const name = 'Outer';
    
    function inner() {
        const name = 'Inner';
        console.log(name); // 'Inner' - Own scope
    }
    
    inner();
    console.log(name); // 'Outer' - Own scope
}

outer();
console.log(name); // 'Global' - Own scope

// Lexical scope example
function makeCounter() {
    let count = 0;
    
    return function() {
        count++;
        return count;
    };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
// Inner function nhớ biến count từ outer scope
```

---

## 💡 Scope Chain

JavaScript tìm biến theo chuỗi scope từ trong ra ngoài.

```javascript
const global = 'Global';

function level1() {
    const level1Var = 'Level 1';
    
    function level2() {
        const level2Var = 'Level 2';
        
        function level3() {
            const level3Var = 'Level 3';
            
            // Scope chain: level3 → level2 → level1 → global
            console.log(level3Var); // ✅ Own scope
            console.log(level2Var); // ✅ Parent scope
            console.log(level1Var); // ✅ Grandparent scope
            console.log(global);    // ✅ Global scope
        }
        
        level3();
        // console.log(level3Var); // ❌ Cannot access child scope
    }
    
    level2();
}

level1();

// Visualize scope chain
function outer() {
    const x = 10;
    
    function middle() {
        const y = 20;
        
        function inner() {
            const z = 30;
            console.log(x + y + z); // 60
            // inner scope → middle scope → outer scope
        }
        
        inner();
    }
    
    middle();
}

outer();
```

---

## 💡 Hoisting

JavaScript "đưa" declarations lên đầu scope.

### Variable Hoisting

```javascript
// var hoisting
console.log(x); // undefined (không phải ReferenceError!)
var x = 5;
console.log(x); // 5

// Equivalent to:
// var x;            // Declaration hoisted
// console.log(x);   // undefined
// x = 5;            // Assignment stays
// console.log(x);   // 5

// let/const hoisting với TDZ
console.log(y); // ❌ ReferenceError: Cannot access before initialization
let y = 10;

console.log(z); // ❌ ReferenceError
const z = 20;
```

### Function Hoisting

```javascript
// Function Declaration - Hoisted completely
greet(); // ✅ Works! 'Hello'

function greet() {
    console.log('Hello');
}

// Function Expression - NOT hoisted
sayHi(); // ❌ TypeError: sayHi is not a function

var sayHi = function() {
    console.log('Hi');
};

// Why? Because:
// var sayHi;           // Declaration hoisted
// sayHi();             // undefined() → Error!
// sayHi = function(){};// Assignment stays

// let/const function expressions
hello(); // ❌ ReferenceError

const hello = function() {
    console.log('Hello');
};
```

### Hoisting với functions và variables

```javascript
console.log(foo); // function foo()

var foo = 'variable';

function foo() {
    return 'function';
}

console.log(foo); // 'variable'

// Why? Hoisting order:
// 1. Function declarations hoisted first
// 2. Variable declarations hoisted
// 3. Assignments execute in order

// Equivalent to:
// function foo() { return 'function'; }
// var foo;              // Ignored (already declared)
// console.log(foo);     // function
// foo = 'variable';     // Assignment
// console.log(foo);     // 'variable'
```

---

## 🔍 Giải thích sâu

### 1. Variable Shadowing

Biến trong scope nhỏ hơn "che" biến cùng tên ở scope lớn hơn.

```javascript
const name = 'Global';

function test() {
    const name = 'Function'; // Shadows global name
    console.log(name);       // 'Function'
    
    if (true) {
        const name = 'Block';  // Shadows function name
        console.log(name);     // 'Block'
    }
    
    console.log(name); // 'Function'
}

test();
console.log(name); // 'Global'

// Practical example
function calculate(price) {
    const tax = 0.1;
    
    function applyDiscount(discount) {
        const tax = 0.05; // Different tax for discounted items
        return price * (1 - discount) * (1 + tax);
    }
    
    return {
        normal: price * (1 + tax),
        discounted: applyDiscount(0.2)
    };
}

console.log(calculate(100));
// { normal: 110, discounted: 84 }
```

### 2. IIFE và Scope

Immediately Invoked Function Expression tạo scope riêng.

```javascript
// Problem: Global pollution
var counter = 0;
function increment() {
    counter++;
}

// Solution: IIFE
(function() {
    var counter = 0;
    
    window.increment = function() {
        counter++;
        console.log(counter);
    };
})();

increment(); // 1
increment(); // 2
// console.log(counter); // ❌ ReferenceError (nếu không có global counter)

// Modern solution: Block scope
{
    let counter = 0;
    
    window.increment = function() {
        counter++;
        console.log(counter);
    };
}
```

### 3. Closure và Scope

Closure là function nhớ scope nơi nó được tạo.

```javascript
function createMultiplier(multiplier) {
    // multiplier is in closure scope
    return function(number) {
        return number * multiplier;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15

// Each function remembers its own multiplier

// Practical: Private variables
function createBankAccount(initialBalance) {
    let balance = initialBalance; // Private!
    
    return {
        deposit(amount) {
            balance += amount;
            return balance;
        },
        withdraw(amount) {
            if (amount <= balance) {
                balance -= amount;
                return balance;
            }
            return 'Insufficient funds';
        },
        getBalance() {
            return balance;
        }
    };
}

const account = createBankAccount(100);
console.log(account.deposit(50));    // 150
console.log(account.withdraw(30));   // 120
console.log(account.getBalance());   // 120
// console.log(account.balance);     // undefined - Private!
```

---

## ✏️ Bài tập

### Bài tập 1: Scope Prediction

```javascript
// Dự đoán output:

const x = 10;

function test() {
    console.log(x); // ?
    const x = 20;
    console.log(x); // ?
}

test();
console.log(x); // ?
```

**Đáp án**:
```javascript
// ❌ ReferenceError tại console.log(x) đầu tiên
// Vì x trong function có TDZ (temporal dead zone)

// Nếu code là:
const x = 10;

function test() {
    console.log(x); // 10 (access global x)
}

test();
console.log(x); // 10
```

### Bài tập 2: Hoisting Challenge

```javascript
// Dự đoán output:

console.log(a); // ?
console.log(b); // ?
console.log(c); // ?

var a = 1;
let b = 2;
const c = 3;

console.log(a); // ?
console.log(b); // ?
console.log(c); // ?
```

**Đáp án**:
```javascript
console.log(a); // undefined (var hoisted)
console.log(b); // ❌ ReferenceError (TDZ)
console.log(c); // ❌ ReferenceError (TDZ)

var a = 1;
let b = 2;
const c = 3;

console.log(a); // 1
console.log(b); // 2
console.log(c); // 3
```

### Bài tập 3: Function Hoisting

```javascript
// Dự đoán output:

foo(); // ?
bar(); // ?

function foo() {
    console.log('foo');
}

var bar = function() {
    console.log('bar');
};
```

**Đáp án**:
```javascript
foo(); // 'foo' (function declaration hoisted)
bar(); // ❌ TypeError: bar is not a function (var hoisted as undefined)
```

### Bài tập 4: Closure Counter

```javascript
// TODO: Tạo counter với private count
function createCounter(start = 0) {
    // Your code here
    // Return object với methods: increment(), decrement(), getValue()
}

const counter = createCounter(10);
console.log(counter.getValue());  // 10
counter.increment();
console.log(counter.getValue());  // 11
counter.decrement();
console.log(counter.getValue());  // 10
// console.log(counter.count);    // undefined (private!)
```

**Đáp án**:
```javascript
function createCounter(start = 0) {
    let count = start; // Private variable
    
    return {
        increment() {
            count++;
        },
        decrement() {
            count--;
        },
        getValue() {
            return count;
        }
    };
}
```

### Bài tập 5: Scope Chain

```javascript
// Dự đoán output:

const message = 'Global';

function outer() {
    const message = 'Outer';
    
    function middle() {
        function inner() {
            console.log(message); // ?
        }
        
        inner();
    }
    
    middle();
}

outer();
```

**Đáp án**:
```javascript
// 'Outer'
// Scope chain: inner → middle → outer (tìm thấy message) → global
```

### Bài tập 6: Loop Scope Bug

```javascript
// Fix the bug:

// ❌ Bug
var funcs = [];
for (var i = 0; i < 3; i++) {
    funcs.push(function() {
        console.log(i);
    });
}

funcs[0](); // 3 (expected: 0)
funcs[1](); // 3 (expected: 1)
funcs[2](); // 3 (expected: 2)

// TODO: Fix bằng cách dùng let hoặc IIFE
```

**Đáp án**:
```javascript
// Solution 1: let (recommended)
const funcs = [];
for (let i = 0; i < 3; i++) {
    funcs.push(function() {
        console.log(i);
    });
}

// Solution 2: IIFE
var funcs = [];
for (var i = 0; i < 3; i++) {
    funcs.push((function(index) {
        return function() {
            console.log(index);
        };
    })(i));
}

// Solution 3: Closure
var funcs = [];
for (var i = 0; i < 3; i++) {
    funcs.push(createLogger(i));
}

function createLogger(index) {
    return function() {
        console.log(index);
    };
}
```

### Bài tập 7: Module Pattern

```javascript
// TODO: Tạo calculator module với private methods

const calculator = // Your code here
// Public methods: add, subtract, multiply, divide, getHistory
// Private: history array

console.log(calculator.add(5, 3));      // 8
console.log(calculator.multiply(2, 4)); // 8
console.log(calculator.getHistory());   // [8, 8]
// console.log(calculator.history);     // undefined (private!)
```

**Đáp án**:
```javascript
const calculator = (function() {
    const history = []; // Private
    
    function addToHistory(result) {
        history.push(result);
    }
    
    return {
        add(a, b) {
            const result = a + b;
            addToHistory(result);
            return result;
        },
        subtract(a, b) {
            const result = a - b;
            addToHistory(result);
            return result;
        },
        multiply(a, b) {
            const result = a * b;
            addToHistory(result);
            return result;
        },
        divide(a, b) {
            if (b === 0) return 'Cannot divide by zero';
            const result = a / b;
            addToHistory(result);
            return result;
        },
        getHistory() {
            return [...history]; // Return copy
        }
    };
})();
```

### Bài tập 8: Practical - User Session

```javascript
// TODO: Tạo user session manager
function createUserSession() {
    // Private variables: user, loginTime, isAuthenticated
    
    // Public methods:
    // - login(username, password)
    // - logout()
    // - isLoggedIn()
    // - getUser()
    // - getSessionDuration()
}

const session = createUserSession();
console.log(session.isLoggedIn());        // false
session.login('john', 'password123');     // Login successful
console.log(session.isLoggedIn());        // true
console.log(session.getUser());           // 'john'
setTimeout(() => {
    console.log(session.getSessionDuration()); // Duration in seconds
}, 2000);
session.logout();                         // Logged out
console.log(session.isLoggedIn());        // false
```

**Đáp án**:
```javascript
function createUserSession() {
    let user = null;
    let loginTime = null;
    let isAuthenticated = false;
    
    return {
        login(username, password) {
            // Simple validation (in real app, check against database)
            if (username && password) {
                user = username;
                loginTime = Date.now();
                isAuthenticated = true;
                console.log('Login successful');
            } else {
                console.log('Invalid credentials');
            }
        },
        
        logout() {
            user = null;
            loginTime = null;
            isAuthenticated = false;
            console.log('Logged out');
        },
        
        isLoggedIn() {
            return isAuthenticated;
        },
        
        getUser() {
            return isAuthenticated ? user : null;
        },
        
        getSessionDuration() {
            if (!isAuthenticated || !loginTime) return 0;
            return Math.floor((Date.now() - loginTime) / 1000);
        }
    };
}
```

---

## 📝 Tóm tắt

Trong bài này bạn đã học:
- ✅ Global, Function, Block, Lexical scope
- ✅ Scope chain - JavaScript tìm biến như thế nào
- ✅ Hoisting - var, let, const, function hoisting
- ✅ Variable shadowing
- ✅ Closure và scope
- ✅ IIFE và Module pattern
- ✅ Private variables với closures

---

## 🎯 Kiến thức cần nắm vững

Trước khi chuyển sang bài tiếp theo:
- [ ] Hiểu 4 loại scope (global, function, block, lexical)
- [ ] Biết cách scope chain hoạt động
- [ ] Phân biệt hoisting của var, let, const
- [ ] Hiểu function hoisting
- [ ] Biết tạo private variables với closures
- [ ] Hiểu variable shadowing
- [ ] Có thể debug scope issues

---

**Bài tiếp theo**: [Bài 10 - Arrow Functions](./Lesson_10_Arrow_Functions.md)

