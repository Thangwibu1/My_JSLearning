# Bài 03: Kiểu dữ liệu (Data Types)

## 📖 Lý thuyết

### JavaScript là Dynamic Typing

JavaScript là ngôn ngữ **dynamically-typed** (kiểu động): Kiểu dữ liệu được xác định **runtime** (khi chạy), không phải compile time.

```javascript
let x = 42;        // x là number
x = 'hello';       // x giờ là string
x = true;          // x giờ là boolean
// Tất cả đều hợp lệ!
```

### Hai nhóm kiểu dữ liệu chính

JavaScript có **7 kiểu dữ liệu Primitive** và **1 kiểu Reference (Object)**:

#### **Primitive Types** (Kiểu nguyên thủy)
1. **Number** - Số
2. **String** - Chuỗi
3. **Boolean** - Luận lý
4. **Undefined** - Chưa định nghĩa
5. **Null** - Không có giá trị
6. **Symbol** - Định danh duy nhất (ES6)
7. **BigInt** - Số nguyên lớn (ES2020)

#### **Reference Type**
8. **Object** - Đối tượng (bao gồm Arrays, Functions, Dates, etc.)

---

## 💡 Các kiểu dữ liệu chi tiết

### 1. Number

JavaScript chỉ có **một kiểu số** (không phân biệt integer và float).

```javascript
// Integers
const age = 25;
const count = 1000;

// Floats/Decimals
const price = 19.99;
const pi = 3.14159;

// Negative numbers
const temperature = -5;
const debt = -1000.50;

// Special numeric values
const infinity = Infinity;
const negInfinity = -Infinity;
const notANumber = NaN; // Not a Number

// Exponential notation
const bigNumber = 1e6;  // 1,000,000
const smallNumber = 1e-6; // 0.000001
```

**Các phép toán**:
```javascript
const a = 10;
const b = 3;

console.log(a + b);  // 13 - Cộng
console.log(a - b);  // 7  - Trừ
console.log(a * b);  // 30 - Nhân
console.log(a / b);  // 3.3333... - Chia
console.log(a % b);  // 1  - Chia lấy dư (modulo)
console.log(a ** b); // 1000 - Lũy thừa (a^b)
```

**Math object**:
```javascript
Math.PI;              // 3.141592653589793
Math.round(4.7);      // 5
Math.ceil(4.1);       // 5 (làm tròn lên)
Math.floor(4.9);      // 4 (làm tròn xuống)
Math.abs(-5);         // 5 (giá trị tuyệt đối)
Math.max(1, 5, 3);    // 5
Math.min(1, 5, 3);    // 1
Math.pow(2, 3);       // 8 (2^3)
Math.sqrt(16);        // 4 (căn bậc 2)
Math.random();        // Số ngẫu nhiên từ 0 đến 1
```

**NaN (Not a Number)**:
```javascript
const result = 0 / 0;        // NaN
const invalid = 'abc' * 3;   // NaN
const notNum = Number('hello'); // NaN

// Kiểm tra NaN
console.log(NaN === NaN);    // false (NaN không bằng chính nó!)
console.log(isNaN(NaN));     // true
console.log(Number.isNaN(NaN)); // true (preferred)
```

### 2. String

Chuỗi ký tự, có thể dùng `'`, `"`, hoặc `` ` `` (template literals).

```javascript
// Single quotes
const name1 = 'John Doe';

// Double quotes
const name2 = "Jane Smith";

// Template literals (ES6) - Preferred
const name3 = `Bob Johnson`;

// Multi-line strings
const multiLine = `This is
a multi-line
string`;

// Escape characters
const escaped = 'It\'s a nice day'; // Escape single quote
const newLine = 'Line 1\nLine 2';   // New line
const tab = 'Col1\tCol2';           // Tab
```

**String concatenation**:
```javascript
const firstName = 'John';
const lastName = 'Doe';

// Old way
const fullName1 = firstName + ' ' + lastName;

// Template literals (Better!)
const fullName2 = `${firstName} ${lastName}`;

// With expressions
const age = 25;
const message = `I am ${age} years old. Next year I'll be ${age + 1}.`;
```

**String properties and methods**:
```javascript
const str = 'Hello World';

// Property
console.log(str.length); // 11

