# Bài 08: Functions Cơ bản

## 📖 Lý thuyết

**Functions** là khối code có thể tái sử dụng để thực hiện một tác vụ cụ thể.

### Tại sao dùng Functions?
- **Tái sử dụng code** - Viết một lần, dùng nhiều lần
- **Tổ chức code** - Chia nhỏ chương trình phức tạp
- **Dễ bảo trì** - Sửa ở một chỗ, apply everywhere
- **Abstraction** - Che giấu chi tiết implementation

---

## 💡 Function Declaration vs Expression

### 1. Function Declaration

```javascript
function greet(name) {
    return `Hello, ${name}!`;
}

console.log(greet('John')); // Hello, John!
```

### 2. Function Expression

```javascript
const greet = function(name) {
    return `Hello, ${name}!`;
};

console.log(greet('Jane')); // Hello, Jane!
```

### 3. Arrow Function (ES6)

```javascript
const greet = (name) => {
    return `Hello, ${name}!`;
};

// Implicit return (single expression)
const greet2 = (name) => `Hello, ${name}!`;
```

---

## 🎯 Parameters và Arguments

```javascript
// Parameters - Biến trong function definition
function add(a, b) {  // a, b là parameters
    return a + b;
}

// Arguments - Giá trị thực tế khi gọi function
const result = add(5, 3);  // 5, 3 là arguments
```

### Default Parameters (ES6)

```javascript
function greet(name = 'Guest') {
    return `Hello, ${name}!`;
}

console.log(greet());        // Hello, Guest!
console.log(greet('John'));  // Hello, John!

// Multiple defaults
function createUser(name = 'Anonymous', role = 'user', isActive = true) {
    return { name, role, isActive };
}
```

### Rest Parameters

```javascript
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3));        // 6
console.log(sum(1, 2, 3, 4, 5));  // 15
```

---

## 🔄 Return Values

```javascript
// Return value
function multiply(a, b) {
    return a * b;
}
const result = multiply(5, 3); // 15

// Return object
function createPerson(name, age) {
    return {
        name: name,
        age: age,
        greet() {
            return `I'm ${this.name}`;
        }
    };
}

// Multiple returns (conditional)
function getGrade(score) {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    return 'F';
}

// No explicit return = undefined
function noReturn() {
    console.log('Hello');
    // Không có return
}
console.log(noReturn()); // undefined
```

---

## ✏️ Bài tập

### Bài tập 1: Basic Functions

```javascript
// TODO: Tạo function tính diện tích hình chữ nhật
function calculateRectangleArea(width, height) {
    // Your code
}

// TODO: Tạo function tính chu vi hình tròn
function calculateCirclePerimeter(radius) {
    // Your code (2 * PI * radius)
}

// TODO: Tạo function kiểm tra số chẵn
function isEven(number) {
    // Return true/false
}
```

**Đáp án**:
```javascript
function calculateRectangleArea(width, height) {
    return width * height;
}

function calculateCirclePerimeter(radius) {
    return 2 * Math.PI * radius;
}

function isEven(number) {
    return number % 2 === 0;
}
```

### Bài tập 2: Temperature Converter

```javascript
// TODO: Celsius sang Fahrenheit
function celsiusToFahrenheit(celsius) {
    // Formula: (C * 9/5) + 32
}

// TODO: Fahrenheit sang Celsius
function fahrenheitToCelsius(fahrenheit) {
    // Formula: (F - 32) * 5/9
}

console.log(celsiusToFahrenheit(0));   // 32
console.log(celsiusToFahrenheit(100)); // 212
console.log(fahrenheitToCelsius(32));  // 0
console.log(fahrenheitToCelsius(212)); // 100
```

### Bài tập 3: String Utilities

```javascript
// TODO: Viết hoa chữ cái đầu
function capitalize(str) {
    // 'hello' -> 'Hello'
}

// TODO: Đảo ngược chuỗi
function reverseString(str) {
    // 'hello' -> 'olleh'
}

// TODO: Đếm số từ
function countWords(str) {
    // 'Hello world from JS' -> 4
}
```

**Đáp án**:
```javascript
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function reverseString(str) {
    return str.split('').reverse().join('');
}

function countWords(str) {
    return str.trim().split(/\s+/).length;
}
```

### Bài tập 4: Array Utilities

```javascript
// TODO: Tìm max trong array
function findMax(numbers) {
    // Return số lớn nhất
}

// TODO: Tìm min trong array
function findMin(numbers) {
    // Return số nhỏ nhất
}

// TODO: Tính trung bình
function calculateAverage(numbers) {
    // Return trung bình cộng
}
```

### Bài tập 5: Practical - User Validator

```javascript
// TODO: Tạo function validate user
function validateUser(user) {
    // Check:
    // - username: 3-20 ký tự
    // - email: phải có '@'
    // - age: 18-100
    //
    // Return object: { valid: boolean, errors: [] }
}

const user1 = {
    username: 'john_doe',
    email: 'john@example.com',
    age: 25
};

const user2 = {
    username: 'ab',
    email: 'invalid',
    age: 15
};

console.log(validateUser(user1));
// { valid: true, errors: [] }

console.log(validateUser(user2));
// { valid: false, errors: ['Username too short', 'Invalid email', 'Age must be 18+'] }
```

---

## 📝 Tóm tắt

- ✅ Function declaration, expression, arrow function
- ✅ Parameters và arguments
- ✅ Default parameters, rest parameters
- ✅ Return values
- ✅ Pure functions concept

---

**Bài tiếp theo**: [Bài 09 - Function Scope và Hoisting](./Lesson_09_Function_Scope.md)

