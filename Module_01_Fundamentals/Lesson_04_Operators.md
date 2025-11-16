# Bài 04: Toán tử và Biểu thức (Operators)

## 📖 Lý thuyết

**Toán tử** (Operators) là các ký hiệu đặc biệt dùng để thực hiện các phép toán trên operands (toán hạng).

```javascript
const result = 10 + 5; // '+' là operator, 10 và 5 là operands
```

JavaScript có nhiều loại operators:

1. **Arithmetic Operators** - Toán tử số học
2. **Assignment Operators** - Toán tử gán
3. **Comparison Operators** - Toán tử so sánh
4. **Logical Operators** - Toán tử logic
5. **String Operators** - Toán tử chuỗi
6. **Conditional (Ternary) Operator** - Toán tử điều kiện
7. **Type Operators** - Toán tử kiểu
8. **Bitwise Operators** - Toán tử bit (nâng cao)

---

## 💡 Các loại Operators

### 1. Arithmetic Operators (Toán tử số học)

```javascript
let a = 10;
let b = 3;

// Cộng
console.log(a + b);  // 13

// Trừ
console.log(a - b);  // 7

// Nhân
console.log(a * b);  // 30

// Chia
console.log(a / b);  // 3.3333...

// Chia lấy dư (Modulo)
console.log(a % b);  // 1

// Lũy thừa (ES7)
console.log(a ** b); // 1000 (10^3)

// Tăng (Increment)
let x = 5;
console.log(++x);    // 6 (pre-increment)
console.log(x++);    // 6 (post-increment, return trước rồi mới tăng)
console.log(x);      // 7

// Giảm (Decrement)
let y = 5;
console.log(--y);    // 4 (pre-decrement)
console.log(y--);    // 4 (post-decrement)
console.log(y);      // 3

// Unary operators
console.log(+true);  // 1 (convert to number)
console.log(+'5');   // 5 (convert to number)
console.log(-'5');   // -5
```

**Increment/Decrement chi tiết**:
```javascript
// Pre-increment (++x)
let a = 5;
let b = ++a; // a tăng lên 6 TRƯỚC, rồi gán vào b
console.log(a); // 6
console.log(b); // 6

// Post-increment (x++)
let c = 5;
let d = c++; // gán c vào d TRƯỚC (5), rồi c mới tăng lên 6
console.log(c); // 6
console.log(d); // 5

// Trong thực tế
let counter = 0;
console.log(counter++); // 0 (in ra rồi mới tăng)
console.log(counter);   // 1

let counter2 = 0;
console.log(++counter2); // 1 (tăng rồi mới in)
console.log(counter2);   // 1
```

### 2. Assignment Operators (Toán tử gán)

```javascript
let x = 10; // Gán cơ bản

// Compound assignment (gán kết hợp)
x += 5;  // x = x + 5  → 15
x -= 3;  // x = x - 3  → 12
x *= 2;  // x = x * 2  → 24
x /= 4;  // x = x / 4  → 6
x %= 4;  // x = x % 4  → 2
x **= 3; // x = x ** 3 → 8

// Logical assignment (ES2021)
let a = null;
a ||= 10;  // a = a || 10 (nếu a falsy, gán 10)
console.log(a); // 10

let b = 5;
b &&= 20;  // b = b && 20 (nếu b truthy, gán 20)
console.log(b); // 20

let c = null;
c ??= 15;  // c = c ?? 15 (nếu c null/undefined, gán 15)
console.log(c); // 15
```

### 3. Comparison Operators (Toán tử so sánh)

Trả về `true` hoặc `false`.

```javascript
let a = 10;
let b = 5;
let c = '10';

// Equal (loose equality - có type coercion)
console.log(a == c);   // true (10 == '10')
console.log(5 == '5'); // true

// Strict equal (strict equality - không có type coercion)
console.log(a === c);   // false (10 !== '10', khác type)
console.log(a === 10);  // true

// Not equal (loose)
console.log(a != b);   // true
console.log(a != '10'); // false

// Strict not equal
console.log(a !== c);   // true (khác type)
console.log(a !== 10);  // false

// Greater than
console.log(a > b);    // true (10 > 5)

// Greater than or equal
console.log(a >= 10);  // true

// Less than
console.log(b < a);    // true (5 < 10)

// Less than or equal
console.log(b <= 5);   // true

// Comparisons với strings (alphabetical order)
console.log('apple' < 'banana');  // true
console.log('a' < 'b');           // true
console.log('2' > '12');          // true (string comparison, '2' > '1')
```

