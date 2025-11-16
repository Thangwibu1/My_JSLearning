# Bài 11: Objects Chi tiết

## 📖 Lý thuyết

**Object** là kiểu dữ liệu phức tạp dùng để lưu trữ collections of data và complex entities. Object là nền tảng của JavaScript!

### Object là gì?

```javascript
// Object là collection của key-value pairs
const person = {
    name: 'John',      // property
    age: 30,           // property
    greet() {          // method
        console.log('Hello!');
    }
};
```

---

## 💡 Creating Objects

### 1. Object Literal (Phổ biến nhất)

```javascript
const person = {
    name: 'John',
    age: 30,
    email: 'john@example.com'
};

// Empty object
const emptyObj = {};

// Nested objects
const user = {
    name: 'Jane',
    address: {
        street: '123 Main St',
        city: 'Ha Noi',
        country: 'Vietnam'
    },
    hobbies: ['reading', 'coding']
};
```

### 2. new Object()

```javascript
const person = new Object();
person.name = 'John';
person.age = 30;

console.log(person); // { name: 'John', age: 30 }
```

### 3. Object.create()

```javascript
const personProto = {
    greet() {
        console.log(`Hello, I'm ${this.name}`);
    }
};

const person = Object.create(personProto);
person.name = 'John';
person.age = 30;

person.greet(); // Hello, I'm John
```

### 4. Constructor Function

```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.greet = function() {
        console.log(`Hi, I'm ${this.name}`);
    };
}

const john = new Person('John', 30);
john.greet(); // Hi, I'm John
```

### 5. Class (ES6)

```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        console.log(`Hi, I'm ${this.name}`);
    }
}

const jane = new Person('Jane', 25);
jane.greet(); // Hi, I'm Jane
```

---

## 💡 Accessing Properties

### Dot Notation

```javascript
const person = {
    name: 'John',
    age: 30
};

console.log(person.name); // 'John'
console.log(person.age);  // 30

// Nested
const user = {
    address: {
        city: 'Ha Noi'
    }
};

console.log(user.address.city); // 'Ha Noi'
```

### Bracket Notation

```javascript
const person = {
    name: 'John',
    age: 30,
    'favorite color': 'blue' // Space in key
};

console.log(person['name']); // 'John'
console.log(person['favorite color']); // 'blue'

// Dynamic property access
const prop = 'age';
console.log(person[prop]); // 30

// Computed property
const key = 'na' + 'me';
console.log(person[key]); // 'John'
```

### Optional Chaining (?.) - ES2020

```javascript
const user = {
    name: 'John'
    // address không tồn tại
};

// ❌ Without optional chaining
// console.log(user.address.city); // TypeError

// ✅ With optional chaining
console.log(user.address?.city); // undefined (không lỗi)

// Nested chaining
console.log(user.address?.city?.name); // undefined

// With functions
console.log(user.greet?.()); // undefined (không lỗi)
```

---

## 💡 Adding/Modifying/Deleting Properties

### Adding và Modifying

```javascript
const person = {
    name: 'John'
};

// Add new property
person.age = 30;
person['email'] = 'john@example.com';

// Modify existing
person.name = 'Jane';

console.log(person);
// { name: 'Jane', age: 30, email: 'john@example.com' }

// Computed property names (ES6)
const propName = 'score';
person[propName] = 95;

console.log(person.score); // 95
```

### Deleting Properties

```javascript
const person = {
    name: 'John',
    age: 30,
    email: 'john@example.com'
};

delete person.email;
console.log(person); // { name: 'John', age: 30 }

// Check if property exists
console.log('email' in person); // false
console.log('name' in person);  // true
```

---

## 💡 Methods

Functions trong objects gọi là methods.

```javascript
const calculator = {
    value: 0,
    
    add(num) {
        this.value += num;
        return this; // Method chaining
    },
    
    subtract(num) {
        this.value -= num;
        return this;
    },
    
    multiply(num) {
        this.value *= num;
        return this;
    },
    
    getValue() {
        return this.value;
    }
};

// Method chaining
calculator.add(10).multiply(2).subtract(5);
console.log(calculator.getValue()); // 15

// Shorthand method syntax (ES6)
const obj = {
    // Old way
    method1: function() {
        console.log('Method 1');
    },
    
    // New way (preferred)
    method2() {
        console.log('Method 2');
    }
};
```

---

## 💡 Enhanced Object Literals (ES6)

### 1. Property Shorthand

```javascript
const name = 'John';
const age = 30;

// Old way
const person1 = {
    name: name,
    age: age
};

// New way (ES6)
const person2 = {
    name,
    age
};

console.log(person2); // { name: 'John', age: 30 }
```

### 2. Method Shorthand

```javascript
// Old way
const obj1 = {
    greet: function() {
        console.log('Hello');
    }
};

