# Bài 25: this Keyword

## 📖 Lý thuyết

`this` keyword references object mà function đang được execute trong context của nó.

---

## 💡 this Rules

### 1. Global Context

```javascript
console.log(this); // window (browser) hoặc global (Node.js)

function test() {
    console.log(this); // window (non-strict mode)
}
```

### 2. Object Method

```javascript
const person = {
    name: 'John',
    greet() {
        console.log(this.name); // 'John' (this = person)
    }
};

person.greet();
```

### 3. Constructor Function

```javascript
function Person(name) {
    this.name = name; // this = new object
}

const john = new Person('John');
console.log(john.name); // 'John'
```

### 4. Arrow Functions

```javascript
// Arrow functions KHÔNG có this riêng
const person = {
    name: 'John',
    greet: () => {
        console.log(this.name); // undefined (this = global)
    }
};

// ✅ Use regular function
const person2 = {
    name: 'John',
    greet() {
        console.log(this.name); // 'John'
    }
};
```

---

## 💡 Explicit Binding

### call()

```javascript
function greet(greeting) {
    console.log(`${greeting}, ${this.name}!`);
}

const person = { name: 'John' };
greet.call(person, 'Hello'); // Hello, John!
```

### apply()

```javascript
function greet(greeting, punctuation) {
    console.log(`${greeting}, ${this.name}${punctuation}`);
}

greet.apply(person, ['Hi', '!']); // Hi, John!
```

### bind()

```javascript
const person = {
    name: 'John',
    greet() {
        console.log(`Hello, ${this.name}!`);
    }
};

const greetJohn = person.greet.bind(person);
setTimeout(greetJohn, 1000); // Works!
```

---

## 💡 Common Pitfalls

```javascript
// Problem 1: Lost this
const person = {
    name: 'John',
    greet() {
        console.log(this.name);
    }
};

const greet = person.greet;
greet(); // undefined (this lost!)

// Solution: bind
const boundGreet = person.greet.bind(person);
boundGreet(); // 'John'

// Problem 2: Callbacks
const person2 = {
    name: 'John',
    delayedGreet() {
        setTimeout(function() {
            console.log(this.name); // undefined
        }, 1000);
    }
};

// Solution: Arrow function
const person3 = {
    name: 'John',
    delayedGreet() {
        setTimeout(() => {
            console.log(this.name); // 'John'
        }, 1000);
    }
};
```

---

**🎉 HOÀN THÀNH MODULE 5!**

