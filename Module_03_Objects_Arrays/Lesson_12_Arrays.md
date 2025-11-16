# Bài 12: Arrays và Methods Cơ bản

## 📖 Lý thuyết

**Array** là danh sách có thứ tự các elements. Array trong JavaScript có thể chứa bất kỳ kiểu dữ liệu nào.

```javascript
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, 'hello', true, null, { name: 'John' }, [1, 2]];
```

---

## 💡 Creating Arrays

```javascript
// Array literal
const arr1 = [1, 2, 3];

// Array constructor
const arr2 = new Array(1, 2, 3);
const arr3 = new Array(5); // Empty array với length 5

// Array.of() - ES6
const arr4 = Array.of(1, 2, 3);

// Array.from() - ES6
const arr5 = Array.from('hello'); // ['h', 'e', 'l', 'l', 'o']
const arr6 = Array.from({ length: 3 }, (_, i) => i); // [0, 1, 2]
```

---

## 💡 Accessing Elements

```javascript
const fruits = ['apple', 'banana', 'orange'];

// Index (0-based)
console.log(fruits[0]); // 'apple'
console.log(fruits[2]); // 'orange'

// Negative index không work (không như Python)
console.log(fruits[-1]); // undefined

// Get last element
console.log(fruits[fruits.length - 1]); // 'orange'

// at() method (ES2022) - Support negative index
console.log(fruits.at(0));   // 'apple'
console.log(fruits.at(-1));  // 'orange'
console.log(fruits.at(-2));  // 'banana'
```

---

## 💡 Array Properties

```javascript
const arr = [1, 2, 3, 4, 5];

// length
console.log(arr.length); // 5

// Modify length
arr.length = 3;
console.log(arr); // [1, 2, 3]

arr.length = 5;
console.log(arr); // [1, 2, 3, empty × 2]
```

---

## 💡 Adding/Removing Elements

### push() - Thêm cuối

```javascript
const arr = [1, 2, 3];
arr.push(4);
console.log(arr); // [1, 2, 3, 4]

// Return new length
const newLength = arr.push(5, 6);
console.log(newLength); // 6
console.log(arr); // [1, 2, 3, 4, 5, 6]
```

### pop() - Xóa cuối

```javascript
const arr = [1, 2, 3];
const last = arr.pop();
console.log(last); // 3
console.log(arr);  // [1, 2]
```

### unshift() - Thêm đầu

```javascript
const arr = [2, 3, 4];
arr.unshift(1);
console.log(arr); // [1, 2, 3, 4]

arr.unshift(-1, 0);
console.log(arr); // [-1, 0, 1, 2, 3, 4]
```

### shift() - Xóa đầu

```javascript
const arr = [1, 2, 3];
const first = arr.shift();
console.log(first); // 1
console.log(arr);   // [2, 3]
```

### Summary

```javascript
const arr = [1, 2, 3, 4, 5];

// Stack operations (LIFO - Last In First Out)
arr.push(6);    // [1, 2, 3, 4, 5, 6]
arr.pop();      // [1, 2, 3, 4, 5]

// Queue operations (FIFO - First In First Out)
arr.push(6);    // [1, 2, 3, 4, 5, 6]
arr.shift();    // [2, 3, 4, 5, 6]

// ⚠️ shift() và unshift() slower than push() và pop()
```

---

## 💡 splice() - Swiss Army Knife

```javascript
// splice(start, deleteCount, item1, item2, ...)
const arr = [1, 2, 3, 4, 5];

// Remove elements
arr.splice(1, 2); // Remove 2 elements từ index 1
console.log(arr); // [1, 4, 5]

// Insert elements
arr.splice(1, 0, 'a', 'b');
console.log(arr); // [1, 'a', 'b', 4, 5]

// Replace elements
arr.splice(1, 2, 2, 3);
console.log(arr); // [1, 2, 3, 4, 5]

// Return removed elements
const removed = arr.splice(2, 2);
console.log(removed); // [3, 4]
console.log(arr);     // [1, 2, 5]
```

---

## 💡 slice() - Extract Sub-array

```javascript
const arr = [1, 2, 3, 4, 5];

// slice(start, end) - end not included
const sliced = arr.slice(1, 3);
console.log(sliced); // [2, 3]
console.log(arr);    // [1, 2, 3, 4, 5] (không thay đổi)

// Negative indices
console.log(arr.slice(-2));    // [4, 5]
console.log(arr.slice(1, -1)); // [2, 3, 4]

// Copy array
const copy = arr.slice();
console.log(copy); // [1, 2, 3, 4, 5]
```

---

## 💡 concat() - Merge Arrays

```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5, 6];

const merged = arr1.concat(arr2, arr3);
console.log(merged); // [1, 2, 3, 4, 5, 6]

// Spread operator (modern)
const merged2 = [...arr1, ...arr2, ...arr3];
console.log(merged2); // [1, 2, 3, 4, 5, 6]
```

---

## 💡 Searching Elements

### indexOf() và lastIndexOf()

