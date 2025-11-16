# Bài 13: Array Methods Nâng cao (map, filter, reduce)

## 📖 Lý thuyết

Array methods nâng cao là **higher-order functions** - functions nhận functions khác làm arguments.

Những methods này:
- Không mutate (không thay đổi) array gốc
- Return array/value mới
- Functional programming style
- Clean và readable code

---

## 💡 Các Array Methods quan trọng

### 1. map() - Transform Elements

**Dùng khi**: Muốn transform mỗi element thành giá trị mới

```javascript
const numbers = [1, 2, 3, 4, 5];

// Nhân đôi mỗi số
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// Extract property từ objects
const users = [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 },
    { name: 'Bob', age: 35 }
];

const names = users.map(user => user.name);
console.log(names); // ['John', 'Jane', 'Bob']

// Transform to new structure
const formatted = users.map(user => ({
    fullName: user.name,
    isAdult: user.age >= 18
}));
```

### 2. filter() - Filter Elements

**Dùng khi**: Muốn lọc elements theo điều kiện

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Chỉ lấy số chẵn
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4, 6, 8, 10]

// Filter users
const users = [
    { name: 'John', age: 30, active: true },
    { name: 'Jane', age: 17, active: true },
    { name: 'Bob', age: 35, active: false }
];

const activeAdults = users.filter(user => 
    user.active && user.age >= 18
);
// [{ name: 'John', age: 30, active: true }]

// Remove duplicates
const numbers2 = [1, 2, 2, 3, 3, 3, 4, 5, 5];
const unique = numbers2.filter((num, index, arr) => 
    arr.indexOf(num) === index
);
console.log(unique); // [1, 2, 3, 4, 5]
```

### 3. reduce() - Reduce to Single Value

**Dùng khi**: Muốn reduce array thành một giá trị duy nhất

```javascript
const numbers = [1, 2, 3, 4, 5];

// Sum
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 15

// Product
const product = numbers.reduce((acc, num) => acc * num, 1);
console.log(product); // 120

// Find max
const max = numbers.reduce((max, num) => 
    num > max ? num : max
, numbers[0]);

// Count occurrences
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const count = fruits.reduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
}, {});
console.log(count);
// { apple: 3, banana: 2, orange: 1 }

// Group by
const users = [
    { name: 'John', role: 'admin' },
    { name: 'Jane', role: 'user' },
    { name: 'Bob', role: 'admin' }
];

const grouped = users.reduce((acc, user) => {
    if (!acc[user.role]) {
        acc[user.role] = [];
    }
    acc[user.role].push(user);
    return acc;
}, {});
// {
//   admin: [{ name: 'John', ... }, { name: 'Bob', ... }],
//   user: [{ name: 'Jane', ... }]
// }
```

### 4. forEach() - Iterate

```javascript
const numbers = [1, 2, 3, 4, 5];

// Không return gì
numbers.forEach(num => {
    console.log(num * 2);
});

// Với index
numbers.forEach((num, index) => {
    console.log(`Index ${index}: ${num}`);
});
```

### 5. find() và findIndex()

```javascript
const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Bob' }
];

// find() - Return element đầu tiên match
const user = users.find(u => u.id === 2);
console.log(user); // { id: 2, name: 'Jane' }

// findIndex() - Return index
const index = users.findIndex(u => u.id === 2);
console.log(index); // 1
```

### 6. some() và every()

```javascript
const numbers = [1, 2, 3, 4, 5];

// some() - Có ít nhất 1 element thỏa điều kiện?
const hasEven = numbers.some(num => num % 2 === 0);
console.log(hasEven); // true

// every() - Tất cả elements thỏa điều kiện?
const allPositive = numbers.every(num => num > 0);
console.log(allPositive); // true

const allEven = numbers.every(num => num % 2 === 0);
console.log(allEven); // false
```

---

## 🔗 Method Chaining

Kết hợp nhiều methods:

```javascript
const users = [
    { name: 'John', age: 30, salary: 3000 },
    { name: 'Jane', age: 25, salary: 2500 },
    { name: 'Bob', age: 35, salary: 4000 },
    { name: 'Alice', age: 28, salary: 3500 }
];

