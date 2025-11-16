# Bài 15: Spread & Rest Operators

## 📖 Lý thuyết

**Spread** (`...`) và **Rest** (`...`) đều dùng syntax `...` nhưng khác mục đích:
- **Spread**: "Mở rộng" array/object thành individual elements
- **Rest**: "Thu gom" individual elements thành array/object

---

## 💡 Spread Operator

### 1. Spread với Arrays

```javascript
const arr = [1, 2, 3];

// Expand array
console.log(...arr); // 1, 2, 3 (không phải [1, 2, 3])

// Copy array
const copy = [...arr];
copy.push(4);
console.log(arr);  // [1, 2, 3] (không thay đổi)
console.log(copy); // [1, 2, 3, 4]

// Merge arrays
const arr1 = [1, 2];
const arr2 = [3, 4];
const merged = [...arr1, ...arr2];
console.log(merged); // [1, 2, 3, 4]

// Insert elements
const arr3 = [1, 2, 5];
const arr4 = [1, 2, 3, 4, 5];
const inserted = [...arr3.slice(0, 2), 3, 4, ...arr3.slice(2)];
console.log(inserted); // [1, 2, 3, 4, 5]
```

### 2. Spread với Objects

```javascript
const obj = { a: 1, b: 2 };

// Copy object
const copy = { ...obj };
copy.c = 3;
console.log(obj);  // { a: 1, b: 2 }
console.log(copy); // { a: 1, b: 2, c: 3 }

// Merge objects
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 };
console.log(merged); // { a: 1, b: 2, c: 3, d: 4 }

// Override properties
const obj3 = { a: 1, b: 2 };
const obj4 = { b: 3, c: 4 };
const merged2 = { ...obj3, ...obj4 };
console.log(merged2); // { a: 1, b: 3, c: 4 } (obj4.b override obj3.b)

// Add/override properties
const user = { name: 'John', age: 30 };
const updated = { ...user, age: 31, city: 'Ha Noi' };
console.log(updated);
// { name: 'John', age: 31, city: 'Ha Noi' }
```

### 3. Spread trong Function Calls

```javascript
const numbers = [5, 2, 8, 1, 9];

// Old way
Math.max.apply(null, numbers);

// New way
Math.max(...numbers); // 9
Math.min(...numbers); // 1

function sum(a, b, c) {
    return a + b + c;
}

const nums = [1, 2, 3];
console.log(sum(...nums)); // 6
```

---

## 💡 Rest Parameters

### 1. Function Parameters

```javascript
// Old way - arguments object
function sum() {
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}

// New way - Rest parameters
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15

// Mix regular và rest parameters
function greet(greeting, ...names) {
    return `${greeting} ${names.join(' and ')}!`;
}

console.log(greet('Hello', 'John', 'Jane', 'Bob'));
// Hello John and Jane and Bob!

// ⚠️ Rest phải ở cuối
// function test(...rest, last) {} // ❌ Syntax Error
```

### 2. Destructuring với Rest

```javascript
// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first);  // 1
console.log(second); // 2
console.log(rest);   // [3, 4, 5]

// Object destructuring
const { name, age, ...otherInfo } = {
    name: 'John',
    age: 30,
    city: 'Ha Noi',
    country: 'Vietnam'
};

console.log(name);      // 'John'
console.log(age);       // 30
console.log(otherInfo); // { city: 'Ha Noi', country: 'Vietnam' }
```

---

## 💡 Practical Examples

### 1. Immutable Updates

```javascript
// Array
const todos = ['Learn JS', 'Build app'];

// Add
const newTodos = [...todos, 'Deploy'];

// Remove
const index = 1;
const removed = [...todos.slice(0, index), ...todos.slice(index + 1)];

// Update
const updated = todos.map((todo, i) => 
    i === index ? 'Updated todo' : todo
);

// Object
const user = { name: 'John', age: 30 };

// Add/update property
const updated2 = { ...user, city: 'Ha Noi', age: 31 };

// Remove property
const { age, ...withoutAge } = user;
console.log(withoutAge); // { name: 'John' }
```

