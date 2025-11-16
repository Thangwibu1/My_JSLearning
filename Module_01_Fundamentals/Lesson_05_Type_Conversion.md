# Bài 05: Ép kiểu và Type Coercion

## 📖 Lý thuyết

### Type Conversion vs Type Coercion

**Type Conversion** (Explicit - Tường minh):
- Lập trình viên **chủ động** chuyển đổi kiểu
- Sử dụng các hàm: `String()`, `Number()`, `Boolean()`

**Type Coercion** (Implicit - Ngầm định):
- JavaScript **tự động** chuyển đổi kiểu
- Xảy ra trong operators và comparisons

```javascript
// Type Conversion (Explicit)
const num = Number('123');    // Chủ động convert
const str = String(123);      // Chủ động convert

// Type Coercion (Implicit)
const result = '5' + 3;       // '53' - JS tự động convert 3 thành '3'
const result2 = '5' - 3;      // 2 - JS tự động convert '5' thành 5
```

---

## 💡 Type Conversion (Chuyển đổi tường minh)

### 1. Convert to String

```javascript
// String() function
String(123);          // '123'
String(true);         // 'true'
String(false);        // 'false'
String(null);         // 'null'
String(undefined);    // 'undefined'
String([1, 2, 3]);    // '1,2,3'
String({ a: 1 });     // '[object Object]'

// .toString() method
(123).toString();     // '123'
true.toString();      // 'true'
[1, 2, 3].toString(); // '1,2,3'
// null.toString();   // ❌ TypeError (null không có method)
// undefined.toString(); // ❌ TypeError

// Template literals (implicit)
const num = 123;
const str = `${num}`; // '123'

// Concatenation với empty string
const str2 = 123 + '';  // '123'
const str3 = true + ''; // 'true'
```

### 2. Convert to Number

```javascript
// Number() function
Number('123');        // 123
Number('123.45');     // 123.45
Number('');           // 0 (empty string)
Number('   ');        // 0 (whitespace)
Number('123abc');     // NaN
Number('abc');        // NaN
Number(true);         // 1
Number(false);        // 0
Number(null);         // 0
Number(undefined);    // NaN
Number([]);           // 0
Number([1]);          // 1
Number([1, 2]);       // NaN
Number({ a: 1 });     // NaN

// parseInt() - Chuyển thành integer
parseInt('123');      // 123
parseInt('123.45');   // 123 (chỉ lấy phần nguyên)
parseInt('123abc');   // 123 (parse đến khi gặp non-digit)
parseInt('abc123');   // NaN (bắt đầu bằng non-digit)
parseInt('   123');   // 123 (bỏ whitespace)

// Radix (cơ số)
parseInt('10', 10);   // 10 (decimal)
parseInt('10', 2);    // 2  (binary: 10 = 2)
parseInt('10', 16);   // 16 (hexadecimal: 10 = 16)
parseInt('FF', 16);   // 255

// parseFloat() - Chuyển thành float
parseFloat('123.45');    // 123.45
parseFloat('123.45.67'); // 123.45 (dừng ở dấu . thứ 2)
parseFloat('123abc');    // 123

// Unary + operator (shorthand)
+'123';          // 123
+'123.45';       // 123.45
+'';             // 0
+'abc';          // NaN
+true;           // 1
+false;          // 0
+null;           // 0
+undefined;      // NaN
```

### 3. Convert to Boolean

```javascript
// Boolean() function
Boolean(1);           // true
Boolean(0);           // false
Boolean(-1);          // true
Boolean('hello');     // true
Boolean('');          // false
Boolean('0');         // true (non-empty string)
Boolean('false');     // true (non-empty string)
Boolean(null);        // false
Boolean(undefined);   // false
Boolean(NaN);         // false
Boolean({});          // true (object)
Boolean([]);          // true (array)
Boolean(function(){}); // true (function)

// Double NOT operator (shorthand)
!!1;              // true
!!0;              // false
!!'hello';        // true
!!'';             // false

// Falsy values (6 + 1):
// 1. false
// 2. 0
// 3. '' (empty string)
// 4. null
// 5. undefined
// 6. NaN
// 7. 0n (BigInt zero)

// Tất cả còn lại là Truthy
```

---

## 🔍 Type Coercion (Chuyển đổi ngầm định)

### 1. String Coercion

Khi sử dụng operator `+` với string, tất cả được convert thành string.

