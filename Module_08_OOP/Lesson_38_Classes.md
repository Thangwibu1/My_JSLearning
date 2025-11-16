# Bài 38: ES6 Classes

## 📖 Lý thuyết

**Classes** (ES6) là syntax sugar over prototype-based inheritance. Classes make OOP trong JavaScript dễ dàng và rõ ràng hơn.

```javascript
// Constructor function (old way)
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.greet = function() {
    console.log(`Hi, I'm ${this.name}`);
};

// Class syntax (new way)
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        console.log(`Hi, I'm ${this.name}`);
    }
}
```

---

## 💡 Class Basics

### Constructor

```javascript
class User {
    constructor(name, email) {
        // Initialize instance properties
        this.name = name;
        this.email = email;
        this.createdAt = new Date();
    }
}

const user = new User('John', 'john@example.com');
console.log(user.name);      // John
console.log(user.email);     // john@example.com
console.log(user.createdAt); // Current date
```

### Instance Methods

```javascript
class Calculator {
    constructor() {
        this.result = 0;
    }
    
    add(num) {
        this.result += num;
        return this; // Method chaining
    }
    
    subtract(num) {
        this.result -= num;
        return this;
    }
    
    multiply(num) {
        this.result *= num;
        return this;
    }
    
    divide(num) {
        this.result /= num;
        return this;
    }
    
    getResult() {
        return this.result;
    }
    
    clear() {
        this.result = 0;
        return this;
    }
}

const calc = new Calculator();
calc.add(10).multiply(2).subtract(5);
console.log(calc.getResult()); // 15
```

### Getters và Setters

```javascript
class User {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    
    // Getter
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    
    // Setter
    set fullName(value) {
        const parts = value.split(' ');
        this.firstName = parts[0];
        this.lastName = parts[1];
    }
}

const user = new User('John', 'Doe');
console.log(user.fullName); // 'John Doe' (use like property)

user.fullName = 'Jane Smith';
console.log(user.firstName); // 'Jane'
console.log(user.lastName);  // 'Smith'
```

---

## 💡 Static Methods

Static methods thuộc về class, không phải instances.

```javascript
class MathUtils {
    static add(a, b) {
        return a + b;
    }
    
    static multiply(a, b) {
        return a * b;
    }
    
    static PI = 3.14159; // Static field (ES2022)
}

// Call on class, not instance
console.log(MathUtils.add(5, 3));      // 8
console.log(MathUtils.multiply(4, 2)); // 8
console.log(MathUtils.PI);             // 3.14159

// Cannot call on instance
const math = new MathUtils();
// math.add(1, 2); // ❌ TypeError

// Practical example
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    
    static validateEmail(email) {
        return email.includes('@');
    }
    
    static createGuest() {
        return new User('Guest', 'guest@example.com');
    }
}

console.log(User.validateEmail('test@example.com')); // true
const guest = User.createGuest();
console.log(guest.name); // 'Guest'
```

---

## 💡 Class Fields (ES2022)

```javascript
class User {
    // Public fields
    name = 'Default Name';
    email = '';
    
    // Private fields (với #)
    #password = '';
    #loginAttempts = 0;
    
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.#password = password;
    }
    
    // Private method
    #hashPassword(password) {
        return password.split('').reverse().join(''); // Simple hash
    }
    
    // Public method accessing private
    login(password) {
        if (this.#hashPassword(password) === this.#password) {
            this.#loginAttempts = 0;
            return true;
        }
        this.#loginAttempts++;
        return false;
    }
    
    getLoginAttempts() {
        return this.#loginAttempts;
    }
}

const user = new User('John', 'john@example.com', 'drowssap');
console.log(user.name);  // John
// console.log(user.#password); // ❌ SyntaxError: Private field
console.log(user.login('password')); // true
```

---

## 💡 Practical Examples

### 1. Todo Class

```javascript
class Todo {
    static idCounter = 0;
    
    constructor(text) {
        this.id = ++Todo.idCounter;
        this.text = text;
        this.completed = false;
        this.createdAt = new Date();
    }
    
