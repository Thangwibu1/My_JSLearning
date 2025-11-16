# Bài 21: Closures

## 📖 Lý thuyết

**Closure** là một trong những concepts quan trọng và mạnh mẽ nhất trong JavaScript. 

**Definition**: Closure là function có thể "nhớ" và truy cập lexical scope của nó, ngay cả khi function đó execute bên ngoài lexical scope đó.

```javascript
function outer() {
    const message = 'Hello';
    
    function inner() {
        console.log(message); // Access outer's variable
    }
    
    return inner;
}

const myFunction = outer();
myFunction(); // 'Hello' - Vẫn access được message!
```

---

## 💡 Closures Basics

### Example 1: Simple Closure

```javascript
function createGreeter(name) {
    // name is in closure scope
    return function() {
        console.log(`Hello, ${name}!`);
    };
}

const greetJohn = createGreeter('John');
const greetJane = createGreeter('Jane');

greetJohn(); // Hello, John!
greetJane(); // Hello, Jane!

// Mỗi function "nhớ" name riêng của nó
```

### Example 2: Counter với Closure

```javascript
function createCounter() {
    let count = 0; // Private variable
    
    return {
        increment() {
            count++;
            return count;
        },
        decrement() {
            count--;
            return count;
        },
        getCount() {
            return count;
        }
    };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2
console.log(counter.decrement()); // 1

// Cannot access count directly
console.log(counter.count); // undefined

const counter2 = createCounter();
console.log(counter2.getCount()); // 0 (independent)
```

---

## 💡 Practical Uses

### 1. Data Privacy / Encapsulation

```javascript
function createBankAccount(initialBalance) {
    let balance = initialBalance; // Private!
    
    return {
        deposit(amount) {
            if (amount > 0) {
                balance += amount;
                return balance;
            }
            throw new Error('Amount must be positive');
        },
        
        withdraw(amount) {
            if (amount > balance) {
                throw new Error('Insufficient funds');
            }
            balance -= amount;
            return balance;
        },
        
        getBalance() {
            return balance;
        }
    };
}

const account = createBankAccount(100);
console.log(account.deposit(50));   // 150
console.log(account.withdraw(30));  // 120
console.log(account.getBalance());  // 120

// Cannot access balance directly
console.log(account.balance); // undefined
// account.balance = 1000000; // Không work!
```

### 2. Factory Functions

```javascript
function createCalculator() {
    let result = 0;
    
    return {
        add(num) {
            result += num;
            return this;
        },
        subtract(num) {
            result -= num;
            return this;
        },
        multiply(num) {
            result *= num;
            return this;
        },
        divide(num) {
            result /= num;
            return this;
        },
        getResult() {
            return result;
        },
        clear() {
            result = 0;
            return this;
        }
    };
}

const calc = createCalculator();
calc.add(10).multiply(2).subtract(5);
console.log(calc.getResult()); // 15
```

### 3. Module Pattern

```javascript
const todoModule = (function() {
    // Private variables
    const todos = [];
    let idCounter = 0;
    
    // Private functions
    function generateId() {
        return ++idCounter;
    }
    
    // Public API
    return {
        add(text) {
            const todo = {
                id: generateId(),
                text,
                completed: false
            };
            todos.push(todo);
            return todo;
        },
        
        remove(id) {
            const index = todos.findIndex(t => t.id === id);
            if (index > -1) {
                todos.splice(index, 1);
                return true;
            }
            return false;
        },
        
        toggle(id) {
            const todo = todos.find(t => t.id === id);
            if (todo) {
                todo.completed = !todo.completed;
                return true;
            }
            return false;
        },
        
        getAll() {
            return [...todos]; // Return copy
        },
        
        getCompleted() {
            return todos.filter(t => t.completed);
        }
    };
})();

// Usage
todoModule.add('Learn JavaScript');
todoModule.add('Build app');
console.log(todoModule.getAll());
// Cannot access todos directly
// console.log(todoModule.todos); // undefined
```

### 4. Partial Application & Currying

```javascript
// Partial application
function multiply(a, b) {
    return a * b;
}

function createMultiplier(multiplier) {
    return function(number) {
        return multiply(multiplier, number);
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15

// Currying
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function(...args2) {
                return curried.apply(this, args.concat(args2));
            };
        }
    };
}

function sum(a, b, c) {
    return a + b + c;
}

const curriedSum = curry(sum);
console.log(curriedSum(1)(2)(3));   // 6
console.log(curriedSum(1, 2)(3));   // 6
console.log(curriedSum(1, 2, 3));   // 6
```

