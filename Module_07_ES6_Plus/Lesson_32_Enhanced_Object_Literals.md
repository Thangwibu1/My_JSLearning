# Bài 32: Enhanced Object Literals

## 📖 Lý thuyết

ES6 cải tiến object literal syntax với property shorthand, method shorthand, và computed properties.

---

## 💡 Property Shorthand

```javascript
const name = 'John';
const age = 30;

// Old way
const person = {
    name: name,
    age: age
};

// New way
const person2 = {
    name,
    age
};
```

---

## 💡 Method Shorthand

```javascript
// Old way
const obj = {
    greet: function() {
        console.log('Hello');
    }
};

// New way
const obj2 = {
    greet() {
        console.log('Hello');
    }
};
```

---

## 💡 Computed Property Names

```javascript
const propName = 'score';
const prefix = 'user';

const obj = {
    [propName]: 95,
    [`${prefix}Name`]: 'John',
    [`${prefix}Age`]: 30
};

console.log(obj); // { score: 95, userName: 'John', userAge: 30 }
```

---

**Bài tiếp theo**: [Bài 33 - Default Parameters](./Lesson_33_Default_Parameters.md)