// Methods
console.log(str.toLowerCase());      // 'hello world'
console.log(str.toUpperCase());      // 'HELLO WORLD'
console.log(str.indexOf('o'));       // 4
console.log(str.includes('World'));  // true
console.log(str.startsWith('Hello')); // true
console.log(str.endsWith('World'));  // true
console.log(str.slice(0, 5));        // 'Hello'
console.log(str.substring(6, 11));   // 'World'
console.log(str.replace('World', 'JS')); // 'Hello JS'
console.log(str.split(' '));         // ['Hello', 'World']
console.log(str.trim());             // Xóa khoảng trắng đầu/cuối
console.log(str.repeat(3));          // 'Hello WorldHello WorldHello World'
```

### 3. Boolean

Chỉ có 2 giá trị: `true` hoặc `false`.

```javascript
const isActive = true;
const isDeleted = false;

// Boolean từ comparisons
const isAdult = age >= 18;           // true nếu age >= 18
const isEqual = 5 === 5;             // true
const isGreater = 10 > 5;            // true
const hasAccess = isActive && !isDeleted; // true
```

**Truthy và Falsy values**:
```javascript
// Falsy values (chuyển thành false)
Boolean(false);      // false
Boolean(0);          // false
Boolean('');         // false (empty string)
Boolean(null);       // false
Boolean(undefined);  // false
Boolean(NaN);        // false

// Truthy values (chuyển thành true) - Tất cả còn lại
Boolean(true);       // true
Boolean(1);          // true
Boolean('hello');    // true
Boolean([]);         // true (empty array)
Boolean({});         // true (empty object)
Boolean(function(){}); // true
```

### 4. Undefined

Biến đã được khai báo nhưng **chưa gán giá trị**.

```javascript
let x;
console.log(x);        // undefined
console.log(typeof x); // 'undefined'

// Function không return gì
function doNothing() {}
console.log(doNothing()); // undefined

// Accessing non-existent property
const obj = { name: 'John' };
console.log(obj.age);  // undefined
```

### 5. Null

Đại diện cho **"không có giá trị"** một cách **có chủ đích**.

```javascript
let user = null; // User chưa đăng nhập
console.log(user);        // null
console.log(typeof user); // 'object' (bug lịch sử của JS!)
```

**Undefined vs Null**:
```javascript
let notAssigned;          // undefined - Chưa gán
let intentionallyEmpty = null; // null - Cố ý để trống

// Kiểm tra
if (notAssigned === undefined) {
    console.log('Variable not assigned');
}

if (intentionallyEmpty === null) {
    console.log('Variable intentionally empty');
}

// So sánh
console.log(null == undefined);  // true (loose equality)
console.log(null === undefined); // false (strict equality)
```

### 6. Symbol (ES6)

Tạo ra **identifier duy nhất**, không thể trùng lặp.

```javascript
const sym1 = Symbol('description');
const sym2 = Symbol('description');

console.log(sym1 === sym2); // false (mỗi symbol là duy nhất)

// Use case: Object property keys
const id = Symbol('id');
const user = {
    name: 'John',
    [id]: 123
};

console.log(user[id]); // 123
console.log(user.id);  // undefined
```

### 7. BigInt (ES2020)

Để làm việc với **số nguyên cực lớn** (lớn hơn `Number.MAX_SAFE_INTEGER`).

```javascript
// Number giới hạn
const maxSafeInt = Number.MAX_SAFE_INTEGER; // 9007199254740991
console.log(maxSafeInt + 1); // 9007199254740992
console.log(maxSafeInt + 2); // 9007199254740992 (sai!)

// BigInt - Thêm 'n' vào cuối
const bigInt1 = 1234567890123456789012345678901234567890n;
const bigInt2 = BigInt('9007199254740991');

console.log(bigInt1);
console.log(bigInt2 + 10n); // Phải dùng BigInt cho cả 2 operands

// Không thể mix BigInt và Number
// console.log(bigInt2 + 10); // ❌ TypeError
```

### 8. Object

**Object** là kiểu dữ liệu **reference**, bao gồm nhiều loại:

```javascript
// Plain object
const person = {
    name: 'John',
    age: 30
};

// Array
const numbers = [1, 2, 3, 4, 5];

// Function
const greet = function() {
    console.log('Hello!');
};

// Date
const now = new Date();

// RegExp
const pattern = /hello/i;

// Map, Set, WeakMap, WeakSet, etc.
const map = new Map();
const set = new Set();
```

---

## 🔍 Giải thích sâu

### Primitive vs Reference Types

**Primitive Types** (Kiểu giá trị):
- Lưu trực tiếp **giá trị**
- Copy by **value**
- Immutable (không thể thay đổi)

```javascript
let a = 10;
let b = a; // Copy giá trị

a = 20;
console.log(a); // 20
console.log(b); // 10 (không thay đổi)

