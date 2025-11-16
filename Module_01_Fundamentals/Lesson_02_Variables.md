# Bài 02: Biến và Khai báo (var, let, const)

## 📖 Lý thuyết

### Biến là gì?

**Biến** (Variable) là một "container" dùng để lưu trữ dữ liệu. Bạn có thể hình dung biến như một cái hộp có nhãn, bên trong chứa một giá trị.

```javascript
let age = 25; // Biến 'age' chứa giá trị 25
```

### Ba cách khai báo biến trong JavaScript

JavaScript có 3 keywords để khai báo biến:

| Keyword | Scope | Reassignable | Redeclarable | Hoisting | Khi nào dùng |
|---------|-------|--------------|--------------|----------|--------------|
| `var` | Function | ✅ Yes | ✅ Yes | Yes (undefined) | ❌ Tránh dùng |
| `let` | Block | ✅ Yes | ❌ No | Yes (TDZ) | ✅ Dùng khi cần thay đổi |
| `const` | Block | ❌ No | ❌ No | Yes (TDZ) | ✅ Dùng mặc định |

### 1. `var` - Cách cũ (Legacy)

```javascript
var name = 'John';
var age = 30;
age = 31; // OK: Có thể thay đổi
var age = 32; // OK: Có thể khai báo lại (Dangerous!)
```

**Đặc điểm**:
- Function-scoped (không phải block-scoped)
- Có hoisting
- Có thể redeclare
- **Không nên dùng** trong code hiện đại

### 2. `let` - Biến có thể thay đổi (ES6+)

```javascript
let name = 'John';
let age = 30;
age = 31; // OK: Có thể thay đổi
// let age = 32; // ❌ ERROR: Không thể khai báo lại
```

**Đặc điểm**:
- Block-scoped
- Có thể reassign
- Không thể redeclare trong cùng scope
- Có Temporal Dead Zone (TDZ)

### 3. `const` - Hằng số (ES6+)

```javascript
const PI = 3.14159;
const birthYear = 1995;
// PI = 3.14; // ❌ ERROR: Không thể thay đổi

// ⚠️ CHÚ Ý: const với objects và arrays
const person = { name: 'John' };
person.name = 'Jane'; // ✅ OK: Có thể thay đổi properties
person.age = 30;      // ✅ OK: Có thể thêm properties
// person = {};       // ❌ ERROR: Không thể reassign

const numbers = [1, 2, 3];
numbers.push(4);      // ✅ OK: Có thể thay đổi nội dung array
// numbers = [];      // ❌ ERROR: Không thể reassign
```

**Đặc điểm**:
- Block-scoped
- **Không thể reassign** (nhưng có thể modify nội dung của object/array)
- Phải khởi tạo giá trị ngay khi khai báo
- Best practice: Dùng `const` mặc định

---

## 💡 Ví dụ

### Ví dụ 1: var vs let vs const - Reassignment

```javascript
// VAR
var varName = 'John';
console.log(varName); // John
varName = 'Jane';
console.log(varName); // Jane
var varName = 'Bob'; // OK: Có thể redeclare
console.log(varName); // Bob

// LET
let letName = 'John';
console.log(letName); // John
letName = 'Jane';
console.log(letName); // Jane
// let letName = 'Bob'; // ❌ ERROR: Identifier 'letName' has already been declared

// CONST
const constName = 'John';
console.log(constName); // John
// constName = 'Jane'; // ❌ ERROR: Assignment to constant variable
// const constName = 'Bob'; // ❌ ERROR: Identifier 'constName' has already been declared
```

### Ví dụ 2: Scope - Function scope vs Block scope

```javascript
// VAR - Function scoped
function varTest() {
    var x = 1;
    if (true) {
        var x = 2; // Cùng biến! (vì function-scoped)
        console.log(x); // 2
    }
    console.log(x); // 2 (bị thay đổi!)
}
varTest();

// LET - Block scoped
function letTest() {
    let x = 1;
    if (true) {
        let x = 2; // Khác biến! (vì block-scoped)
        console.log(x); // 2
    }
    console.log(x); // 1 (không bị thay đổi)
}
letTest();

// CONST - Block scoped
function constTest() {
    const x = 1;
    if (true) {
        const x = 2; // Khác biến!
        console.log(x); // 2
    }
    console.log(x); // 1
}
constTest();
```

### Ví dụ 3: Hoisting

