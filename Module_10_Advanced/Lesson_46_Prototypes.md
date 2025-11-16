# Bài 46: Prototypes & Prototype Chain

## 📖 Lý thuyết

Mọi object trong JavaScript đều có **prototype** - một object khác mà nó inherit properties và methods từ đó.

---

## 💡 Prototype Basics

```javascript
const obj = {};
console.log(obj.__proto__);  // Object.prototype

const arr = [];
console.log(arr.__proto__);  // Array.prototype

// Check prototype
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true
```

---

## 💡 Prototype Chain

```javascript
const arr = [1, 2, 3];

// arr.__proto__ → Array.prototype
// Array.prototype.__proto__ → Object.prototype
// Object.prototype.__proto__ → null

arr.toString(); // From Array.prototype
arr.hasOwnProperty('length'); // From Object.prototype
```

---

## 💡 Adding to Prototype

```javascript
// ⚠️ Generally not recommended
Array.prototype.last = function() {
    return this[this.length - 1];
};

const arr = [1, 2, 3];
console.log(arr.last()); // 3
```

---

## 💡 Constructor Prototype

```javascript
function Person(name) {
    this.name = name;
}

Person.prototype.greet = function() {
    console.log(`Hi, I'm ${this.name}`);
};

const john = new Person('John');
john.greet(); // Hi, I'm John

console.log(john.__proto__ === Person.prototype); // true
```

---

**Bài tiếp theo**: [Bài 47 - Execution Context](./Lesson_47_Execution_Context.md)