**== vs ===**:
```javascript
// == (Loose Equality) - Có type coercion
console.log(5 == '5');        // true
console.log(true == 1);       // true
console.log(false == 0);      // true
console.log(null == undefined); // true
console.log('' == false);     // true

// === (Strict Equality) - Không có type coercion
console.log(5 === '5');       // false
console.log(true === 1);      // false
console.log(false === 0);     // false
console.log(null === undefined); // false
console.log('' === false);    // false

// Best Practice: Luôn dùng === và !==
```

### 4. Logical Operators (Toán tử logic)

```javascript
// AND (&&) - Cả hai phải true
console.log(true && true);    // true
console.log(true && false);   // false
console.log(false && true);   // false
console.log(false && false);  // false

// OR (||) - Một trong hai true là được
console.log(true || true);    // true
console.log(true || false);   // true
console.log(false || true);   // true
console.log(false || false);  // false

// NOT (!) - Đảo ngược boolean
console.log(!true);           // false
console.log(!false);          // true
console.log(!0);              // true
console.log(!'hello');        // false

// Practical examples
const age = 25;
const hasLicense = true;

// AND
if (age >= 18 && hasLicense) {
    console.log('Can drive'); // ✓
}

// OR
const isWeekend = false;
const isHoliday = true;

if (isWeekend || isHoliday) {
    console.log('No work today!'); // ✓
}

// NOT
const isLoggedIn = false;
if (!isLoggedIn) {
    console.log('Please login'); // ✓
}
```

**Short-circuit Evaluation**:
```javascript
// && returns first falsy value or last value
console.log(true && 'hello');     // 'hello'
console.log(false && 'hello');    // false
console.log('hi' && 'hello');     // 'hello'
console.log('' && 'hello');       // ''
console.log(null && 'hello');     // null

// Practical use
const user = { name: 'John' };
const userName = user && user.name; // 'John'
const noUser = null;
const noName = noUser && noUser.name; // null (không lỗi)

// || returns first truthy value or last value
console.log(false || 'hello');    // 'hello'
console.log(true || 'hello');     // true
console.log('' || 'default');     // 'default'
console.log('hi' || 'default');   // 'hi'
console.log(null || undefined || 'default'); // 'default'

// Practical use - Default values
const userInput = '';
const value = userInput || 'Default Value'; // 'Default Value'

// ⚠️ Vấn đề với ||
const count = 0;
const result = count || 10; // 10 (sai! 0 là falsy nhưng là valid value)

// ✅ Giải pháp: Nullish Coalescing (??)
const betterResult = count ?? 10; // 0 (đúng!)
```

**Nullish Coalescing Operator (??) - ES2020**:
```javascript
// ?? chỉ check null hoặc undefined (không check falsy)
console.log(null ?? 'default');      // 'default'
console.log(undefined ?? 'default'); // 'default'
console.log(0 ?? 'default');         // 0 (không phải null/undefined)
console.log('' ?? 'default');        // '' (không phải null/undefined)
console.log(false ?? 'default');     // false

// So sánh || vs ??
const value1 = 0 || 10;   // 10 (0 is falsy)
const value2 = 0 ?? 10;   // 0  (0 không phải null/undefined)

const value3 = '' || 'default';  // 'default' ('' is falsy)
const value4 = '' ?? 'default';  // '' ('' không phải null/undefined)
```

### 5. String Operators

```javascript
// Concatenation với +
const firstName = 'John';
const lastName = 'Doe';
const fullName = firstName + ' ' + lastName; // 'John Doe'

// += với strings
let message = 'Hello';
message += ' ';
message += 'World';
console.log(message); // 'Hello World'

// Template literals (preferred)
const age = 25;
const greeting = `My name is ${firstName} ${lastName} and I'm ${age} years old.`;
console.log(greeting);

// Comparison
console.log('a' < 'b');    // true (alphabetical)
console.log('apple' < 'banana'); // true
console.log('10' < '9');   // true ('1' < '9')
```

### 6. Conditional (Ternary) Operator

Syntax: `condition ? valueIfTrue : valueIfFalse`

```javascript
// Basic
const age = 20;
const status = age >= 18 ? 'Adult' : 'Minor';
console.log(status); // 'Adult'

