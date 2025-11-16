# Bài 24: IIFE (Immediately Invoked Function Expression)

## 📖 Lý thuyết

**IIFE** là function được execute ngay sau khi được định nghĩa.

```javascript
// IIFE syntax
(function() {
    console.log('I run immediately!');
})();

// Arrow IIFE
(() => {
    console.log('Arrow IIFE');
})();
```

---

## 💡 Why Use IIFE?

### 1. Avoid Global Pollution

```javascript
// ❌ BAD - Global variables
var counter = 0;
function increment() {
    counter++;
}

// ✅ GOOD - IIFE với private variables
const counterModule = (function() {
    let counter = 0; // Private
    
    return {
        increment() {
            counter++;
        },
        getCount() {
            return counter;
        }
    };
})();

counterModule.increment();
console.log(counterModule.getCount()); // 1
```

### 2. Module Pattern

```javascript
const myModule = (function() {
    // Private
    const privateVar = 'I am private';
    
    function privateFunction() {
        console.log(privateVar);
    }
    
    // Public API
    return {
        publicMethod() {
            privateFunction();
        },
        publicVar: 'I am public'
    };
})();

myModule.publicMethod();
// myModule.privateFunction(); // ❌ Error
```

---

## 💡 Modern Alternative

```javascript
// ES6 Modules (modern way)
// module.js
const privateVar = 'Private';
export function publicMethod() {
    console.log(privateVar);
}

// Block scope với let/const
{
    let privateVar = 'Private';
    // Use privateVar...
}
```

---

**Bài tiếp theo**: [Bài 25 - this Keyword](./Lesson_25_This_Keyword.md)