```javascript
// Number to String
'Hello' + 123;        // 'Hello123'
'5' + 3;              // '53'
'5' + 3 + 2;          // '532' (left-to-right)
3 + 2 + '5';          // '55' (3+2=5, 5+'5'='55')

// Boolean to String
'Result: ' + true;    // 'Result: true'
'Value: ' + false;    // 'Value: false'

// null, undefined to String
'Value: ' + null;     // 'Value: null'
'Value: ' + undefined; // 'Value: undefined'

// Object to String
'Object: ' + {};      // 'Object: [object Object]'
'Array: ' + [1, 2];   // 'Array: 1,2'

// Template literals
const num = 42;
`Answer: ${num}`;     // 'Answer: 42' (num → string)
```

### 2. Number Coercion

Các operators khác `+` (như `-`, `*`, `/`, `%`) convert thành number.

```javascript
// String to Number
'5' - 3;              // 2
'10' * '2';           // 20
'20' / '5';           // 4
'10' % '3';           // 1

// Boolean to Number
true + 1;             // 2 (true → 1)
false + 1;            // 1 (false → 0)
true * 3;             // 3
false * 100;          // 0

// null to Number
null + 5;             // 5 (null → 0)
null * 10;            // 0

// undefined to Number
undefined + 5;        // NaN (undefined → NaN)

// Special cases
'5' - '2';            // 3
'5' + - '2';          // '5-2' → '5' + (-2) → tricky!
'5' - - '2';          // 7 (double negative)

// Non-numeric strings
'abc' - 3;            // NaN
'123abc' - 3;         // NaN (toàn bộ string không convert được)

// Unary +
+'5';                 // 5
+'123.45';            // 123.45
```

### 3. Boolean Coercion

Trong contexts boolean (if, while, logical operators), values được convert.

```javascript
// if statements
if ('hello') {
    console.log('Truthy'); // ✓ Chạy
}

if (0) {
    console.log('Truthy');
} else {
    console.log('Falsy'); // ✓ Chạy
}

// Logical operators
console.log(true && 'hello');   // 'hello'
console.log(false && 'hello');  // false
console.log('' || 'default');   // 'default'
console.log('value' || 'default'); // 'value'

// Ternary operator
const result = 5 ? 'yes' : 'no'; // 'yes' (5 is truthy)
const result2 = 0 ? 'yes' : 'no'; // 'no' (0 is falsy)

// NOT operator
!5;                   // false (5 is truthy)
!0;                   // true (0 is falsy)
!!'hello';            // true
!!0;                  // false
```

### 4. Comparison Coercion

```javascript
// Loose Equality (==) - Có type coercion
5 == '5';             // true (string → number)
0 == false;           // true (boolean → number)
1 == true;            // true
'' == false;          // true
null == undefined;    // true (special case)
'0' == false;         // true ('0' → 0, false → 0)

// Tricky cases
[] == false;          // true ([] → '' → 0, false → 0)
[] == ![];            // true (![] → false, [] → 0)
'' == 0;              // true
'0' == 0;             // true
false == 'false';     // false ('false' → NaN)
null == 0;            // false (special case!)

// Strict Equality (===) - KHÔNG có type coercion
5 === '5';            // false
0 === false;          // false
null === undefined;   // false

// Comparisons (<, >, <=, >=)
'5' > 3;              // true ('5' → 5)
'10' < '9';           // true (string comparison!)
'10' < 9;             // false ('10' → 10)
true > 0;             // true (true → 1)
false < 1;            // true (false → 0)

// String comparison (alphabetical)
'apple' < 'banana';   // true
'2' > '12';           // true ('2' > '1')
'02' < '1';           // true
```

---

## 🚨 Common Pitfalls (Bẫy thường gặp)

### 1. Addition vs Concatenation

```javascript
console.log(1 + 2 + '3');     // '33' (1+2=3, 3+'3'='33')
console.log('1' + 2 + 3);     // '123' ('1'+2='12', '12'+3='123')
console.log(1 + '2' + 3);     // '123'
console.log('1' + '2' + 3);   // '123'

// Solution: Dùng Number() hoặc +
console.log(1 + 2 + Number('3'));  // 6
console.log(1 + 2 + (+'3'));       // 6
```

### 2. Empty String và 0

```javascript
'' == 0;              // true ⚠️
'' === 0;             // false ✓

// Default values với ||
const input = '';
const value = input || 'default'; // 'default' ('' is falsy)

// Better: Nullish Coalescing
const value2 = input ?? 'default'; // '' (không phải null/undefined)
```