// Instead of if-else
let message;
if (age >= 18) {
    message = 'Can vote';
} else {
    message = 'Cannot vote';
}

// Better with ternary
const message2 = age >= 18 ? 'Can vote' : 'Cannot vote';

// Nested ternary (tránh dùng nhiều, khó đọc)
const score = 85;
const grade = score >= 90 ? 'A' :
              score >= 80 ? 'B' :
              score >= 70 ? 'C' :
              score >= 60 ? 'D' : 'F';
console.log(grade); // 'B'

// Practical examples
const isLoggedIn = true;
const userName = isLoggedIn ? 'John' : 'Guest';

const items = 3;
const message3 = `You have ${items} item${items !== 1 ? 's' : ''} in cart`;
console.log(message3); // 'You have 3 items in cart'
```

### 7. Type Operators

```javascript
// typeof - Kiểm tra kiểu dữ liệu
console.log(typeof 42);        // 'number'
console.log(typeof 'hello');   // 'string'
console.log(typeof true);      // 'boolean'
console.log(typeof undefined); // 'undefined'
console.log(typeof {});        // 'object'
console.log(typeof []);        // 'object'
console.log(typeof null);      // 'object' (bug!)
console.log(typeof function(){}); // 'function'

// instanceof - Kiểm tra object thuộc class/constructor nào
const arr = [1, 2, 3];
const date = new Date();
const regex = /hello/;

console.log(arr instanceof Array);     // true
console.log(date instanceof Date);     // true
console.log(regex instanceof RegExp);  // true
console.log(arr instanceof Object);    // true (Array extends Object)

// in - Kiểm tra property có trong object không
const person = { name: 'John', age: 30 };
console.log('name' in person);   // true
console.log('email' in person);  // false
console.log('toString' in person); // true (inherited from Object)
```

### 8. Operator Precedence (Thứ tự ưu tiên)

```javascript
// Precedence cao sẽ được thực hiện trước
const result1 = 10 + 5 * 2;  // 20 (*, / trước +, -)
const result2 = (10 + 5) * 2; // 30 (ngoặc cao nhất)

// Detailed example
const a = 2 + 3 * 4;     // 14 (3*4 = 12, 2+12 = 14)
const b = (2 + 3) * 4;   // 20 (2+3 = 5, 5*4 = 20)
const c = 2 ** 3 ** 2;   // 512 (3^2 = 9, 2^9 = 512, ** right-associative)
const d = (2 ** 3) ** 2; // 64 (2^3 = 8, 8^2 = 64)

// Precedence order (cao → thấp)
// 1. () - Grouping
// 2. ++, -- - Increment/Decrement
// 3. **, * / % - Exponentiation, Multiplication, Division, Modulo
// 4. +, - - Addition, Subtraction
// 5. <, <=, >, >= - Comparison
// 6. ==, !=, ===, !== - Equality
// 7. && - Logical AND
// 8. || - Logical OR
// 9. ? : - Ternary
// 10. =, +=, -= - Assignment

// Complex example
const result = 5 + 3 * 2 < 10 && 15 / 3 === 5 || false;
// Step by step:
// 1. 3 * 2 = 6
// 2. 5 + 6 = 11
// 3. 11 < 10 = false
// 4. 15 / 3 = 5
// 5. 5 === 5 = true
// 6. false && true = false
// 7. false || false = false
console.log(result); // false
```

---

## 🔍 Giải thích sâu

### 1. Type Coercion trong Operators

```javascript
// Implicit coercion
console.log('5' + 3);     // '53' (number → string)
console.log('5' - 3);     // 2 (string → number)
console.log('5' * '2');   // 10 (string → number)
console.log('10' / '2');  // 5 (string → number)
console.log('10' % '3');  // 1 (string → number)

// Boolean coercion
console.log(true + 1);    // 2 (true → 1)
console.log(false + 1);   // 1 (false → 0)
console.log(true * 3);    // 3

// Weird cases
console.log('5' + 3 + 2);  // '532' (left-to-right: '5' + 3 = '53', '53' + 2 = '532')
console.log(3 + 2 + '5');  // '55' (left-to-right: 3 + 2 = 5, 5 + '5' = '55')
console.log('5' - 3 + 2);  // 4 (left-to-right: '5' - 3 = 2, 2 + 2 = 4)