```javascript
const arr = [1, 2, 3, 2, 1];

console.log(arr.indexOf(2));     // 1 (first occurrence)
console.log(arr.lastIndexOf(2)); // 3 (last occurrence)
console.log(arr.indexOf(5));     // -1 (không tìm thấy)

// Start position
console.log(arr.indexOf(2, 2));  // 3 (search từ index 2)
```

### includes() - ES2016

```javascript
const arr = [1, 2, 3, 4, 5];

console.log(arr.includes(3));  // true
console.log(arr.includes(10)); // false

// Start position
console.log(arr.includes(2, 2)); // false (search từ index 2)

// Với NaN
const arr2 = [1, NaN, 3];
console.log(arr2.indexOf(NaN));   // -1 (indexOf không tìm được NaN)
console.log(arr2.includes(NaN));  // true (includes tìm được NaN)
```

---

## 💡 join() và split()

```javascript
// join() - Array to String
const arr = ['Hello', 'World', 'JavaScript'];
const str = arr.join(' ');
console.log(str); // 'Hello World JavaScript'

const csv = arr.join(',');
console.log(csv); // 'Hello,World,JavaScript'

// split() - String to Array
const text = 'apple,banana,orange';
const fruits = text.split(',');
console.log(fruits); // ['apple', 'banana', 'orange']

const chars = 'hello'.split('');
console.log(chars); // ['h', 'e', 'l', 'l', 'o']
```

---

## 💡 reverse() và sort()

### reverse()

```javascript
const arr = [1, 2, 3, 4, 5];
arr.reverse();
console.log(arr); // [5, 4, 3, 2, 1]

// ⚠️ Mutates original array!
```

### sort()

```javascript
// Sort strings
const fruits = ['banana', 'apple', 'orange'];
fruits.sort();
console.log(fruits); // ['apple', 'banana', 'orange']

// ⚠️ Sort numbers - WRONG way
const numbers = [10, 5, 40, 25, 1000];
numbers.sort();
console.log(numbers); // [10, 1000, 25, 40, 5] (Wrong!)
// Vì sort() convert thành strings: '10', '1000', '25'...

// ✅ Sort numbers - RIGHT way
numbers.sort((a, b) => a - b); // Ascending
console.log(numbers); // [5, 10, 25, 40, 1000]

numbers.sort((a, b) => b - a); // Descending
console.log(numbers); // [1000, 40, 25, 10, 5]

// Sort objects
const users = [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 },
    { name: 'Bob', age: 35 }
];

users.sort((a, b) => a.age - b.age); // Sort by age
console.log(users);
// [{ name: 'Jane', age: 25 }, { name: 'John', age: 30 }, { name: 'Bob', age: 35 }]

users.sort((a, b) => a.name.localeCompare(b.name)); // Sort by name
```

---

## 💡 Iterating Arrays

```javascript
const arr = ['a', 'b', 'c'];

// for loop
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}

// for...of (modern)
for (const item of arr) {
    console.log(item);
}

// for...of with index
for (const [index, item] of arr.entries()) {
    console.log(index, item);
}

// forEach()
arr.forEach((item, index) => {
    console.log(index, item);
});
```

---

## ✏️ Bài tập

### Bài tập 1: Array Manipulation

```javascript
// TODO: Implement các functions

// 1. Remove duplicates
function removeDuplicates(arr) {
    // [1, 2, 2, 3, 3, 3] → [1, 2, 3]
}

// 2. Flatten array (1 level)
function flatten(arr) {
    // [[1, 2], [3, 4], [5]] → [1, 2, 3, 4, 5]
}

// 3. Chunk array
function chunk(arr, size) {
    // [1, 2, 3, 4, 5], 2 → [[1, 2], [3, 4], [5]]
}

// 4. Rotate array
function rotate(arr, n) {
    // [1, 2, 3, 4, 5], 2 → [4, 5, 1, 2, 3]
}
```

**Đáp án**:
```javascript
function removeDuplicates(arr) {
    return [...new Set(arr)];
    // hoặc: return arr.filter((item, index) => arr.indexOf(item) === index);
}

function flatten(arr) {
    return arr.flat();
    // hoặc: return [].concat(...arr);
}

function chunk(arr, size) {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}

function rotate(arr, n) {
    n = n % arr.length;
    return [...arr.slice(-n), ...arr.slice(0, -n)];
}
```

### Bài tập 2: Array Statistics

```javascript
const numbers = [5, 2, 8, 1, 9, 3, 7, 4, 6];

// TODO: Calculate
// 1. Min, max
// 2. Average
// 3. Median
// 4. Range
```

### Bài tập 3: Practical - Todo List

```javascript
const todos = [];

function addTodo(text) {
    // Add todo with id, text, completed: false
}

function removeTodo(id) {
    // Remove by id
}

function toggleTodo(id) {
    // Toggle completed status
}

function getActiveTodos() {
    // Return todos chưa completed
}

function getCompletedTodos() {
    // Return todos đã completed
}
```

---

## 📝 Tóm tắt

- ✅ Array creation và accessing
- ✅ push, pop, shift, unshift
- ✅ splice, slice, concat
- ✅ indexOf, includes, join, split
- ✅ reverse, sort
- ✅ Iterating arrays

---

**Bài tiếp theo**: [Bài 13 - Array Methods nâng cao](./Lesson_13_Array_Methods.md)