```javascript
// VAR - Hoisted với giá trị undefined
console.log(varAge); // undefined (không lỗi!)
var varAge = 30;
console.log(varAge); // 30

// Tương đương với:
// var varAge;
// console.log(varAge);
// varAge = 30;

// LET - Hoisted nhưng có Temporal Dead Zone
// console.log(letAge); // ❌ ReferenceError: Cannot access 'letAge' before initialization
let letAge = 30;
console.log(letAge); // 30

// CONST - Giống let
// console.log(constAge); // ❌ ReferenceError
const constAge = 30;
console.log(constAge); // 30
```

### Ví dụ 4: const với Objects và Arrays

```javascript
// const với Object
const user = {
    name: 'John',
    age: 30
};

console.log(user); // { name: 'John', age: 30 }

// ✅ OK: Thay đổi properties
user.name = 'Jane';
user.age = 25;
user.email = 'jane@example.com'; // Thêm property mới
console.log(user); // { name: 'Jane', age: 25, email: 'jane@example.com' }

// ❌ ERROR: Không thể reassign
// user = { name: 'Bob' }; // TypeError: Assignment to constant variable

// const với Array
const numbers = [1, 2, 3];
console.log(numbers); // [1, 2, 3]

// ✅ OK: Thay đổi nội dung
numbers.push(4);
numbers[0] = 10;
console.log(numbers); // [10, 2, 3, 4]

// ❌ ERROR: Không thể reassign
// numbers = [1, 2, 3, 4]; // TypeError: Assignment to constant variable
```

### Ví dụ 5: Loop với var vs let

```javascript
// VAR - Vấn đề với async operations
console.log('=== VAR ===');
for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log('var i:', i); // 3, 3, 3 (sai!)
    }, 100);
}

// LET - Hoạt động đúng
console.log('=== LET ===');
for (let j = 0; j < 3; j++) {
    setTimeout(function() {
        console.log('let j:', j); // 0, 1, 2 (đúng!)
    }, 100);
}

// Giải thích: var i được share giữa tất cả iterations
// let j tạo ra một biến mới cho mỗi iteration
```

---

## 🔍 Giải thích sâu

### 1. Scope (Phạm vi)

**Global Scope**:
```javascript
// Global scope
const globalVar = 'I am global';

function test() {
    console.log(globalVar); // Truy cập được
}

if (true) {
    console.log(globalVar); // Truy cập được
}
```

**Function Scope** (var):
```javascript
function functionScope() {
    var functionVar = 'I am function scoped';
    console.log(functionVar); // OK
    
    if (true) {
        var blockVar = 'I am also function scoped';
        console.log(functionVar); // OK
    }
    
    console.log(blockVar); // OK (var không bị giới hạn trong block)
}

// console.log(functionVar); // ❌ ERROR: Not defined
```

**Block Scope** (let, const):
```javascript
function blockScope() {
    let functionLet = 'I am function scoped';
    
    if (true) {
        let blockLet = 'I am block scoped';
        const blockConst = 'I am also block scoped';
        console.log(functionLet); // OK
        console.log(blockLet); // OK
    }
    
    // console.log(blockLet); // ❌ ERROR: Not defined
    // console.log(blockConst); // ❌ ERROR: Not defined
}

// Block scope với các loại blocks
{
    let x = 1;
    const y = 2;
    console.log(x, y); // 1, 2
}
// console.log(x, y); // ❌ ERROR: Not defined
```

### 2. Hoisting (Đưa lên đầu)

**Hoisting là gì?**
JavaScript "đưa" các khai báo biến và function lên đầu scope trước khi thực thi code.

```javascript
// Code bạn viết:
console.log(x); // undefined
var x = 5;
console.log(x); // 5

// JavaScript thực thi:
var x; // Hoisting - khai báo được đưa lên đầu
console.log(x); // undefined
x = 5; // Assignment vẫn ở vị trí cũ
console.log(x); // 5
```

**Temporal Dead Zone (TDZ) - let và const**:
```javascript
console.log('Start');

// TDZ for myLet starts
// console.log(myLet); // ❌ ReferenceError: Cannot access before initialization

let myLet = 'Hello'; // TDZ ends
console.log(myLet); // OK

// TDZ là khoảng thời gian từ khi bắt đầu block cho đến khi biến được khai báo
```

### 3. const không phải "Immutable"

`const` chỉ đảm bảo **reference** không thay đổi, không phải **value**:

```javascript
// Primitive values - Immutable
const num = 42;
// num = 43; // ❌ ERROR

const str = 'hello';
// str = 'world'; // ❌ ERROR

// Objects - Reference không đổi, nhưng properties đổi được
const obj = { x: 1 };
obj.x = 2;     // ✅ OK - Thay đổi property
obj.y = 3;     // ✅ OK - Thêm property
delete obj.x;  // ✅ OK - Xóa property
// obj = {};   // ❌ ERROR - Không thể reassign reference

// Arrays - Reference không đổi, nhưng elements đổi được
const arr = [1, 2, 3];
arr.push(4);   // ✅ OK - Thay đổi nội dung
arr[0] = 10;   // ✅ OK - Thay đổi element
// arr = [];   // ❌ ERROR - Không thể reassign reference
```

**Để tạo truly immutable object**:
```javascript
const obj = Object.freeze({ x: 1, y: 2 });
obj.x = 10; // Không có effect (strict mode: TypeError)
console.log(obj.x); // Vẫn là 1

// Freeze sâu hơn (nested objects)
const deepObj = {
    a: 1,
    b: { c: 2 }
};
Object.freeze(deepObj);
deepObj.a = 10; // Không có effect
deepObj.b.c = 20; // ✅ Vẫn thay đổi được (nested object không bị freeze)
console.log(deepObj); // { a: 1, b: { c: 20 } }
```

### 4. Best Practices - Khi nào dùng gì?

```javascript
// ✅ Mặc định: Dùng const
const API_URL = 'https://api.example.com';
const MAX_RETRY = 3;
const user = { name: 'John' };

// ✅ Dùng let khi cần thay đổi
let counter = 0;
counter++;

let userName = 'Guest';
if (loggedIn) {
    userName = 'John';
}

// ✅ Dùng let trong loops
for (let i = 0; i < 10; i++) {
    console.log(i);
}

// ❌ Tránh dùng var
// var x = 1; // Don't do this!
```

---

## ✏️ Bài tập

### Bài tập 1: Khai báo biến cơ bản

```javascript
// TODO: Khai báo các biến sau với const hoặc let phù hợp

// 1. Tên của bạn (không thay đổi)


// 2. Tuổi của bạn (có thể tăng lên)


// 3. Thành phố bạn đang sống (có thể thay đổi)


// 4. Số PI (không bao giờ thay đổi)


// 5. Điểm số trong game (thay đổi liên tục)


// Test code của bạn
console.log('Name:', name);
console.log('Age:', age);
age++; // Tăng tuổi
console.log('New Age:', age);
```

**Đáp án**:
```javascript
const name = 'Nguyễn Văn A';
let age = 25;
let city = 'Hà Nội';
const PI = 3.14159;
let score = 0;
```

### Bài tập 2: Scope Challenge

```javascript
// Dự đoán output của đoạn code sau:

const x = 10;

function test() {
    const x = 20;
    
    if (true) {
        const x = 30;
        console.log('Inside if:', x); // ?
    }
    
    console.log('Inside function:', x); // ?
}

test();
console.log('Global:', x); // ?

// Viết đáp án của bạn:
// 1. Inside if: ???
// 2. Inside function: ???
// 3. Global: ???
```

**Đáp án**:
```javascript
// 1. Inside if: 30
// 2. Inside function: 20
// 3. Global: 10
```

### Bài tập 3: var vs let trong Loops

```javascript
// Dự đoán output:

console.log('=== VAR ===');
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 1000);
}

console.log('=== LET ===');
for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log(j), 1000);
}

// Viết đáp án của bạn:
// VAR output: ???
// LET output: ???

// Giải thích tại sao?
```

**Đáp án**:
```javascript
// VAR output: 3, 3, 3
// Lý do: var i được share, khi setTimeout chạy, i đã = 3

// LET output: 0, 1, 2
// Lý do: let j tạo ra biến mới cho mỗi iteration
```

### Bài tập 4: const với Objects

```javascript
const person = {
    name: 'John',
    age: 30,
    hobbies: ['reading', 'coding']
};

// Những dòng code nào dưới đây là hợp lệ? ✅/❌

person.name = 'Jane';                    // ?
person.email = 'john@example.com';       // ?
person.hobbies.push('gaming');           // ?
delete person.age;                       // ?
person = { name: 'Bob' };                // ?
person.hobbies = ['swimming'];           // ?
```

**Đáp án**:
```javascript
person.name = 'Jane';                    // ✅ OK
person.email = 'john@example.com';       // ✅ OK
person.hobbies.push('gaming');           // ✅ OK
delete person.age;                       // ✅ OK
person = { name: 'Bob' };                // ❌ ERROR
person.hobbies = ['swimming'];           // ✅ OK (reassign property, not variable)
```