// null và undefined
console.log(null + 5);     // 5 (null → 0)
console.log(undefined + 5); // NaN (undefined → NaN)
console.log(null == 0);    // false (special case!)
console.log(null == undefined); // true
console.log(null === undefined); // false
```

### 2. Truthy/Falsy trong Logical Operators

```javascript
// && returns first falsy or last value
console.log('hello' && 'world');        // 'world'
console.log(0 && 'hello');              // 0
console.log(null && 'hello');           // null
console.log('hello' && 0 && 'world');   // 0

// || returns first truthy or last value
console.log('hello' || 'world');        // 'hello'
console.log(0 || 'hello');              // 'hello'
console.log('' || 0 || null || 'yes');  // 'yes'
console.log(false || 0 || null);        // null (last value)

// Practical: Default values
function greet(name) {
    name = name || 'Guest'; // Nếu name falsy, dùng 'Guest'
    console.log(`Hello, ${name}!`);
}

greet('John');  // Hello, John!
greet();        // Hello, Guest!
greet('');      // Hello, Guest! ('' is falsy)

// Better with ES6 default parameters
function greet2(name = 'Guest') {
    console.log(`Hello, ${name}!`);
}

// Even better với Nullish Coalescing
function greet3(name) {
    name = name ?? 'Guest'; // Chỉ check null/undefined
    console.log(`Hello, ${name}!`);
}

greet3('');     // Hello, ! ('' is valid)
greet3(0);      // Hello, 0! (0 is valid)
greet3(null);   // Hello, Guest!
```

### 3. Optional Chaining (?.) - ES2020

```javascript
const user = {
    name: 'John',
    address: {
        city: 'Ha Noi'
    }
};

// Old way
const city1 = user && user.address && user.address.city;

// New way với Optional Chaining
const city2 = user?.address?.city; // 'Ha Noi'

// Với null/undefined
const noUser = null;
const noCity = noUser?.address?.city; // undefined (không lỗi)

// Với arrays
const users = [
    { name: 'John', email: 'john@example.com' },
    { name: 'Jane' }
];

console.log(users[0]?.email);  // 'john@example.com'
console.log(users[1]?.email);  // undefined
console.log(users[2]?.email);  // undefined (không lỗi)

// Với functions
const obj = {
    method() {
        return 'Hello';
    }
};

console.log(obj.method?.());     // 'Hello'
console.log(obj.missing?.());    // undefined (không lỗi)
```

### 4. Comma Operator

```javascript
// Comma operator đánh giá tất cả expressions, return cái cuối
const a = (1, 2, 3, 4);
console.log(a); // 4

// Practical use trong for loop
for (let i = 0, j = 10; i < 5; i++, j--) {
    console.log(`i: ${i}, j: ${j}`);
}

// Nhưng thường không nên dùng vì khó đọc
```

---

## ✏️ Bài tập

### Bài tập 1: Arithmetic Operators

```javascript
// Viết calculator đơn giản
function calculate(num1, num2, operator) {
    // TODO: Implement
    // Support: +, -, *, /, %, **
}

console.log(calculate(10, 5, '+'));  // 15
console.log(calculate(10, 5, '-'));  // 5
console.log(calculate(10, 5, '*'));  // 50
console.log(calculate(10, 5, '/'));  // 2
console.log(calculate(10, 3, '%'));  // 1
console.log(calculate(2, 3, '**'));  // 8
```

**Đáp án**:
```javascript
function calculate(num1, num2, operator) {
    switch(operator) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '/': return num1 / num2;
        case '%': return num1 % num2;
        case '**': return num1 ** num2;
        default: return 'Invalid operator';
    }
}
```

### Bài tập 2: Comparison Operators

```javascript
// Dự đoán output (true/false):

console.log(5 == '5');          // ?
console.log(5 === '5');         // ?
console.log(null == undefined); // ?
console.log(null === undefined);// ?
console.log(0 == false);        // ?
console.log(0 === false);       // ?
console.log('' == false);       // ?
console.log('' === false);      // ?
console.log(NaN == NaN);        // ?
console.log(NaN === NaN);       // ?
```

**Đáp án**:
```javascript
console.log(5 == '5');          // true
console.log(5 === '5');         // false
console.log(null == undefined); // true
console.log(null === undefined);// false
console.log(0 == false);        // true
console.log(0 === false);       // false
console.log('' == false);       // true
console.log('' === false);      // false
console.log(NaN == NaN);        // false
console.log(NaN === NaN);       // false
```

### Bài tập 3: Logical Operators

```javascript
// Implement authentication logic
function canAccessAdmin(user) {
    // TODO: Return true nếu:
    // - user tồn tại
    // - user.isActive === true
    // - user.role === 'admin' HOẶC user.role === 'superadmin'
}