// Primitives are immutable
let str = 'hello';
str[0] = 'H'; // Không có effect
console.log(str); // 'hello' (không đổi)
```

**Reference Types** (Kiểu tham chiếu):
- Lưu **địa chỉ tham chiếu** đến object trong memory
- Copy by **reference**
- Mutable (có thể thay đổi)

```javascript
let obj1 = { name: 'John' };
let obj2 = obj1; // Copy reference (cùng trỏ đến 1 object)

obj1.name = 'Jane';
console.log(obj1.name); // 'Jane'
console.log(obj2.name); // 'Jane' (cũng thay đổi!)

// Proof: So sánh
let obj3 = { name: 'John' };
let obj4 = { name: 'John' };
console.log(obj3 === obj4); // false (khác reference)
```

**Visualize**:
```
Primitives:
┌─────┐       ┌─────┐
│ a   │ = 10  │ b   │ = 10
└─────┘       └─────┘
(2 giá trị độc lập)

References:
┌─────┐       ┌─────┐       ┌──────────────┐
│ obj1│ ───┐  │ obj2│ ───┐  │ {name:'John'}│
└─────┘    └──└─────┘    └──│ (in memory)  │
                             └──────────────┘
(2 references cùng trỏ 1 object)
```

### typeof Operator

```javascript
console.log(typeof 42);              // 'number'
console.log(typeof 3.14);            // 'number'
console.log(typeof 'hello');         // 'string'
console.log(typeof true);            // 'boolean'
console.log(typeof undefined);       // 'undefined'
console.log(typeof null);            // 'object' ❌ (bug!)
console.log(typeof Symbol('id'));    // 'symbol'
console.log(typeof 123n);            // 'bigint'
console.log(typeof {});              // 'object'
console.log(typeof []);              // 'object' (array is object)
console.log(typeof function(){});    // 'function'
```

**Kiểm tra chính xác hơn**:
```javascript
// Check array
Array.isArray([]);           // true
Array.isArray({});           // false

// Check null
const value = null;
value === null;              // true

// Check NaN
Number.isNaN(NaN);           // true
Number.isNaN('hello');       // false

// Check if variable is defined
typeof variable !== 'undefined'
```

### Type Coercion (Ép kiểu tự động)

JavaScript tự động chuyển đổi kiểu trong một số trường hợp:

```javascript
// String coercion
console.log('5' + 3);        // '53' (number → string)
console.log('5' - 3);        // 2   (string → number)
console.log('5' * '2');      // 10  (string → number)

// Boolean coercion
console.log(!!'hello');      // true
console.log(!!'');           // false
console.log(!!0);            // false
console.log(!!1);            // true

// Comparison coercion
console.log('5' == 5);       // true (loose equality, có coercion)
console.log('5' === 5);      // false (strict equality, không coercion)
```

---

## ✏️ Bài tập

### Bài tập 1: Identify Data Types

```javascript
// Xác định kiểu dữ liệu của các giá trị sau:

const value1 = 42;
const value2 = '42';
const value3 = true;
const value4 = { name: 'John' };
const value5 = [1, 2, 3];
const value6 = null;
const value7 = undefined;
const value8 = Symbol('id');
const value9 = function() {};
const value10 = 123n;

// TODO: Sử dụng typeof để kiểm tra
console.log('value1:', typeof value1);
// ... (làm tiếp cho các values khác)

// TODO: Giải thích kết quả bất thường (nếu có)
```

### Bài tập 2: Number Operations

```javascript
// Tạo một calculator đơn giản

const num1 = 10;
const num2 = 3;

// TODO: Tính toán và log ra kết quả
const sum = // ???
const difference = // ???
const product = // ???
const quotient = // ???
const remainder = // ???
const power = // ???

console.log(`${num1} + ${num2} = ${sum}`);
// ... (log các phép tính khác)

// TODO: Làm tròn số
const decimal = 4.7;
const roundedUp = // Math.ceil()
const roundedDown = // Math.floor()
const rounded = // Math.round()

// TODO: Random number từ 1 đến 100
const random = // ???
```

**Đáp án**:
```javascript
const num1 = 10;
const num2 = 3;

const sum = num1 + num2;              // 13
const difference = num1 - num2;       // 7
const product = num1 * num2;          // 30
const quotient = num1 / num2;         // 3.333...
const remainder = num1 % num2;        // 1
const power = num1 ** num2;           // 1000

const decimal = 4.7;
const roundedUp = Math.ceil(decimal);    // 5
const roundedDown = Math.floor(decimal); // 4
const rounded = Math.round(decimal);     // 5

