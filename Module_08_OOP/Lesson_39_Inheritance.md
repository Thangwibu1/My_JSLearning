# Bài 39: Inheritance

## 📖 Lý thuyết

**Inheritance** cho phép class kế thừa properties và methods từ class khác.

---

## 💡 extends Keyword

```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }
    
    eat() {
        console.log(`${this.name} is eating`);
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name); // Call parent constructor
        this.breed = breed;
    }
    
    bark() {
        console.log('Woof!');
    }
}

const dog = new Dog('Max', 'Labrador');
dog.eat();  // From Animal
dog.bark(); // From Dog
```

---

## 💡 super Keyword

```javascript
class Person {
    constructor(name) {
        this.name = name;
    }
    
    greet() {
        return `Hello, I'm ${this.name}`;
    }
}

class Student extends Person {
    constructor(name, grade) {
        super(name); // Must call super first!
        this.grade = grade;
    }
    
    greet() {
        // Call parent method
        const parentGreeting = super.greet();
        return `${parentGreeting} and I'm in grade ${this.grade}`;
    }
}

const student = new Student('John', 10);
console.log(student.greet());
// Hello, I'm John and I'm in grade 10
```

---

## 💡 Method Overriding

```javascript
class Shape {
    area() {
        return 0;
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    
    // Override parent method
    area() {
        return Math.PI * this.radius ** 2;
    }
}

const circle = new Circle(5);
console.log(circle.area()); // 78.53...
```

---

## 💡 instanceof

```javascript
class Animal {}
class Dog extends Animal {}

const dog = new Dog();

console.log(dog instanceof Dog);     // true
console.log(dog instanceof Animal);  // true
console.log(dog instanceof Object);  // true
```

---

**Bài tiếp theo**: [Bài 40 - Encapsulation](./Lesson_40_Encapsulation.md)

