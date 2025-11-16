# Bài 07: Vòng lặp (Loops)

## 📖 Lý thuyết

**Vòng lặp** (Loops) cho phép thực thi một đoạn code nhiều lần.

JavaScript có các loại loops:
1. **for loop** - Lặp với số lần xác định
2. **while loop** - Lặp khi điều kiện đúng
3. **do...while loop** - Lặp ít nhất 1 lần
4. **for...in loop** - Lặp qua object properties
5. **for...of loop** - Lặp qua iterable values (ES6)

---

## 💡 Các loại Loops

### 1. for Loop

**Syntax**:
```javascript
for (initialization; condition; increment) {
    // Code lặp lại
}
```

**Ví dụ**:
```javascript
// In số từ 1 đến 5
for (let i = 1; i <= 5; i++) {
    console.log(i);
}

// Array iteration
const fruits = ['apple', 'banana', 'orange'];
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

// Nested loops
for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
        console.log(`i=${i}, j=${j}`);
    }
}

// Loop backwards
for (let i = 5; i >= 1; i--) {
    console.log(i);
}
```

### 2. while Loop

**Syntax**:
```javascript
while (condition) {
    // Code lặp lại
}
```

**Ví dụ**:
```javascript
let count = 1;
while (count <= 5) {
    console.log(count);
    count++;
}

// User input simulation
let password = '';
while (password !== 'secret') {
    password = prompt('Enter password:');
}
console.log('Access granted!');
```

### 3. do...while Loop

**Syntax**:
```javascript
do {
    // Code lặp lại (chạy ít nhất 1 lần)
} while (condition);
```

**Ví dụ**:
```javascript
let i = 1;
do {
    console.log(i);
    i++;
} while (i <= 5);

// Chạy ít nhất 1 lần dù condition false
let x = 10;
do {
    console.log(x); // Vẫn chạy 1 lần
} while (x < 5);
```

### 4. for...in Loop (Object iteration)

**Syntax**:
```javascript
for (let key in object) {
    // Code
}
```

**Ví dụ**:
```javascript
const person = {
    name: 'John',
    age: 30,
    city: 'Ha Noi'
};

for (let key in person) {
    console.log(`${key}: ${person[key]}`);
}
// Output:
// name: John
// age: 30
// city: Ha Noi
```

### 5. for...of Loop (Iterable iteration - ES6)

**Syntax**:
```javascript
for (let value of iterable) {
    // Code
}
```

**Ví dụ**:
```javascript
// Arrays
const fruits = ['apple', 'banana', 'orange'];
for (let fruit of fruits) {
    console.log(fruit);
}

// Strings
const word = 'hello';
for (let char of word) {
    console.log(char);
}

// Sets
const set = new Set([1, 2, 3]);
for (let num of set) {
    console.log(num);
}
```

### break và continue

```javascript
// break - Thoát khỏi loop
for (let i = 1; i <= 10; i++) {
    if (i === 5) {
        break; // Dừng loop
    }
    console.log(i); // 1, 2, 3, 4
}

// continue - Bỏ qua iteration hiện tại
for (let i = 1; i <= 5; i++) {
    if (i === 3) {
        continue; // Bỏ qua 3
    }
    console.log(i); // 1, 2, 4, 5
}
```

---

## ✏️ Bài tập

### Bài tập 1: Sum of Numbers

```javascript
// TODO: Tính tổng từ 1 đến n
function sumToN(n) {
    let sum = 0;
    // Your code here
    return sum;
}

console.log(sumToN(5));   // 15 (1+2+3+4+5)
console.log(sumToN(10));  // 55
```

**Đáp án**:
```javascript
function sumToN(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}
```

### Bài tập 2: Factorial

```javascript
// TODO: Tính n! (factorial)
function factorial(n) {
    // 5! = 5 * 4 * 3 * 2 * 1 = 120
}

console.log(factorial(5));  // 120
console.log(factorial(0));  // 1
```

### Bài tập 3: FizzBuzz

```javascript
// TODO: In số từ 1-100
// - Nếu chia hết cho 3: in 'Fizz'
// - Nếu chia hết cho 5: in 'Buzz'
// - Nếu chia hết cho cả 3 và 5: in 'FizzBuzz'
// - Còn lại: in số

function fizzBuzz(n) {
    for (let i = 1; i <= n; i++) {
        // Your code here
    }
}

fizzBuzz(15);
// Output: 1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz
```

**Đáp án trong file**: Các bài tập còn lại với đáp án chi tiết...

---

**Bài tiếp theo**: [Bài 08 - Functions cơ bản](./Lesson_08_Functions_Basics.md)

