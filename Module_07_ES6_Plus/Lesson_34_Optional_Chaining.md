# Bài 34: Optional Chaining & Nullish Coalescing

## 📖 Lý thuyết

Optional Chaining (`?.`) và Nullish Coalescing (`??`) giúp handle null/undefined values dễ dàng hơn.

---

## 💡 Optional Chaining (?.)

```javascript
const user = {
    name: 'John',
    address: {
        city: 'Ha Noi'
    }
};

// Old way
const city = user && user.address && user.address.city;

// New way
const city2 = user?.address?.city;

// Với undefined/null
const noUser = null;
const noCity = noUser?.address?.city; // undefined (no error!)

// Array access
const users = [{name: 'John'}];
console.log(users?.[0]?.name);  // 'John'
console.log(users?.[1]?.name);  // undefined

// Function calls
const obj = { method: () => 'Hello' };
console.log(obj.method?.());      // 'Hello'
console.log(obj.missing?.());     // undefined
```

---

## 💡 Nullish Coalescing (??)

```javascript
// || problem
const count = 0;
const value1 = count || 10;  // 10 (0 is falsy!)

// ?? solution
const value2 = count ?? 10;  // 0 (only null/undefined trigger default)

// Examples
const a = null ?? 'default';      // 'default'
const b = undefined ?? 'default'; // 'default'
const c = 0 ?? 'default';         // 0
const d = '' ?? 'default';        // ''
const e = false ?? 'default';     // false
```

---

## 💡 Combining Both

```javascript
const user = {
    settings: {
        theme: null
    }
};

const theme = user?.settings?.theme ?? 'light';
console.log(theme); // 'light'
```

---

**Bài tiếp theo**: [Bài 35 - ES6 Modules](./Lesson_35_Modules.md)

