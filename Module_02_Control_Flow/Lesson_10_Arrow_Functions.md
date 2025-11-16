# Bài 10: Arrow Functions

## 📖 Lý thuyết

**Arrow Functions** (ES6) là cú pháp ngắn gọn hơn để viết functions. Chúng có một số đặc điểm quan trọng khác function thường.

### Syntax

```javascript
// Function declaration
function add(a, b) {
    return a + b;
}

// Arrow function
const add = (a, b) => {
    return a + b;
};

// Arrow function với implicit return
const add = (a, b) => a + b;
```

---

## 💡 Arrow Function Syntax Variations

### 1. Basic Syntax

```javascript
// Multiple parameters
const add = (a, b) => {
    return a + b;
};

// Single parameter - Có thể bỏ ()
const double = num => {
    return num * 2;
};

// No parameters - Phải có ()
const greet = () => {
    return 'Hello!';
};

// Multiple statements
const calculate = (a, b) => {
    const sum = a + b;
    const product = a * b;
    return { sum, product };
};
```

### 2. Implicit Return (Single Expression)

```javascript
// With return keyword
const add = (a, b) => {
    return a + b;
};

// Implicit return - Bỏ {} và return
const add = (a, b) => a + b;

// More examples
const double = num => num * 2;
const greet = () => 'Hello!';
const isEven = num => num % 2 === 0;

// Multiple lines với ()
const calculate = (a, b) => (
    a + b + a * b
);

// Return object - Phải wrap trong ()
const createPerson = (name, age) => ({
    name: name,
    age: age
});

// ❌ Without () - Lỗi vì {} là block, không phải object
const createPerson = (name, age) => { name: name, age: age };
```

### 3. Single Parameter

```javascript
// With ()
const double = (num) => num * 2;

// Without () - Cleaner
const double = num => num * 2;

// Multiple parameters - Phải có ()
const add = (a, b) => a + b;

// No parameters - Phải có ()
const random = () => Math.random();
```

---

## 💡 Arrow Functions vs Regular Functions

### 1. Syntax Difference

```javascript
// Regular function
function greet(name) {
    return `Hello, ${name}!`;
}

// Arrow function
const greet = (name) => `Hello, ${name}!`;

// Regular function expression
const greet = function(name) {
    return `Hello, ${name}!`;
};
```

### 2. `this` Binding (QUAN TRỌNG!)

**Regular function**: `this` phụ thuộc cách gọi function
**Arrow function**: `this` được kế thừa từ lexical scope

```javascript
// Regular function
const person = {
    name: 'John',
    sayHi: function() {
        console.log(`Hi, I'm ${this.name}`);
    }
};

person.sayHi(); // Hi, I'm John

// Arrow function - this không refer đến object
const person2 = {
    name: 'Jane',
    sayHi: () => {
        console.log(`Hi, I'm ${this.name}`); // undefined!
    }
};

person2.sayHi(); // Hi, I'm undefined

// Practical example - Callbacks
const counter = {
    count: 0,
    
    // ❌ Regular function trong setTimeout
    startBad: function() {
        setTimeout(function() {
            this.count++; // this = window/global, không phải counter!
            console.log(this.count);
        }, 1000);
    },
    
    // ✅ Arrow function - this kế thừa từ startGood
    startGood: function() {
        setTimeout(() => {
            this.count++; // this = counter object
            console.log(this.count);
        }, 1000);
    }
};

counter.startBad();  // NaN
counter.startGood(); // 1
```

### 3. `arguments` Object

```javascript
// Regular function có arguments
function sum() {
    console.log(arguments);
    return Array.from(arguments).reduce((a, b) => a + b, 0);
}

sum(1, 2, 3, 4); // 10

// Arrow function KHÔNG có arguments
const sum2 = () => {
    console.log(arguments); // ❌ ReferenceError
};

// Solution: Rest parameters
const sum3 = (...numbers) => {
    return numbers.reduce((a, b) => a + b, 0);
};

sum3(1, 2, 3, 4); // 10
```

### 4. Constructor

```javascript
// Regular function có thể là constructor
function Person(name) {
    this.name = name;
}

const john = new Person('John'); // ✅ OK

