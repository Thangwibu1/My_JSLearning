# Bài 14: Destructuring

## 📖 Lý thuyết

**Destructuring** (ES6) là cú pháp giúp "unpack" values từ arrays hoặc properties từ objects thành các biến riêng biệt.

---

## 💡 Array Destructuring

### Basic

```javascript
// Old way
const arr = [1, 2, 3];
const a = arr[0];
const b = arr[1];
const c = arr[2];

// New way (ES6)
const [a, b, c] = [1, 2, 3];
console.log(a, b, c); // 1, 2, 3
```

### Skipping Elements

```javascript
const arr = [1, 2, 3, 4, 5];

const [first, , third] = arr;
console.log(first, third); // 1, 3

const [, , , fourth] = arr;
console.log(fourth); // 4
```

### Rest Pattern

```javascript
const arr = [1, 2, 3, 4, 5];

const [first, second, ...rest] = arr;
console.log(first);  // 1
console.log(second); // 2
console.log(rest);   // [3, 4, 5]

// Rest phải ở cuối
// const [...rest, last] = arr; // ❌ Syntax Error
```

### Default Values

```javascript
const arr = [1];

const [a, b = 2, c = 3] = arr;
console.log(a, b, c); // 1, 2, 3

// undefined triggers default
const [x, y = 5] = [1, undefined];
console.log(x, y); // 1, 5

// null không trigger default
const [m, n = 5] = [1, null];
console.log(m, n); // 1, null
```

### Swapping Variables

```javascript
let a = 1;
let b = 2;

// Old way
let temp = a;
a = b;
b = temp;

// New way
[a, b] = [b, a];
console.log(a, b); // 2, 1
```

---

## 💡 Object Destructuring

### Basic

```javascript
const person = {
    name: 'John',
    age: 30,
    city: 'Ha Noi'
};

// Old way
const name = person.name;
const age = person.age;

// New way
const { name, age, city } = person;
console.log(name, age, city); // John, 30, Ha Noi
```

### Variable Renaming

```javascript
const person = {
    name: 'John',
    age: 30
};

// Rename variables
const { name: userName, age: userAge } = person;
console.log(userName, userAge); // John, 30
```

### Default Values

```javascript
const person = {
    name: 'John'
};

const { name, age = 25, city = 'Unknown' } = person;
console.log(name, age, city); // John, 25, Unknown
```

### Nested Destructuring

```javascript
const user = {
    name: 'John',
    address: {
        city: 'Ha Noi',
        country: 'Vietnam'
    }
};

const {
    name,
    address: { city, country }
} = user;

console.log(name, city, country); // John, Ha Noi, Vietnam

// ⚠️ address variable không được tạo
// console.log(address); // ReferenceError

// Nếu muốn cả address và city
const {
    name: userName,
    address,
    address: { city: userCity }
} = user;

console.log(userName, address, userCity);
```

### Rest Pattern

```javascript
const person = {
    name: 'John',
    age: 30,
    city: 'Ha Noi',
    country: 'Vietnam'
};

const { name, ...rest } = person;
console.log(name); // 'John'
console.log(rest); // { age: 30, city: 'Ha Noi', country: 'Vietnam' }
```

---

## 💡 Function Parameters Destructuring

### Array Parameters

```javascript
// Old way
function displayCoordinates(point) {
    console.log(`X: ${point[0]}, Y: ${point[1]}`);
}

// New way
function displayCoordinates([x, y]) {
    console.log(`X: ${x}, Y: ${y}`);
}

displayCoordinates([10, 20]); // X: 10, Y: 20
```

### Object Parameters

```javascript
// Old way
function greet(person) {
    console.log(`Hello, I'm ${person.name}, ${person.age} years old`);
}

// New way
function greet({ name, age }) {
    console.log(`Hello, I'm ${name}, ${age} years old`);
}

greet({ name: 'John', age: 30 });
// Hello, I'm John, 30 years old

// With defaults
function createUser({ name, age = 18, role = 'user' }) {
    return { name, age, role };
}

console.log(createUser({ name: 'John' }));
// { name: 'John', age: 18, role: 'user' }
```

### Default Object Parameter

```javascript
function createUser({ name, age } = {}) {
    console.log(name, age);
}

createUser({ name: 'John', age: 30 }); // John, 30
createUser(); // undefined, undefined (không lỗi!)

// Without default object parameter
function createUser2({ name, age }) {
    console.log(name, age);
}

// createUser2(); // ❌ TypeError: Cannot destructure undefined
```

---

## 💡 Practical Examples

### API Response

```javascript
// API returns:
const response = {
    data: {
        user: {
            id: 1,
            name: 'John',
            email: 'john@example.com'
        },
        token: 'abc123'
    },
    status: 200
};

// Extract what we need
const {
    data: {
        user: { name, email },
        token
    },
    status
} = response;

console.log(name, email, token, status);
// John, john@example.com, abc123, 200
```

### React Props

```javascript
// React component
function UserCard({ user: { name, age, avatar }, onEdit }) {
    return (
        <div>
            <img src={avatar} />
            <h2>{name}</h2>
            <p>{age} years old</p>
            <button onClick={onEdit}>Edit</button>
        </div>
    );
}
```

### Multiple Return Values

```javascript
function getMinMax(arr) {
    return [Math.min(...arr), Math.max(...arr)];
}

const [min, max] = getMinMax([5, 2, 8, 1, 9]);
console.log(min, max); // 1, 9

// Return object
function getUserInfo() {
    return {
        name: 'John',
        age: 30,
        email: 'john@example.com'
    };
}

const { name, email } = getUserInfo();
```

---

## ✏️ Bài tập

### Bài tập 1: Basic Destructuring

```javascript
// TODO: Use destructuring

const numbers = [10, 20, 30, 40, 50];

// 1. Get first and second
// const first = ???
// const second = ???

// 2. Get first and rest
// const [first, ...rest] = ???

const person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30
};

// 3. Extract firstName và age
// const { firstName, age } = ???

// 4. Rename to fName và userAge
// const { firstName: fName, age: userAge } = ???
```

### Bài tập 2: Function Parameters

```javascript
// TODO: Refactor to use destructuring

// Before
function displayUser(user) {
    console.log(`${user.name} - ${user.email}`);
}

// After
function displayUser(/* destructure here */) {
    console.log(`${name} - ${email}`);
}

// Before
function calculate(config) {
    const operator = config.operator;
    const a = config.a;
    const b = config.b;
    
    // ...
}

// After
function calculate(/* destructure here */) {
    // use operator, a, b directly
}
```

### Bài tập 3: Practical - Parse Config

```javascript
const config = {
    api: {
        baseURL: 'https://api.example.com',
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer token123'
        }
    },
    features: {
        darkMode: true,
        notifications: false
    }
};

// TODO: Extract using destructuring
// - baseURL, timeout
// - Content-Type (rename to contentType)
// - darkMode

// Your code here
```

**Đáp án**:
```javascript
const {
    api: {
        baseURL,
        timeout,
        headers: {
            'Content-Type': contentType
        }
    },
    features: {
        darkMode
    }
} = config;

console.log(baseURL, timeout, contentType, darkMode);
```

---

## 📝 Tóm tắt

- ✅ Array destructuring
- ✅ Object destructuring
- ✅ Nested destructuring
- ✅ Default values
- ✅ Rest pattern
- ✅ Function parameters destructuring
- ✅ Variable renaming

---

**Bài tiếp theo**: [Bài 15 - Spread & Rest](./Lesson_15_Spread_Rest.md)