### 3. null vs undefined

```javascript
null == undefined;    // true ⚠️
null === undefined;   // false ✓

null + 5;             // 5 (null → 0)
undefined + 5;        // NaN (undefined → NaN)

Number(null);         // 0
Number(undefined);    // NaN
```

### 4. Arrays và Objects

```javascript
[1, 2, 3] + [4, 5, 6];  // '1,2,34,5,6' (array → string)
[] + [];                 // ''
{} + {};                 // NaN hoặc '[object Object][object Object]' (depends on context)
[] + {};                 // '[object Object]'
{} + [];                 // 0 (context-dependent)

// Better: Dùng methods rõ ràng
[1, 2, 3].concat([4, 5, 6]); // [1, 2, 3, 4, 5, 6]
```

### 5. parseInt Pitfalls

```javascript
parseInt('08');       // 8
parseInt('09');       // 9
parseInt('10');       // 10

// Luôn specify radix!
parseInt('08', 10);   // 8
parseInt('10', 2);    // 2

// Leading zeros
parseInt('0x10');     // 16 (hexadecimal)
parseInt('010');      // 10 (ES5+), 8 (old browsers)

// Partial parsing
parseInt('123abc');   // 123 ⚠️
Number('123abc');     // NaN ✓ (stricter)
```

---

## ✏️ Bài tập

### Bài tập 1: Type Conversion Practice

```javascript
// Dự đoán output:

console.log(String(123));           // ?
console.log(String(true));          // ?
console.log(String(null));          // ?
console.log(String(undefined));     // ?

console.log(Number('123'));         // ?
console.log(Number(''));            // ?
console.log(Number('123abc'));      // ?
console.log(Number(true));          // ?
console.log(Number(false));         // ?
console.log(Number(null));          // ?
console.log(Number(undefined));     // ?

console.log(Boolean(0));            // ?
console.log(Boolean(''));           // ?
console.log(Boolean('0'));          // ?
console.log(Boolean([]));           // ?
console.log(Boolean({}));           // ?
```

### Bài tập 2: parseInt vs Number

```javascript
// So sánh parseInt() và Number()

const testCases = [
    '123',
    '123.45',
    '123abc',
    'abc123',
    '   123   ',
    '',
    '0x10'
];

// TODO: Test với parseInt và Number
testCases.forEach(test => {
    console.log(`Input: '${test}'`);
    console.log('  parseInt:', parseInt(test, 10));
    console.log('  Number:', Number(test));
    console.log('---');
});

// Khi nào dùng parseInt? Khi nào dùng Number?
```

**Đáp án**:
```javascript
// parseInt: Khi muốn parse một phần string (flexible)
// Number: Khi muốn convert toàn bộ string (strict)

'123'       → parseInt: 123,    Number: 123
'123.45'    → parseInt: 123,    Number: 123.45
'123abc'    → parseInt: 123,    Number: NaN
'abc123'    → parseInt: NaN,    Number: NaN
'   123   ' → parseInt: 123,    Number: 123
''          → parseInt: NaN,    Number: 0
'0x10'      → parseInt: 16,     Number: 16
```

### Bài tập 3: Type Coercion Challenges

```javascript
// Dự đoán output:

console.log('5' + 3);               // ?
console.log('5' - 3);               // ?
console.log('5' * '2');             // ?
console.log('10' / '2');            // ?
console.log('5' + 3 + 2);           // ?
console.log(3 + 2 + '5');           // ?
console.log('5' - 3 + 2);           // ?
console.log(true + 1);              // ?
console.log(false + 1);             // ?
console.log('5' + - '2');           // ?
console.log('5' - - '2');           // ?
console.log([] + []);               // ?
console.log([] + {});               // ?
console.log([1, 2] + [3, 4]);       // ?
```

**Đáp án**:
```javascript
console.log('5' + 3);               // '53'
console.log('5' - 3);               // 2
console.log('5' * '2');             // 10
console.log('10' / '2');            // 5
console.log('5' + 3 + 2);           // '532'
console.log(3 + 2 + '5');           // '55'
console.log('5' - 3 + 2);           // 4
console.log(true + 1);              // 2
console.log(false + 1);             // 1
console.log('5' + - '2');           // '5-2'
console.log('5' - - '2');           // 7
console.log([] + []);               // ''
console.log([] + {});               // '[object Object]'
console.log([1, 2] + [3, 4]);       // '1,23,4'
```

### Bài tập 4: Comparison Coercion