### Bài tập 5: Hoisting Challenge

```javascript
// Dự đoán output hoặc error:

console.log(a); // ?
var a = 1;
console.log(a); // ?

console.log(b); // ?
let b = 2;
console.log(b); // ?

console.log(c); // ?
const c = 3;
console.log(c); // ?
```

**Đáp án**:
```javascript
console.log(a); // undefined
var a = 1;
console.log(a); // 1

console.log(b); // ❌ ReferenceError: Cannot access 'b' before initialization
let b = 2;
console.log(b); // 2

console.log(c); // ❌ ReferenceError: Cannot access 'c' before initialization
const c = 3;
console.log(c); // 3
```

### Bài tập 6: Practical Exercise - User Data Management

```javascript
// Tạo một mini program quản lý thông tin user

// TODO: Khai báo các biến với const/let phù hợp

// 1. User data (object) - có thể thay đổi properties
const user = {
    username: 'john_doe',
    email: 'john@example.com',
    loginCount: 0,
    isActive: true
};

// 2. Hàm tăng login count
function login(user) {
    // TODO: Tăng loginCount lên 1
    // TODO: Log ra console
}

// 3. Hàm cập nhật email
function updateEmail(user, newEmail) {
    // TODO: Validate email có chứa '@' không
    // TODO: Nếu hợp lệ, cập nhật email
    // TODO: Nếu không, log error
}

// 4. Hàm deactivate user
function deactivateUser(user) {
    // TODO: Set isActive = false
    // TODO: Log thông báo
}

// Test functions
console.log('Initial user:', user);
login(user);
login(user);
updateEmail(user, 'newemail@example.com');
deactivateUser(user);
console.log('Final user:', user);
```

**Đáp án**:
```javascript
const user = {
    username: 'john_doe',
    email: 'john@example.com',
    loginCount: 0,
    isActive: true
};

function login(user) {
    user.loginCount++;
    console.log(`User logged in. Total logins: ${user.loginCount}`);
}

function updateEmail(user, newEmail) {
    if (newEmail.includes('@')) {
        user.email = newEmail;
        console.log(`Email updated to: ${newEmail}`);
    } else {
        console.log('Error: Invalid email format');
    }
}

function deactivateUser(user) {
    user.isActive = false;
    console.log('User has been deactivated');
}

// Test
console.log('Initial user:', user);
login(user);
login(user);
updateEmail(user, 'newemail@example.com');
deactivateUser(user);
console.log('Final user:', user);
```

### Bài tập 7: Block Scope Exercise

```javascript
// Fix the code để mỗi button log đúng số của nó

// ❌ Code lỗi:
for (var i = 1; i <= 3; i++) {
    const button = document.createElement('button');
    button.textContent = 'Button ' + i;
    button.onclick = function() {
        console.log('Button ' + i + ' clicked'); // Sẽ log "Button 4 clicked" cho tất cả
    };
    document.body.appendChild(button);
}

// TODO: Fix bằng cách đổi var thành let
```

**Đáp án**:
```javascript
// ✅ Code đúng:
for (let i = 1; i <= 3; i++) { // Đổi var thành let
    const button = document.createElement('button');
    button.textContent = 'Button ' + i;
    button.onclick = function() {
        console.log('Button ' + i + ' clicked'); // Giờ sẽ log đúng
    };
    document.body.appendChild(button);
}
```

---

## 📝 Tóm tắt

Trong bài này bạn đã học:
- ✅ 3 cách khai báo biến: `var`, `let`, `const`
- ✅ Sự khác biệt về scope (function vs block)
- ✅ Hoisting và Temporal Dead Zone (TDZ)
- ✅ `const` không phải immutable với objects/arrays
- ✅ Best practices: Dùng `const` mặc định, `let` khi cần thay đổi, tránh `var`
- ✅ Các vấn đề thực tế với var (closure trong loops)

---

## 🎯 Kiến thức cần nắm vững

Trước khi chuyển sang bài tiếp theo:
- [ ] Hiểu rõ sự khác biệt giữa var, let, const
- [ ] Biết khi nào dùng let, khi nào dùng const
- [ ] Hiểu scope (global, function, block)
- [ ] Hiểu hoisting và TDZ
- [ ] Hiểu tại sao const object vẫn thay đổi được

---

**Bài tiếp theo**: [Bài 03 - Kiểu dữ liệu (Primitives & Reference)](./Lesson_03_Data_Types.md)