const random = Math.floor(Math.random() * 100) + 1;
```

### Bài tập 3: String Manipulation

```javascript
const text = '  JavaScript is Awesome  ';

// TODO: Thực hiện các operations sau:
// 1. Xóa khoảng trắng đầu cuối
const trimmed = // ???

// 2. Chuyển thành lowercase
const lower = // ???

// 3. Chuyển thành UPPERCASE
const upper = // ???

// 4. Thay 'Awesome' thành 'Amazing'
const replaced = // ???

// 5. Kiểm tra có chứa 'JavaScript' không
const contains = // ???

// 6. Tách thành array các từ
const words = // ???

// 7. Lấy 10 ký tự đầu
const first10 = // ???

console.log('Trimmed:', trimmed);
// ... (log các kết quả khác)
```

**Đáp án**:
```javascript
const trimmed = text.trim();                    // 'JavaScript is Awesome'
const lower = trimmed.toLowerCase();            // 'javascript is awesome'
const upper = trimmed.toUpperCase();            // 'JAVASCRIPT IS AWESOME'
const replaced = trimmed.replace('Awesome', 'Amazing'); // 'JavaScript is Amazing'
const contains = trimmed.includes('JavaScript'); // true
const words = trimmed.split(' ');               // ['JavaScript', 'is', 'Awesome']
const first10 = trimmed.slice(0, 10);           // 'JavaScript'
```

### Bài tập 4: Truthy and Falsy

```javascript
// Dự đoán output (true hay false):

console.log(Boolean(0));           // ?
console.log(Boolean(''));          // ?
console.log(Boolean('0'));         // ?
console.log(Boolean(null));        // ?
console.log(Boolean(undefined));   // ?
console.log(Boolean(NaN));         // ?
console.log(Boolean([]));          // ?
console.log(Boolean({}));          // ?
console.log(Boolean(false));       // ?
console.log(Boolean('false'));     // ?

// TODO: Tạo function kiểm tra truthy/falsy
function isTruthy(value) {
    // Your code here
}

console.log(isTruthy(0));          // false
console.log(isTruthy('hello'));    // true
```

**Đáp án**:
```javascript
console.log(Boolean(0));           // false
console.log(Boolean(''));          // false
console.log(Boolean('0'));         // true  (string không rỗng)
console.log(Boolean(null));        // false
console.log(Boolean(undefined));   // false
console.log(Boolean(NaN));         // false
console.log(Boolean([]));          // true  (object)
console.log(Boolean({}));          // true  (object)
console.log(Boolean(false));       // false
console.log(Boolean('false'));     // true  (string không rỗng)

function isTruthy(value) {
    return Boolean(value);
    // hoặc: return !!value;
}
```

### Bài tập 5: Primitive vs Reference

```javascript
// Dự đoán output:

// Primitive
let a = 10;
let b = a;
a = 20;
console.log('a:', a); // ?
console.log('b:', b); // ?

// Reference
let obj1 = { value: 10 };
let obj2 = obj1;
obj1.value = 20;
console.log('obj1.value:', obj1.value); // ?
console.log('obj2.value:', obj2.value); // ?

// Array
let arr1 = [1, 2, 3];
let arr2 = arr1;
arr1.push(4);
console.log('arr1:', arr1); // ?
console.log('arr2:', arr2); // ?

// TODO: Làm sao để copy object mà không bị reference?
let obj3 = { x: 1, y: 2 };
let obj4 = // ??? (copy độc lập)
obj3.x = 100;
console.log('obj3.x:', obj3.x); // 100
console.log('obj4.x:', obj4.x); // 1 (không bị ảnh hưởng)
```

**Đáp án**:
```javascript
// Primitive
console.log('a:', 20);
console.log('b:', 10);

// Reference
console.log('obj1.value:', 20);
console.log('obj2.value:', 20);

// Array
console.log('arr1:', [1, 2, 3, 4]);
console.log('arr2:', [1, 2, 3, 4]);

// Copy object độc lập
let obj4 = { ...obj3 };              // Spread operator (shallow copy)
// hoặc: let obj4 = Object.assign({}, obj3);
// hoặc: let obj4 = JSON.parse(JSON.stringify(obj3)); // Deep copy (có hạn chế)
```

### Bài tập 6: Type Checking Challenge

```javascript
// Tạo functions kiểm tra kiểu dữ liệu chính xác

function isNumber(value) {
    // TODO: Kiểm tra có phải number không (không phải NaN)
}

function isString(value) {
    // TODO: Kiểm tra có phải string không
}