// Arrow function KHÔNG thể là constructor
const Person2 = (name) => {
    this.name = name;
};

const jane = new Person2('Jane'); // ❌ TypeError: Person2 is not a constructor
```

### 5. `new.target`

```javascript
// Regular function
function Test() {
    console.log(new.target);
}

new Test(); // function Test
Test();     // undefined

// Arrow function không có new.target
const Test2 = () => {
    console.log(new.target); // Syntax error
};
```

---

## 💡 When to Use Arrow Functions

### ✅ DÙng Arrow Functions

**1. Callbacks và array methods**
```javascript
// Array methods
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(num => num * 2);
const evens = numbers.filter(num => num % 2 === 0);
const sum = numbers.reduce((acc, num) => acc + num, 0);

// Event listeners (khi cần this từ outer scope)
class Button {
    constructor() {
        this.clicked = false;
    }
    
    init() {
        document.querySelector('#btn').addEventListener('click', () => {
            this.clicked = true; // this = Button instance
            console.log('Clicked!');
        });
    }
}
```

**2. Short functions**
```javascript
// Clean và concise
const double = x => x * 2;
const isEven = x => x % 2 === 0;
const greet = name => `Hello, ${name}!`;
```

**3. Promises và async**
```javascript
fetch('/api/users')
    .then(response => response.json())
    .then(users => users.filter(u => u.active))
    .then(activeUsers => console.log(activeUsers))
    .catch(error => console.error(error));

// Async arrow functions
const fetchData = async () => {
    const response = await fetch('/api/data');
    return response.json();
};
```

### ❌ KHÔNG dùng Arrow Functions

**1. Object methods (khi cần `this`)**
```javascript
// ❌ BAD
const person = {
    name: 'John',
    sayHi: () => {
        console.log(`Hi, I'm ${this.name}`); // undefined
    }
};

// ✅ GOOD
const person = {
    name: 'John',
    sayHi() {
        console.log(`Hi, I'm ${this.name}`);
    }
};
```

**2. Dynamic context (event handlers với this)**
```javascript
// ❌ BAD
button.addEventListener('click', () => {
    console.log(this); // window, không phải button
});

// ✅ GOOD
button.addEventListener('click', function() {
    console.log(this); // button element
});
```

**3. Constructors**
```javascript
// ❌ Cannot use arrow function
const Person = (name) => {
    this.name = name;
};

// ✅ Use regular function or class
function Person(name) {
    this.name = name;
}
```

---

## 🔍 Giải thích sâu

### 1. Lexical `this`

```javascript
// Regular function - this phụ thuộc cách gọi
const obj = {
    name: 'Object',
    
    regularMethod: function() {
        console.log(this.name); // 'Object'
        
        function innerFunction() {
            console.log(this.name); // undefined (this = global)
        }
        
        innerFunction();
    }
};

obj.regularMethod();

// Arrow function - this kế thừa từ outer scope
const obj2 = {
    name: 'Object',
    
    arrowMethod: function() {
        console.log(this.name); // 'Object'
        
        const innerArrow = () => {
            console.log(this.name); // 'Object' (kế thừa this)
        };
        
        innerArrow();
    }
};

obj2.arrowMethod();

// Practical: Solving callback this issues
class Timer {
    constructor() {
        this.seconds = 0;
    }
    
    // ❌ BAD - this trong callback là global
    startBad() {
        setInterval(function() {
            this.seconds++; // this = global, không phải Timer
            console.log(this.seconds);
        }, 1000);
    }
    
    // ✅ GOOD - Arrow function kế thừa this
    startGood() {
        setInterval(() => {
            this.seconds++; // this = Timer instance
            console.log(this.seconds);
        }, 1000);
    }
}
```

### 2. Arrow Functions trong Classes

```javascript
class Counter {
    constructor() {
        this.count = 0;
    }
    
    // Regular method
    increment() {
        this.count++;
    }
    
    // Arrow function as class field (ES2022)
    incrementArrow = () => {
        this.count++;
    }
}

const counter = new Counter();

// Regular method - this có thể mất
const inc = counter.increment;
// inc(); // ❌ Error: Cannot read 'count' of undefined

