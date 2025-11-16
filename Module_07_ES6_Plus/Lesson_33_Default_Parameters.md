# Bài 33: Default Parameters

## 📖 Lý thuyết

ES6 cho phép set default values cho function parameters.

---

## 💡 Basic Usage

```javascript
// Old way
function greet(name) {
    name = name || 'Guest';
    return `Hello, ${name}!`;
}

// New way
function greet(name = 'Guest') {
    return `Hello, ${name}!`;
}

greet();        // Hello, Guest!
greet('John');  // Hello, John!
```

---

## 💡 Multiple Defaults

```javascript
function createUser(name = 'Anonymous', age = 18, role = 'user') {
    return { name, age, role };
}

createUser();                              // All defaults
createUser('John');                        // name='John', others default
createUser('John', 30);                    // name='John', age=30, role='user'
createUser('John', 30, 'admin');           // All specified
```

---

## 💡 Expression Defaults

```javascript
function getDefaultName() {
    return 'Guest';
}

function greet(name = getDefaultName()) {
    return `Hello, ${name}!`;
}

// Default từ other parameters
function createPerson(firstName, lastName, fullName = `${firstName} ${lastName}`) {
    return { firstName, lastName, fullName };
}
```

---

**Bài tiếp theo**: [Bài 34 - Optional Chaining](./Lesson_34_Optional_Chaining.md)