// Get tên của users >= 28 tuổi, sort theo salary
const result = users
    .filter(user => user.age >= 28)
    .sort((a, b) => b.salary - a.salary)
    .map(user => user.name);

console.log(result); // ['Bob', 'Alice', 'John']

// Calculate tổng salary của users > 30 tuổi
const totalSalary = users
    .filter(user => user.age > 30)
    .reduce((sum, user) => sum + user.salary, 0);

console.log(totalSalary); // 7000
```

---

## ✏️ Bài tập

### Bài tập 1: map() Practice

```javascript
const products = [
    { name: 'Laptop', price: 1000 },
    { name: 'Phone', price: 500 },
    { name: 'Tablet', price: 300 }
];

// TODO: Tăng giá mỗi sản phẩm lên 10%
const increased = // Your code

// TODO: Get array of product names
const names = // Your code

// TODO: Format prices (thêm 'đ')
const formatted = // Your code
// Expected: ['1000đ', '500đ', '300đ']
```

### Bài tập 2: filter() Practice

```javascript
const numbers = [1, 5, 10, 15, 20, 25, 30];

// TODO: Lọc số > 10
const greaterThan10 = // Your code

// TODO: Lọc số chia hết cho 5
const divisibleBy5 = // Your code

// TODO: Lọc số trong range 10-25
const inRange = // Your code
```

### Bài tập 3: reduce() Challenge

```javascript
const transactions = [
    { type: 'income', amount: 1000 },
    { type: 'expense', amount: 200 },
    { type: 'income', amount: 500 },
    { type: 'expense', amount: 300 }
];

// TODO: Tính balance (income - expense)
const balance = transactions.reduce((acc, t) => {
    // Your code
}, 0);

// Expected: 1000
```

### Bài tập 4: Complex Operations

```javascript
const students = [
    { name: 'John', scores: [80, 90, 85] },
    { name: 'Jane', scores: [90, 95, 92] },
    { name: 'Bob', scores: [70, 75, 72] }
];

// TODO: Tính average score cho mỗi student
const averages = // Use map và reduce

// TODO: Get students với average >= 80
const topStudents = // Use filter và reduce

// TODO: Tính overall average của tất cả students
const overallAverage = // Use reduce
```

### Bài tập 5: E-commerce Functions

```javascript
const cart = [
    { id: 1, name: 'Laptop', price: 1000, quantity: 1 },
    { id: 2, name: 'Mouse', price: 20, quantity: 2 },
    { id: 3, name: 'Keyboard', price: 50, quantity: 1 }
];

// TODO: Calculate total
function calculateTotal(cart) {
    // Use reduce
}

// TODO: Apply discount (10%)
function applyDiscount(cart, percent) {
    // Use map
}

// TODO: Get items > $30
function getExpensiveItems(cart, threshold) {
    // Use filter
}

// TODO: Get product names
function getProductNames(cart) {
    // Use map
}
```

**Đáp án**:
```javascript
function calculateTotal(cart) {
    return cart.reduce((total, item) => 
        total + (item.price * item.quantity), 0
    );
}

function applyDiscount(cart, percent) {
    return cart.map(item => ({
        ...item,
        price: item.price * (1 - percent / 100)
    }));
}

function getExpensiveItems(cart, threshold) {
    return cart.filter(item => item.price > threshold);
}

function getProductNames(cart) {
    return cart.map(item => item.name);
}
```

---

## 📝 Tóm tắt

- ✅ map() - Transform elements
- ✅ filter() - Filter elements
- ✅ reduce() - Reduce to single value
- ✅ forEach(), find(), findIndex()
- ✅ some(), every()
- ✅ Method chaining
- ✅ Functional programming style

---

**Bài tiếp theo**: [Bài 14 - Destructuring](./Lesson_14_Destructuring.md)

