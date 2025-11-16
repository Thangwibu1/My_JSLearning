# Bài 37: Constructor Functions

## 📖 Lý thuyết

Constructor functions là cách cũ (pre-ES6) để tạo objects và implement OOP trong JavaScript.

---

## 💡 Basic Constructor

```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}

const john = new Person('John', 30);
console.log(john.name); // 'John'
```

---

## 💡 Prototype Methods

```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// Add method to prototype
Person.prototype.greet = function() {
    console.log(`Hi, I'm ${this.name}`);
};

const john = new Person('John', 30);
john.greet(); // Hi, I'm John
```

---

## 💡 Prototype Inheritance

```javascript
function Animal(name) {
    this.name = name;
}

Animal.prototype.eat = function() {
    console.log(`${this.name} is eating`);
};

function Dog(name, breed) {
    Animal.call(this, name); // Call parent constructor
    this.breed = breed;
}

// Inherit from Animal
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
    console.log('Woof!');
};

const dog = new Dog('Max', 'Labrador');
dog.eat();  // From Animal
dog.bark(); // From Dog
```

---

**Note**: Modern way là dùng ES6 Classes (đã học ở Bài 38)!

---

**Bài tiếp theo**: [Bài 38 - ES6 Classes](./Lesson_38_Classes.md) (✅ Đã hoàn thành)