// Arrow function - this luôn bound
const incArrow = counter.incrementArrow;
incArrow(); // ✅ OK - this vẫn là counter
console.log(counter.count); // 1
```

### 3. Performance Considerations

```javascript
// Arrow functions in methods - Tạo function mới mỗi instance
class MyClass {
    method = () => { // Mỗi instance có function riêng
        console.log('Arrow');
    }
}

const obj1 = new MyClass();
const obj2 = new MyClass();
console.log(obj1.method === obj2.method); // false

// Regular methods - Shared trên prototype
class MyClass2 {
    method() { // Shared giữa instances
        console.log('Regular');
    }
}

const obj3 = new MyClass2();
const obj4 = new MyClass2();
console.log(obj3.method === obj4.method); // true
```

---

## ✏️ Bài tập

### Bài tập 1: Convert to Arrow Functions

```javascript
// TODO: Convert sang arrow functions

// 1.
function double(x) {
    return x * 2;
}

// 2.
function greet(name) {
    return `Hello, ${name}!`;
}

// 3.
function sum(a, b, c) {
    return a + b + c;
}

// 4.
function createUser(name, age) {
    return {
        name: name,
        age: age
    };
}

// 5.
function isAdult(age) {
    return age >= 18;
}
```

**Đáp án**:
```javascript
const double = x => x * 2;
const greet = name => `Hello, ${name}!`;
const sum = (a, b, c) => a + b + c;
const createUser = (name, age) => ({ name, age });
const isAdult = age => age >= 18;
```

### Bài tập 2: Array Methods với Arrow Functions

```javascript
const products = [
    { name: 'Laptop', price: 1000, category: 'electronics' },
    { name: 'Phone', price: 500, category: 'electronics' },
    { name: 'Shirt', price: 30, category: 'clothing' },
    { name: 'Shoes', price: 80, category: 'clothing' }
];

// TODO: Sử dụng arrow functions

// 1. Get all product names
const names = // Your code

// 2. Get electronics under $600
const cheapElectronics = // Your code

// 3. Calculate total price
const total = // Your code

// 4. Add 10% tax to all prices
const withTax = // Your code

// 5. Group by category
const grouped = // Your code (hint: reduce)
```

**Đáp án**:
```javascript
const names = products.map(p => p.name);

const cheapElectronics = products.filter(p => 
    p.category === 'electronics' && p.price < 600
);

const total = products.reduce((sum, p) => sum + p.price, 0);

const withTax = products.map(p => ({
    ...p,
    price: p.price * 1.1
}));

const grouped = products.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
}, {});
```

### Bài tập 3: this Context

```javascript
// Dự đoán output:

const obj = {
    name: 'Object',
    
    method1: function() {
        console.log(this.name); // ?
    },
    
    method2: () => {
        console.log(this.name); // ?
    },
    
    method3: function() {
        const inner = () => {
            console.log(this.name); // ?
        };
        inner();
    }
};

obj.method1();
obj.method2();
obj.method3();
```

**Đáp án**:
```javascript
obj.method1(); // 'Object' (regular function, this = obj)
obj.method2(); // undefined (arrow function, this = global)
obj.method3(); // 'Object' (arrow inner kế thừa this từ method3)
```

### Bài tập 4: Fix the Bugs

```javascript
// Bug 1: this issue
const counter = {
    count: 0,
    start: () => {
        setInterval(() => {
            this.count++;
            console.log(this.count);
        }, 1000);
    }
};

// TODO: Fix để counter hoạt động đúng

// Bug 2: Return object
const createUser = (name, age) => { name, age };

// TODO: Fix để return object đúng
```

**Đáp án**:
```javascript
// Bug 1: Fix
const counter = {
    count: 0,
    start: function() { // Change to regular function
        setInterval(() => {
            this.count++;
            console.log(this.count);
        }, 1000);
    }
};

// Bug 2: Fix
const createUser = (name, age) => ({ name, age });
```

### Bài tập 5: Practical - Data Processing

```javascript
const users = [
    { name: 'John', age: 30, active: true, score: 85 },
    { name: 'Jane', age: 25, active: false, score: 92 },
    { name: 'Bob', age: 35, active: true, score: 78 },
    { name: 'Alice', age: 28, active: true, score: 95 }
];