function isArray(value) {
    // TODO: Kiểm tra có phải array không
}

function isObject(value) {
    // TODO: Kiểm tra có phải plain object không (không phải array, null, function)
}

function isNull(value) {
    // TODO: Kiểm tra có phải null không
}

function isUndefined(value) {
    // TODO: Kiểm tra có phải undefined không
}

// Test cases
console.log(isNumber(42));           // true
console.log(isNumber(NaN));          // false
console.log(isString('hello'));      // true
console.log(isArray([1, 2, 3]));     // true
console.log(isArray({}));            // false
console.log(isObject({}));           // true
console.log(isObject([]));           // false
console.log(isObject(null));         // false
console.log(isNull(null));           // true
console.log(isUndefined(undefined)); // true
```

**Đáp án**:
```javascript
function isNumber(value) {
    return typeof value === 'number' && !Number.isNaN(value);
}

function isString(value) {
    return typeof value === 'string';
}

function isArray(value) {
    return Array.isArray(value);
}

function isObject(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isNull(value) {
    return value === null;
}

function isUndefined(value) {
    return value === undefined;
}
```

### Bài tập 7: Practical Exercise - User Profile

```javascript
// Tạo một user profile với đầy đủ kiểu dữ liệu

// TODO: Tạo user object
const user = {
    // Primitive types
    id: // number
    username: // string
    email: // string
    age: // number
    isActive: // boolean
    role: // string
    lastLogin: // Date object
    
    // Reference types
    address: {
        // nested object
    },
    hobbies: // array of strings
    settings: {
        // nested object với nhiều properties
    }
};

// TODO: Tạo functions để làm việc với user
function displayUserInfo(user) {
    // Log ra các thông tin cơ bản
}

function isAdult(user) {
    // Return true nếu age >= 18
}

function addHobby(user, hobby) {
    // Thêm hobby vào array
}

function updateEmail(user, newEmail) {
    // Validate và update email
}

// Test
displayUserInfo(user);
console.log('Is adult:', isAdult(user));
addHobby(user, 'reading');
updateEmail(user, 'newemail@example.com');
```

**Đáp án**:
```javascript
const user = {
    id: 1,
    username: 'john_doe',
    email: 'john@example.com',
    age: 25,
    isActive: true,
    role: 'user',
    lastLogin: new Date(),
    
    address: {
        street: '123 Main St',
        city: 'Ha Noi',
        country: 'Vietnam'
    },
    
    hobbies: ['coding', 'gaming'],
    
    settings: {
        theme: 'dark',
        notifications: true,
        language: 'vi'
    }
};

function displayUserInfo(user) {
    console.log(`
        User Profile:
        - ID: ${user.id}
        - Username: ${user.username}
        - Email: ${user.email}
        - Age: ${user.age}
        - Active: ${user.isActive}
        - Location: ${user.address.city}, ${user.address.country}
    `);
}

function isAdult(user) {
    return user.age >= 18;
}

function addHobby(user, hobby) {
    if (!user.hobbies.includes(hobby)) {
        user.hobbies.push(hobby);
        console.log(`Added hobby: ${hobby}`);
    } else {
        console.log(`Hobby "${hobby}" already exists`);
    }
}

function updateEmail(user, newEmail) {
    if (newEmail.includes('@')) {
        user.email = newEmail;
        console.log(`Email updated to: ${newEmail}`);
    } else {
        console.log('Invalid email format');
    }
}
```

---

## 📝 Tóm tắt

Trong bài này bạn đã học:
- ✅ 7 kiểu Primitive: Number, String, Boolean, Undefined, Null, Symbol, BigInt
- ✅ 1 kiểu Reference: Object (và các biến thể)
- ✅ Sự khác biệt giữa Primitive (value) và Reference (reference)
- ✅ typeof operator và cách kiểm tra kiểu dữ liệu
- ✅ Truthy và Falsy values
- ✅ Type Coercion (ép kiểu tự động)
- ✅ Các methods quan trọng cho Number và String

---

## 🎯 Kiến thức cần nắm vững

Trước khi chuyển sang bài tiếp theo:
- [ ] Liệt kê được 8 kiểu dữ liệu trong JavaScript
- [ ] Phân biệt được Primitive và Reference types
- [ ] Hiểu cách copy by value vs copy by reference
- [ ] Biết cách kiểm tra kiểu dữ liệu chính xác
- [ ] Hiểu Truthy và Falsy values
- [ ] Thành thạo các methods của Number và String

---

**Bài tiếp theo**: [Bài 04 - Toán tử và biểu thức](./Lesson_04_Operators.md)