### 2. Function Composition

```javascript
function multiply(multiplier, ...numbers) {
    return numbers.map(num => num * multiplier);
}

console.log(multiply(2, 1, 2, 3, 4, 5));
// [2, 4, 6, 8, 10]

// Flexible function arguments
function createUser(name, age, ...roles) {
    return {
        name,
        age,
        roles: roles
    };
}

const user = createUser('John', 30, 'admin', 'editor', 'viewer');
console.log(user);
// { name: 'John', age: 30, roles: ['admin', 'editor', 'viewer'] }
```

### 3. Cloning Arrays/Objects

```javascript
// Shallow clone arrays
const original = [1, 2, 3];
const clone = [...original];

// Shallow clone objects
const user = { name: 'John', age: 30 };
const clone2 = { ...user };

// ⚠️ Shallow clone only
const nested = {
    name: 'John',
    address: {
        city: 'Ha Noi'
    }
};

const shallowClone = { ...nested };
shallowClone.address.city = 'HCM';
console.log(nested.address.city); // 'HCM' (bị thay đổi!)

// Deep clone (simple way)
const deepClone = JSON.parse(JSON.stringify(nested));
deepClone.address.city = 'Da Nang';
console.log(nested.address.city); // 'HCM' (không đổi)
```

---

## ✏️ Bài tập

### Bài tập 1: Array Operations

```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// TODO: Sử dụng spread operator

// 1. Merge arr1 và arr2
// const merged = ???

// 2. Add element vào đầu arr1
// const withFirst = ???

// 3. Add element vào giữa arr1
// const withMiddle = ???

// 4. Copy arr1 và add element vào cuối
// const copy = ???
```

**Đáp án**:
```javascript
const merged = [...arr1, ...arr2];
const withFirst = [0, ...arr1];
const withMiddle = [...arr1.slice(0, 1), 1.5, ...arr1.slice(1)];
const copy = [...arr1, 4];
```

### Bài tập 2: Object Operations

```javascript
const user = {
    name: 'John',
    age: 30
};

// TODO:
// 1. Add property email
// 2. Update age to 31
// 3. Remove age property (hint: destructuring)
// 4. Merge với { city: 'Ha Noi', country: 'Vietnam' }
```

### Bài tập 3: Rest Parameters

```javascript
// TODO: Implement sum function nhận unlimited parameters
function sum(...numbers) {
    // Your code
}

console.log(sum(1, 2, 3));       // 6
console.log(sum(1, 2, 3, 4, 5)); // 15

// TODO: Implement function lấy first và rest
function getFirstAndRest(...items) {
    // Return object: { first, rest }
}

console.log(getFirstAndRest(1, 2, 3, 4));
// { first: 1, rest: [2, 3, 4] }
```

**Đáp án**:
```javascript
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

function getFirstAndRest(...items) {
    const [first, ...rest] = items;
    return { first, rest };
}
```

### Bài tập 4: Practical - Shopping Cart

```javascript
const cart = {
    items: [
        { id: 1, name: 'Laptop', price: 1000, quantity: 1 },
        { id: 2, name: 'Mouse', price: 20, quantity: 2 }
    ]
};

// TODO: Implement functions using spread/rest

// 1. Add item
function addItem(cart, item) {
    // Return new cart with added item
    return {
        ...cart,
        items: [...cart.items, item]
    };
}

// 2. Remove item
function removeItem(cart, itemId) {
    // Return new cart without item
}

// 3. Update quantity
function updateQuantity(cart, itemId, quantity) {
    // Return new cart with updated quantity
}
```

---

## 📝 Tóm tắt

- ✅ Spread operator (...) - Mở rộng
- ✅ Rest parameters (...) - Thu gom
- ✅ Spread với arrays, objects, function calls
- ✅ Rest trong function parameters và destructuring
- ✅ Shallow vs Deep cloning
- ✅ Immutable updates

---

**🎉 HOÀN THÀNH MODULE 3!**

**Module tiếp theo**: [Module 4 - DOM Manipulation & Events](../Module_04_DOM_Events/Lesson_16_DOM_Basics.md)

