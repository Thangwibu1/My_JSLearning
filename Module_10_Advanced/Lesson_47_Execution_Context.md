# Bài 47: Execution Context & Call Stack

## 📖 Lý thuyết

**Execution Context** là environment nơi JavaScript code được execute.

---

## 💡 Types of Execution Context

### 1. Global Execution Context

```javascript
// Global code
var globalVar = 'Global';

// Global EC được tạo khi script chạy
```

### 2. Function Execution Context

```javascript
function myFunction() {
    var localVar = 'Local';
    // Function EC được tạo khi function được gọi
}

myFunction();
```

---

## 💡 Execution Context Phases

### 1. Creation Phase
- Create scope chain
- Create variable object (variables, functions, arguments)
- Determine `this` value

### 2. Execution Phase
- Assign values
- Execute code line by line

---

## 💡 Call Stack

```javascript
function first() {
    console.log('First');
    second();
    console.log('First again');
}

function second() {
    console.log('Second');
    third();
}

function third() {
    console.log('Third');
}

first();

// Call Stack:
// 1. Global EC
// 2. first() pushed
// 3. second() pushed
// 4. third() pushed
// 5. third() popped
// 6. second() popped
// 7. first() popped
```

---

**Bài tiếp theo**: [Bài 48 - Event Loop](./Lesson_48_Event_Loop.md) (✅ Đã hoàn thành)

