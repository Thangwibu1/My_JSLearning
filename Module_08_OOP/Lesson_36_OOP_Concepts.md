# Bài 36: OOP Concepts

## 📖 Lý thuyết

**OOP (Object-Oriented Programming)** là programming paradigm dựa trên concept của "objects".

---

## 💡 4 Pillars of OOP

### 1. Encapsulation
Bundling data và methods trong objects, hiding internal details.

```javascript
class BankAccount {
    #balance = 0; // Private
    
    deposit(amount) {
        this.#balance += amount;
    }
    
    getBalance() {
        return this.#balance;
    }
}
```

### 2. Abstraction
Hiding complex implementation, showing only necessary features.

```javascript
class Car {
    start() {
        this.#checkFuel();
        this.#igniteEngine();
        // User doesn't need to know details
    }
    
    #checkFuel() { /* ... */ }
    #igniteEngine() { /* ... */ }
}
```

### 3. Inheritance
Creating new classes from existing ones.

```javascript
class Animal {
    eat() {
        console.log('Eating...');
    }
}

class Dog extends Animal {
    bark() {
        console.log('Woof!');
    }
}

const dog = new Dog();
dog.eat();  // From Animal
dog.bark(); // From Dog
```

### 4. Polymorphism
Different classes can implement same methods differently.

```javascript
class Shape {
    area() {
        throw new Error('Must implement area()');
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    
    area() {
        return Math.PI * this.radius ** 2;
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }
    
    area() {
        return this.width * this.height;
    }
}
```

---

**Bài tiếp theo**: [Bài 37 - Constructor Functions](./Lesson_37_Constructor_Functions.md)