```javascript
// Dự đoán output (true/false):

console.log(5 == '5');              // ?
console.log(5 === '5');             // ?
console.log(0 == false);            // ?
console.log(0 === false);           // ?
console.log('' == 0);               // ?
console.log('' === 0);              // ?
console.log(null == undefined);     // ?
console.log(null === undefined);    // ?
console.log('0' == false);          // ?
console.log('0' === false);         // ?
console.log([] == false);           // ?
console.log([] === false);          // ?
console.log(!'');                   // ?
console.log(!0);                    // ?
console.log(!!'hello');             // ?
```

### Bài tập 5: Fix the Bugs

```javascript
// Bug 1: Addition
function add(a, b) {
    return a + b;
}
console.log(add('5', 3));    // '53' ❌ Expected: 8

// TODO: Fix


// Bug 2: Default value
function greet(name) {
    name = name || 'Guest';
    return `Hello, ${name}!`;
}
console.log(greet(''));      // 'Hello, Guest!' ❌ Expected: 'Hello, !'
console.log(greet(0));       // 'Hello, Guest!' ❌ Expected: 'Hello, 0!'

// TODO: Fix


// Bug 3: Comparison
function isEqual(a, b) {
    return a == b;
}
console.log(isEqual(5, '5')); // true ❌ Expected: false

// TODO: Fix


// Bug 4: Array length
const numbers = [1, 2, 3, 4, 5];
const maxIndex = '5';
console.log(numbers[maxIndex - 1]); // Works but wrong approach

// TODO: Fix
```

**Đáp án**:
```javascript
// Bug 1: Fix
function add(a, b) {
    return Number(a) + Number(b);
    // or: return +a + +b;
}

// Bug 2: Fix
function greet(name) {
    name = name ?? 'Guest'; // Dùng ?? thay vì ||
    return `Hello, ${name}!`;
}

// Bug 3: Fix
function isEqual(a, b) {
    return a === b; // Dùng === thay vì ==
}

// Bug 4: Fix
const maxIndex = Number('5'); // Explicit conversion
// or: const maxIndex = 5; // Best: use correct type from start
```

### Bài tập 6: Implement Type Checkers

```javascript
// Implement strict type checkers

function strictAdd(a, b) {
    // TODO: Chỉ accept numbers, throw error nếu không phải
    // Validate cả NaN
}

function strictConcat(a, b) {
    // TODO: Chỉ accept strings, throw error nếu không phải
}

function strictMultiply(a, b) {
    // TODO: Accept numbers hoặc numeric strings ('123')
    // Throw error nếu không convert được thành number
}

// Test cases
try {
    console.log(strictAdd(5, 3));         // 8 ✓
    console.log(strictAdd('5', 3));       // Error ✓
    console.log(strictConcat('a', 'b'));  // 'ab' ✓
    console.log(strictConcat('a', 5));    // Error ✓
    console.log(strictMultiply(5, '3'));  // 15 ✓
    console.log(strictMultiply(5, 'abc')); // Error ✓
} catch (e) {
    console.error(e.message);
}
```

**Đáp án**:
```javascript
function strictAdd(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number' || isNaN(a) || isNaN(b)) {
        throw new TypeError('Both arguments must be valid numbers');
    }
    return a + b;
}

function strictConcat(a, b) {
    if (typeof a !== 'string' || typeof b !== 'string') {
        throw new TypeError('Both arguments must be strings');
    }
    return a + b;
}

function strictMultiply(a, b) {
    const numA = Number(a);
    const numB = Number(b);
    
    if (isNaN(numA) || isNaN(numB)) {
        throw new TypeError('Arguments must be numbers or numeric strings');
    }
    
    return numA * numB;
}
```

### Bài tập 7: Practical Exercise - Form Validation