// TODO: Sử dụng arrow functions và method chaining

// 1. Get active users with score >= 80, sorted by score (descending)
const topActiveUsers = // Your code

// 2. Calculate average age of active users
const avgAge = // Your code

// 3. Transform to simple format: [{ name, score }]
const simplified = // Your code

// 4. Find user with highest score
const topUser = // Your code
```

**Đáp án**:
```javascript
const topActiveUsers = users
    .filter(u => u.active && u.score >= 80)
    .sort((a, b) => b.score - a.score);

const avgAge = users
    .filter(u => u.active)
    .reduce((sum, u) => sum + u.age, 0) / users.filter(u => u.active).length;

const simplified = users.map(u => ({ name: u.name, score: u.score }));

const topUser = users.reduce((max, u) => u.score > max.score ? u : max);
```

### Bài tập 6: Event Handlers

```javascript
// TODO: Fix the this issues

class Button {
    constructor(element) {
        this.element = element;
        this.clicks = 0;
        this.init();
    }
    
    init() {
        // ❌ this issue
        this.element.addEventListener('click', function() {
            this.clicks++; // this = element, không phải Button instance
            console.log(`Clicked ${this.clicks} times`);
        });
    }
}

// TODO: Fix bằng arrow function
```

**Đáp án**:
```javascript
class Button {
    constructor(element) {
        this.element = element;
        this.clicks = 0;
        this.init();
    }
    
    init() {
        // ✅ Arrow function
        this.element.addEventListener('click', () => {
            this.clicks++; // this = Button instance
            console.log(`Clicked ${this.clicks} times`);
        });
    }
}
```

### Bài tập 7: Chaining Operations

```javascript
// TODO: Tạo utility functions với arrow functions

// 1. Pipe function - Apply functions từ trái sang phải
const pipe = (...fns) => // Your code
// pipe(f, g, h)(x) = h(g(f(x)))

const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

const compute = pipe(addOne, double, square);
console.log(compute(2)); // ((2+1)*2)^2 = 36

// 2. Compose function - Apply từ phải sang trái
const compose = (...fns) => // Your code
// compose(f, g, h)(x) = f(g(h(x)))

const compute2 = compose(square, double, addOne);
console.log(compute2(2)); // ((2+1)*2)^2 = 36
```

**Đáp án**:
```javascript
const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);

// Test
console.log(compute(2));  // 36
console.log(compute2(2)); // 36
```

---

## 📝 Tóm tắt

Trong bài này bạn đã học:
- ✅ Arrow function syntax và variations
- ✅ Implicit return
- ✅ `this` binding - Lexical vs dynamic
- ✅ Arrow functions vs Regular functions
- ✅ When to use / When NOT to use arrow functions
- ✅ `arguments` object differences
- ✅ Cannot use as constructor
- ✅ Best practices

---

## 🎯 Kiến thức cần nắm vững

Trước khi chuyển sang module tiếp theo:
- [ ] Viết thành thạo arrow function syntax
- [ ] Hiểu rõ sự khác biệt về `this`
- [ ] Biết khi nào dùng arrow, khi nào dùng regular
- [ ] Thành thạo arrow functions với array methods
- [ ] Hiểu lexical `this` binding
- [ ] Tránh pitfalls với arrow functions

---

**🎉 HOÀN THÀNH MODULE 2!**

**Module tiếp theo**: [Module 3 - Objects & Arrays (Deep Dive)](../Module_03_Objects_Arrays/Lesson_11_Objects.md)

---

## 🌟 Review Module 2

Bạn đã hoàn thành Module 2! Review lại:

1. **Bài 06**: Conditionals (if, switch, guard clauses)
2. **Bài 07**: Loops (for, while, for...of)
3. **Bài 08**: Functions (declaration, expression, parameters)
4. **Bài 09**: Scope & Hoisting (global, function, block, closures)
5. **Bài 10**: Arrow Functions (syntax, this, when to use)

**Mini Project**: Tạo TODO list (console-based) sử dụng tất cả concepts đã học!