    toggle() {
        this.completed = !this.completed;
    }
    
    edit(newText) {
        this.text = newText;
    }
    
    isCompleted() {
        return this.completed;
    }
}

class TodoList {
    constructor() {
        this.todos = [];
    }
    
    add(text) {
        const todo = new Todo(text);
        this.todos.push(todo);
        return todo;
    }
    
    remove(id) {
        const index = this.todos.findIndex(t => t.id === id);
        if (index > -1) {
            this.todos.splice(index, 1);
            return true;
        }
        return false;
    }
    
    get(id) {
        return this.todos.find(t => t.id === id);
    }
    
    getAll() {
        return this.todos;
    }
    
    getCompleted() {
        return this.todos.filter(t => t.completed);
    }
    
    getActive() {
        return this.todos.filter(t => !t.completed);
    }
    
    clearCompleted() {
        this.todos = this.todos.filter(t => !t.completed);
    }
}

// Usage
const list = new TodoList();
list.add('Learn JavaScript');
list.add('Build app');
list.get(1).toggle();
console.log(list.getCompleted());
```

### 2. Bank Account

```javascript
class BankAccount {
    #balance = 0;
    #transactions = [];
    
    constructor(owner, initialBalance = 0) {
        this.owner = owner;
        this.#balance = initialBalance;
        this.accountNumber = this.#generateAccountNumber();
    }
    
    #generateAccountNumber() {
        return 'ACC' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }
    
    #addTransaction(type, amount) {
        this.#transactions.push({
            type,
            amount,
            date: new Date(),
            balance: this.#balance
        });
    }
    
    deposit(amount) {
        if (amount <= 0) {
            throw new Error('Amount must be positive');
        }
        this.#balance += amount;
        this.#addTransaction('deposit', amount);
        return this.#balance;
    }
    
    withdraw(amount) {
        if (amount <= 0) {
            throw new Error('Amount must be positive');
        }
        if (amount > this.#balance) {
            throw new Error('Insufficient funds');
        }
        this.#balance -= amount;
        this.#addTransaction('withdrawal', amount);
        return this.#balance;
    }
    
    getBalance() {
        return this.#balance;
    }
    
    getTransactions() {
        return [...this.#transactions]; // Return copy
    }
}

const account = new BankAccount('John Doe', 1000);
console.log(account.deposit(500));  // 1500
console.log(account.withdraw(200)); // 1300
console.log(account.getBalance());  // 1300
console.log(account.getTransactions());
```

---

## ✏️ Bài tập

### Bài tập 1: Create Product Class

```javascript
// TODO: Create Product class
class Product {
    // constructor(name, price, quantity)
    // Methods: sell(quantity), restock(quantity), getInfo()
}

const product = new Product('Laptop', 1000, 10);
console.log(product.sell(2));      // Sold 2, 8 remaining
console.log(product.restock(5));   // Restocked 5, 13 total
console.log(product.getInfo());    // Product info
```

**Đáp án**:
```javascript
class Product {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
    
    sell(amount) {
        if (amount > this.quantity) {
            throw new Error('Insufficient stock');
        }
        this.quantity -= amount;
        return `Sold ${amount}, ${this.quantity} remaining`;
    }
    
    restock(amount) {
        this.quantity += amount;
        return `Restocked ${amount}, ${this.quantity} total`;
    }
    
    getInfo() {
        return {
            name: this.name,
            price: this.price,
            quantity: this.quantity
        };
    }
}
```

### Bài tập 2: Shopping Cart Class

```javascript
// TODO: Create ShoppingCart class
// - add(product, quantity)
// - remove(productId)
// - updateQuantity(productId, quantity)
// - getTotal()
// - clear()

// Product structure: { id, name, price }
```

---

## 📝 Tóm tắt

- ✅ Class syntax (constructor, methods)
- ✅ Instance methods và properties
- ✅ Static methods và fields
- ✅ Getters và Setters
- ✅ Private fields (#)
- ✅ Method chaining
- ✅ Practical examples

---

**Bài tiếp theo**: [Bài 39 - Inheritance](./Lesson_39_Inheritance.md)