```javascript
// Validate user input từ form (tất cả đều là strings)

function validateAge(ageInput) {
    // TODO:
    // 1. Convert thành number
    // 2. Kiểm tra là số hợp lệ (không phải NaN)
    // 3. Kiểm tra >= 0 và <= 150
    // Return: { valid: boolean, value: number, error: string }
}

function validateEmail(emailInput) {
    // TODO:
    // 1. Trim whitespace
    // 2. Convert thành lowercase
    // 3. Kiểm tra có '@' không
    // Return: { valid: boolean, value: string, error: string }
}

function validatePhoneNumber(phoneInput) {
    // TODO:
    // 1. Remove tất cả non-digit characters
    // 2. Kiểm tra có đúng 10 digits không
    // Return: { valid: boolean, value: string, error: string }
}

function validateCheckbox(checkboxValue) {
    // TODO:
    // Input có thể là: true, false, 'true', 'false', '1', '0', 1, 0
    // Convert tất cả thành boolean
    // Return: boolean
}

// Test cases
console.log(validateAge('25'));           // { valid: true, value: 25, error: '' }
console.log(validateAge('abc'));          // { valid: false, value: NaN, error: '...' }
console.log(validateAge('200'));          // { valid: false, value: 200, error: '...' }

console.log(validateEmail('  TEST@EXAMPLE.COM  ')); // { valid: true, value: 'test@example.com', error: '' }
console.log(validateEmail('invalid'));    // { valid: false, ... }

console.log(validatePhoneNumber('(123) 456-7890')); // { valid: true, value: '1234567890', error: '' }
console.log(validatePhoneNumber('123'));  // { valid: false, ... }

console.log(validateCheckbox('true'));    // true
console.log(validateCheckbox('1'));       // true
console.log(validateCheckbox(0));         // false
```

**Đáp án**:
```javascript
function validateAge(ageInput) {
    const age = Number(ageInput);
    
    if (isNaN(age)) {
        return { valid: false, value: NaN, error: 'Age must be a number' };
    }
    
    if (age < 0 || age > 150) {
        return { valid: false, value: age, error: 'Age must be between 0 and 150' };
    }
    
    return { valid: true, value: age, error: '' };
}

function validateEmail(emailInput) {
    const email = emailInput.trim().toLowerCase();
    
    if (!email.includes('@')) {
        return { valid: false, value: email, error: 'Email must contain @' };
    }
    
    return { valid: true, value: email, error: '' };
}

function validatePhoneNumber(phoneInput) {
    const digits = phoneInput.replace(/\D/g, ''); // Remove non-digits
    
    if (digits.length !== 10) {
        return { valid: false, value: digits, error: 'Phone number must have 10 digits' };
    }
    
    return { valid: true, value: digits, error: '' };
}

function validateCheckbox(checkboxValue) {
    // Handle different truthy representations
    if (checkboxValue === 'true' || checkboxValue === '1' || checkboxValue === 1 || checkboxValue === true) {
        return true;
    }
    return false;
}
```

---

## 📝 Tóm tắt

Trong bài này bạn đã học:
- ✅ Type Conversion (tường minh): `String()`, `Number()`, `Boolean()`
- ✅ Type Coercion (ngầm định): tự động convert trong operators
- ✅ `parseInt()` vs `Number()` vs unary `+`
- ✅ Truthy và Falsy values
- ✅ == vs === (luôn dùng ===!)
- ✅ Common pitfalls: addition vs concatenation, empty string, null vs undefined
- ✅ Best practices: explicit conversion, avoid ==, use ??

---

## 🎯 Kiến thức cần nắm vững

Trước khi chuyển sang Module tiếp theo:
- [ ] Phân biệt Type Conversion và Type Coercion
- [ ] Biết cách convert giữa các types
- [ ] Hiểu rõ 6+1 falsy values
- [ ] Hiểu tại sao `'5' + 3` khác `'5' - 3`
- [ ] Luôn dùng === thay vì ==
- [ ] Biết khi nào dùng ??, ||, và &&

---

**🎉 Hoàn thành Module 1: JavaScript Fundamentals!**

**Module tiếp theo**: [Module 2 - Control Flow & Functions](../Module_02_Control_Flow/Lesson_06_Conditionals.md)

---

## 🌟 Review Module 1

Bạn đã hoàn thành Module 1! Hãy review lại những gì đã học:

1. **Bài 01**: JavaScript là gì, setup environment, cách chạy code
2. **Bài 02**: Biến (var, let, const), scope, hoisting
3. **Bài 03**: 8 kiểu dữ liệu, primitive vs reference
4. **Bài 04**: Operators (arithmetic, comparison, logical, etc.)
5. **Bài 05**: Type conversion và coercion

**Mini Project để củng cố Module 1**:
```javascript
// TODO: Tạo một calculator với validation
function calculator() {
    // 1. Nhận input từ user (prompt)
    // 2. Validate input (number checking)
    // 3. Choose operation (+, -, *, /, %)
    // 4. Calculate và display result
    // 5. Handle errors (invalid input, division by zero)
}

calculator();
```

Hãy hoàn thành mini project này trước khi chuyển sang Module 2! 🚀