// New way
const obj2 = {
    greet() {
        console.log('Hello');
    }
};
```

### 3. Computed Property Names

```javascript
const propName = 'score';
const prefix = 'user';

const obj = {
    [propName]: 95,
    [`${prefix}Name`]: 'John',
    [`${prefix}Age`]: 30
};

console.log(obj);
// { score: 95, userName: 'John', userAge: 30 }

// Dynamic method names
const methodName = 'greet';

const obj2 = {
    [methodName]() {
        console.log('Hello!');
    }
};

obj2.greet(); // Hello!
```

---

## 💡 Object Methods

### Object.keys(), values(), entries()

```javascript
const person = {
    name: 'John',
    age: 30,
    city: 'Ha Noi'
};

// Get all keys
const keys = Object.keys(person);
console.log(keys); // ['name', 'age', 'city']

// Get all values
const values = Object.values(person);
console.log(values); // ['John', 30, 'Ha Noi']

// Get all entries [key, value] pairs
const entries = Object.entries(person);
console.log(entries);
// [['name', 'John'], ['age', 30], ['city', 'Ha Noi']]

// Iterate over object
for (const key of Object.keys(person)) {
    console.log(`${key}: ${person[key]}`);
}

// With entries
for (const [key, value] of Object.entries(person)) {
    console.log(`${key}: ${value}`);
}
```

### Object.assign() - Copying và Merging

```javascript
// Copying object
const original = { a: 1, b: 2 };
const copy = Object.assign({}, original);

console.log(copy); // { a: 1, b: 2 }
console.log(copy === original); // false (different objects)

// Merging objects
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const obj3 = { d: 5 };

const merged = Object.assign({}, obj1, obj2, obj3);
console.log(merged); // { a: 1, b: 3, c: 4, d: 5 }
// Note: obj2.b ghi đè obj1.b

// ⚠️ Shallow copy only
const original2 = {
    name: 'John',
    address: {
        city: 'Ha Noi'
    }
};

const copy2 = Object.assign({}, original2);
copy2.address.city = 'HCM';

console.log(original2.address.city); // 'HCM' (bị thay đổi!)
```

### Spread Operator (...)  - Modern way

```javascript
// Copy
const original = { a: 1, b: 2 };
const copy = { ...original };

// Merge
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const merged = { ...obj1, ...obj2 };

console.log(merged); // { a: 1, b: 3, c: 4 }

// Add properties
const person = { name: 'John' };
const enhanced = {
    ...person,
    age: 30,
    city: 'Ha Noi'
};

console.log(enhanced);
// { name: 'John', age: 30, city: 'Ha Noi' }
```

### Object.freeze() và Object.seal()

```javascript
// Object.freeze() - Không thể thay đổi
const frozen = Object.freeze({
    name: 'John',
    age: 30
});

frozen.age = 40;           // Không có effect
frozen.email = 'john@...'; // Không add được
delete frozen.name;        // Không delete được

console.log(frozen); // { name: 'John', age: 30 }

// Object.seal() - Có thể modify, không thể add/delete
const sealed = Object.seal({
    name: 'Jane',
    age: 25
});

sealed.age = 30;           // ✅ OK - Modify được
sealed.email = 'jane@...'; // ❌ Không add được
delete sealed.name;        // ❌ Không delete được

console.log(sealed); // { name: 'Jane', age: 30 }
```

---

## 🔍 Giải thích sâu

### 1. Objects are Reference Types

```javascript
// Primitives - Copy by value
let a = 5;
let b = a;
a = 10;
console.log(b); // 5 (không thay đổi)

// Objects - Copy by reference
let obj1 = { name: 'John' };
let obj2 = obj1;
obj1.name = 'Jane';
console.log(obj2.name); // 'Jane' (cùng object!)

// Comparison
const obj3 = { name: 'John' };
const obj4 = { name: 'John' };
console.log(obj3 === obj4); // false (different references)

// Same reference
const obj5 = obj3;
console.log(obj3 === obj5); // true
```

### 2. this Keyword trong Objects

```javascript
const person = {
    name: 'John',
    age: 30,
    
    greet() {
        console.log(`Hi, I'm ${this.name}`); // this = person
    },
    
    greetArrow: () => {
        console.log(`Hi, I'm ${this.name}`); // this = global!
    }
};

person.greet();      // Hi, I'm John
person.greetArrow(); // Hi, I'm undefined

// this trong nested functions
const obj = {
    name: 'Object',
    
    method() {
        console.log(this.name); // 'Object'
        
        function innerFunction() {
            console.log(this.name); // undefined (this = global)
        }
        
        const innerArrow = () => {
            console.log(this.name); // 'Object' (kế thừa this)
        };
        
        innerFunction();
        innerArrow();
    }
};