### 5. Event Handlers với Closure

```javascript
function createButtonHandlers() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach((button, index) => {
        // Closure remembers index
        button.addEventListener('click', function() {
            console.log(`Button ${index} clicked`);
            // index is captured in closure
        });
    });
}

// Without closure (var issue)
function problematicHandlers() {
    const buttons = document.querySelectorAll('.btn');
    
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            console.log(`Button ${i} clicked`);
            // i will always be buttons.length!
        });
    }
}
```

### 6. Memoization (Caching)

```javascript
function memoize(fn) {
    const cache = {};
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache[key]) {
            console.log('From cache');
            return cache[key];
        }
        
        console.log('Computing...');
        const result = fn.apply(this, args);
        cache[key] = result;
        return result;
    };
}

// Expensive function
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoizedFib = memoize(fibonacci);

console.log(memoizedFib(10)); // Computing... 55
console.log(memoizedFib(10)); // From cache 55
```

---

## 🔍 Giải thích sâu

### 1. Lexical Scope

```javascript
const global = 'Global';

function outer() {
    const outerVar = 'Outer';
    
    function middle() {
        const middleVar = 'Middle';
        
        function inner() {
            const innerVar = 'Inner';
            
            // Closure has access to all outer scopes
            console.log(innerVar);  // Own scope
            console.log(middleVar); // Parent scope
            console.log(outerVar);  // Grandparent scope
            console.log(global);    // Global scope
        }
        
        return inner;
    }
    
    return middle();
}

const myFunction = outer();
myFunction();
```

### 2. Common Interview Question

```javascript
// Problem
for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i); // 3, 3, 3 (all log 3!)
    }, 1000);
}

// Solution 1: Use let (block scope)
for (let i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i); // 0, 1, 2
    }, 1000);
}

// Solution 2: IIFE creates closure
for (var i = 0; i < 3; i++) {
    (function(index) {
        setTimeout(function() {
            console.log(index); // 0, 1, 2
        }, 1000);
    })(i);
}

// Solution 3: Additional parameter
for (var i = 0; i < 3; i++) {
    setTimeout(function(index) {
        console.log(index); // 0, 1, 2
    }, 1000, i);
}
```

---

## ✏️ Bài tập

### Bài tập 1: Create Secret Keeper

```javascript
// TODO: Create function keeps a secret
function createSecretKeeper(secret) {
    // Private secret variable
    
    return {
        getSecret(password) {
            // Return secret if password is '1234'
            // Otherwise return 'Wrong password'
        },
        changeSecret(password, newSecret) {
            // Change secret if password correct
        }
    };
}

const keeper = createSecretKeeper('My secret');
console.log(keeper.getSecret('wrong'));  // Wrong password
console.log(keeper.getSecret('1234'));   // My secret
keeper.changeSecret('1234', 'New secret');
console.log(keeper.getSecret('1234'));   // New secret
```

**Đáp án**:
```javascript
function createSecretKeeper(secret) {
    let _secret = secret;
    const PASSWORD = '1234';
    
    return {
        getSecret(password) {
            return password === PASSWORD ? _secret : 'Wrong password';
        },
        changeSecret(password, newSecret) {
            if (password === PASSWORD) {
                _secret = newSecret;
                return true;
            }
            return false;
        }
    };
}
```

### Bài tập 2: Counter with Limit

```javascript
// TODO: Create counter với max limit
function createLimitedCounter(limit) {
    // Return object với increment(), decrement(), get(), reset()
    // Count không vượt quá limit
}

const counter = createLimitedCounter(10);
counter.increment(); // 1
// ... 
// counter không vượt quá 10
```

### Bài tập 3: Function Generator

```javascript
// TODO: Create multiplier factory
function createMultiplier(multiplier) {
    // Return function nhân number với multiplier
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15
```

---

## 📝 Tóm tắt

- ✅ Closure là function nhớ lexical scope
- ✅ Data privacy / Encapsulation
- ✅ Factory functions
- ✅ Module pattern
- ✅ Event handlers
- ✅ Memoization
- ✅ Common pitfalls với var

---

**🌟 Closures là một trong những concepts quan trọng nhất! Master nó!**

**Bài tiếp theo**: [Bài 22 - Higher-Order Functions](./Lesson_22_Higher_Order_Functions.md)