const user1 = { isActive: true, role: 'admin' };
const user2 = { isActive: false, role: 'admin' };
const user3 = { isActive: true, role: 'user' };
const user4 = null;

console.log(canAccessAdmin(user1)); // true
console.log(canAccessAdmin(user2)); // false
console.log(canAccessAdmin(user3)); // false
console.log(canAccessAdmin(user4)); // false
```

**Đáp án**:
```javascript
function canAccessAdmin(user) {
    return user && user.isActive && (user.role === 'admin' || user.role === 'superadmin');
}

// Hoặc dùng Optional Chaining
function canAccessAdmin2(user) {
    return user?.isActive && (user.role === 'admin' || user.role === 'superadmin');
}
```

### Bài tập 4: Ternary Operator

```javascript
// Convert if-else sang ternary operator

// 1. Simple
let age = 20;
let status;
if (age >= 18) {
    status = 'Adult';
} else {
    status = 'Minor';
}
// TODO: Convert sang ternary


// 2. Grade calculator
let score = 85;
let grade;
if (score >= 90) {
    grade = 'A';
} else if (score >= 80) {
    grade = 'B';
} else if (score >= 70) {
    grade = 'C';
} else {
    grade = 'F';
}
// TODO: Convert sang ternary


// 3. Discount calculator
function getDiscount(isMember, totalAmount) {
    // TODO: Implement using ternary
    // - Nếu isMember và totalAmount >= 100: 20% discount
    // - Nếu isMember: 10% discount
    // - Nếu totalAmount >= 100: 5% discount
    // - Không: 0% discount
}
```

**Đáp án**:
```javascript
// 1.
const status = age >= 18 ? 'Adult' : 'Minor';

// 2.
const grade = score >= 90 ? 'A' :
              score >= 80 ? 'B' :
              score >= 70 ? 'C' : 'F';

// 3.
function getDiscount(isMember, totalAmount) {
    return isMember && totalAmount >= 100 ? 0.2 :
           isMember ? 0.1 :
           totalAmount >= 100 ? 0.05 : 0;
}
```

### Bài tập 5: Nullish Coalescing và Optional Chaining

```javascript
// Fix the code using ?? and ?.

const config = {
    timeout: 0,
    port: null,
    host: 'localhost',
    debug: false
};

// ❌ Bug: 0 và false bị coi là "không có giá trị"
const timeout = config.timeout || 5000;     // 5000 (sai!)
const debug = config.debug || true;         // true (sai!)

// TODO: Fix using ??


// Nested object access
const user = {
    name: 'John',
    settings: {
        theme: 'dark'
    }
};

// ❌ Dài dòng
const theme1 = user && user.settings && user.settings.theme;

// TODO: Fix using ?.


// Array access
const users = null;
// ❌ TypeError
// const firstName = users[0].name;

// TODO: Fix using ?.
```

**Đáp án**:
```javascript
// Fix với ??
const timeout = config.timeout ?? 5000;     // 0 (đúng!)
const port = config.port ?? 3000;           // 3000
const debug = config.debug ?? true;         // false (đúng!)

// Fix với ?.
const theme2 = user?.settings?.theme;       // 'dark'

// Array access
const firstName = users?.[0]?.name;         // undefined (no error)
```

### Bài tập 6: Operator Precedence

```javascript
// Dự đoán kết quả:

console.log(2 + 3 * 4);           // ?
console.log((2 + 3) * 4);         // ?
console.log(10 - 5 - 2);          // ?
console.log(2 ** 3 ** 2);         // ?
console.log((2 ** 3) ** 2);       // ?
console.log(5 + '5' - 5);         // ?
console.log('5' + 5 - 5);         // ?
console.log(true + true * 2);     // ?
console.log(10 > 5 && 15 < 20);   // ?
console.log(10 > 5 && 15 > 20 || 30 < 40); // ?
```

**Đáp án**:
```javascript
console.log(2 + 3 * 4);           // 14
console.log((2 + 3) * 4);         // 20
console.log(10 - 5 - 2);          // 3 (left-to-right)
console.log(2 ** 3 ** 2);         // 512 (right-to-left: 3^2=9, 2^9=512)
console.log((2 ** 3) ** 2);       // 64 (2^3=8, 8^2=64)
console.log(5 + '5' - 5);         // 50 ('5'+'5'='55', '55'-5=50)
console.log('5' + 5 - 5);         // 50 ('5'+5='55', '55'-5=50)
console.log(true + true * 2);     // 3 (true=1: 1 + 1*2 = 3)
console.log(10 > 5 && 15 < 20);   // true
console.log(10 > 5 && 15 > 20 || 30 < 40); // true (false || true = true)
```

### Bài tập 7: Practical Exercise - Shopping Cart

```javascript
// Tạo shopping cart logic

const cart = {
    items: [
        { name: 'Laptop', price: 1000, quantity: 1 },
        { name: 'Mouse', price: 20, quantity: 2 },
        { name: 'Keyboard', price: 50, quantity: 1 }
    ],
    discount: 0,
    shippingFee: 10
};

// TODO: Tạo các functions

// 1. Tính tổng giá items (chưa tính discount và shipping)
function calculateSubtotal(cart) {
    // Sử dụng loop và arithmetic operators
}

// 2. Tính discount
function calculateDiscount(subtotal, discountPercent) {
    // Return số tiền được giảm
}

// 3. Áp dụng coupon code
function applyCoupon(cart, code) {
    // 'SAVE10': 10% discount
    // 'SAVE20': 20% discount
    // 'FREESHIP': free shipping (shippingFee = 0)
    // Invalid: không làm gì
}

// 4. Tính total cuối cùng
function calculateTotal(cart) {
    // subtotal - discount + shipping
}

// 5. Kiểm tra free shipping
function isFreeShipping(subtotal) {
    // Free nếu subtotal >= 100
}

// Test
console.log('Subtotal:', calculateSubtotal(cart));
applyCoupon(cart, 'SAVE10');
console.log('Total:', calculateTotal(cart));
console.log('Free shipping?', isFreeShipping(calculateSubtotal(cart)));
```

**Đáp án**:
```javascript
function calculateSubtotal(cart) {
    let subtotal = 0;
    for (let item of cart.items) {
        subtotal += item.price * item.quantity;
    }
    return subtotal;
}

function calculateDiscount(subtotal, discountPercent) {
    return subtotal * (discountPercent / 100);
}

function applyCoupon(cart, code) {
    if (code === 'SAVE10') {
        cart.discount = 10;
    } else if (code === 'SAVE20') {
        cart.discount = 20;
    } else if (code === 'FREESHIP') {
        cart.shippingFee = 0;
    }
}

function calculateTotal(cart) {
    const subtotal = calculateSubtotal(cart);
    const discount = calculateDiscount(subtotal, cart.discount);
    const shipping = isFreeShipping(subtotal) ? 0 : cart.shippingFee;
    return subtotal - discount + shipping;
}

function isFreeShipping(subtotal) {
    return subtotal >= 100;
}
```

---

## 📝 Tóm tắt

Trong bài này bạn đã học:
- ✅ 8 loại operators: Arithmetic, Assignment, Comparison, Logical, String, Ternary, Type, Bitwise
- ✅ == vs === (loose vs strict equality)
- ✅ Short-circuit evaluation với && và ||
- ✅ Nullish Coalescing (??) và Optional Chaining (?.)
- ✅ Ternary operator cho code ngắn gọn
- ✅ Operator precedence (thứ tự ưu tiên)
- ✅ Type coercion trong operators

---

## 🎯 Kiến thức cần nắm vững

Trước khi chuyển sang bài tiếp theo:
- [ ] Hiểu rõ các loại operators và cách sử dụng
- [ ] Phân biệt == và === (luôn dùng ===)
- [ ] Hiểu short-circuit evaluation
- [ ] Biết khi nào dùng ??, ?., và ternary operator
- [ ] Hiểu operator precedence
- [ ] Biết cách type coercion hoạt động

---

**Bài tiếp theo**: [Bài 05 - Ép kiểu và Type Coercion](./Lesson_05_Type_Conversion.md)