obj.method();
```

### 3. Getters và Setters

```javascript
const person = {
    firstName: 'John',
    lastName: 'Doe',
    
    // Getter
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },
    
    // Setter
    set fullName(value) {
        const parts = value.split(' ');
        this.firstName = parts[0];
        this.lastName = parts[1];
    }
};

// Use like property (không phải method!)
console.log(person.fullName); // 'John Doe'

person.fullName = 'Jane Smith';
console.log(person.firstName); // 'Jane'
console.log(person.lastName);  // 'Smith'

// Practical: Validation
const account = {
    _balance: 0, // Convention: _ means private
    
    get balance() {
        return this._balance;
    },
    
    set balance(value) {
        if (value < 0) {
            throw new Error('Balance cannot be negative');
        }
        this._balance = value;
    }
};

account.balance = 100;
console.log(account.balance); // 100

// account.balance = -50; // Error!
```

---

## ✏️ Bài tập

### Bài tập 1: Object Basics

```javascript
// TODO: Tạo object student với:
// - name, age, grade
// - method introduce() log thông tin
// - method isPass() return true nếu grade >= 60

const student = // Your code

student.introduce(); // "I'm John, 20 years old, grade: 85"
console.log(student.isPass()); // true
```

**Đáp án**:
```javascript
const student = {
    name: 'John',
    age: 20,
    grade: 85,
    
    introduce() {
        console.log(`I'm ${this.name}, ${this.age} years old, grade: ${this.grade}`);
    },
    
    isPass() {
        return this.grade >= 60;
    }
};
```

### Bài tập 2: Object Methods

```javascript
const users = [
    { id: 1, name: 'John', age: 30 },
    { id: 2, name: 'Jane', age: 25 },
    { id: 3, name: 'Bob', age: 35 }
];

// TODO: Implement các functions

// 1. Get user by id
function getUserById(users, id) {
    // Your code
}

// 2. Get user names
function getUserNames(users) {
    // Return array of names
}

// 3. Get average age
function getAverageAge(users) {
    // Your code
}

// 4. Add new user
function addUser(users, user) {
    // Generate id tự động (max id + 1)
}
```

**Đáp án**:
```javascript
function getUserById(users, id) {
    return users.find(u => u.id === id);
}

function getUserNames(users) {
    return users.map(u => u.name);
}

function getAverageAge(users) {
    return users.reduce((sum, u) => sum + u.age, 0) / users.length;
}

function addUser(users, user) {
    const maxId = Math.max(...users.map(u => u.id));
    users.push({ ...user, id: maxId + 1 });
}
```

### Bài tập 3: Object Cloning

```javascript
const original = {
    name: 'John',
    age: 30,
    address: {
        city: 'Ha Noi',
        country: 'Vietnam'
    },
    hobbies: ['reading', 'coding']
};

// TODO: Deep clone object (không share references)
function deepClone(obj) {
    // Your code
}

const cloned = deepClone(original);
cloned.address.city = 'HCM';
cloned.hobbies.push('gaming');

console.log(original.address.city); // 'Ha Noi' (không đổi)
console.log(original.hobbies);      // ['reading', 'coding'] (không đổi)
```

**Đáp án**:
```javascript
function deepClone(obj) {
    // Simple way (có limitations)
    return JSON.parse(JSON.stringify(obj));
    
    // Better way (recursive)
    if (obj === null || typeof obj !== 'object') return obj;
    
    if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item));
    }
    
    const cloned = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloned[key] = deepClone(obj[key]);
        }
    }
    return cloned;
}
```

### Bài tập 4: Practical - Shopping Cart

```javascript
// TODO: Tạo shopping cart object
const cart = {
    items: [],
    
    addItem(product, quantity) {
        // Add hoặc update quantity
    },
    
    removeItem(productId) {
        // Remove item
    },
    
    updateQuantity(productId, quantity) {
        // Update quantity
    },
    
    getTotal() {
        // Calculate total price
    },
    
    getItemCount() {
        // Return tổng số items
    },
    
    clear() {
        // Clear cart
    }
};

// Test
cart.addItem({ id: 1, name: 'Laptop', price: 1000 }, 1);
cart.addItem({ id: 2, name: 'Mouse', price: 20 }, 2);
console.log(cart.getTotal());     // 1040
console.log(cart.getItemCount()); // 3
cart.updateQuantity(2, 3);
console.log(cart.getTotal());     // 1060
```

**Đáp án**: Xem trong file đầy đủ...

---

## 📝 Tóm tắt

- ✅ Object creation (literal, new, Object.create, constructor, class)
- ✅ Property access (dot, bracket, optional chaining)
- ✅ Enhanced object literals (ES6)
- ✅ Object methods (keys, values, entries, assign, freeze, seal)
- ✅ Reference type behavior
- ✅ this keyword
- ✅ Getters và Setters

---

**Bài tiếp theo**: [Bài 12 - Arrays và methods](./Lesson_12_Arrays.md)

