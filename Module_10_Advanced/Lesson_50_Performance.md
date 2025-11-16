# Bài 50: Performance Optimization

## 📖 Lý thuyết

Performance optimization giúp application chạy nhanh và smooth hơn.

---

## 💡 Debouncing

```javascript
function debounce(func, delay) {
    let timeoutId;
    
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// Usage
const searchInput = document.querySelector('#search');
const debouncedSearch = debounce(search, 300);
searchInput.addEventListener('input', debouncedSearch);
```

---

## 💡 Throttling

```javascript
function throttle(func, limit) {
    let inThrottle;
    
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Usage
window.addEventListener('scroll', throttle(handleScroll, 100));
```

---

## 💡 Lazy Loading

```javascript
// Intersection Observer for lazy loading
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));
```

---

## 💡 Memoization

```javascript
function memoize(fn) {
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            return cache.get(key);
        }
        
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// Usage
const fibonacci = memoize(function(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(40)); // Much faster với memoization!
```

---

## 💡 Performance Measurement

```javascript
// performance.now()
const start = performance.now();
// ... code to measure ...
const end = performance.now();
console.log(`Execution time: ${end - start}ms`);

// performance.mark & measure
performance.mark('start');
// ... code ...
performance.mark('end');
performance.measure('operation', 'start', 'end');

const measures = performance.getEntriesByType('measure');
console.log(measures[0].duration);
```

---

## 💡 Best Practices

1. **Minimize DOM manipulations**
   ```javascript
   // ❌ BAD
   for (let i = 0; i < 1000; i++) {
       list.appendChild(createItem(i));
   }
   
   // ✅ GOOD
   const fragment = document.createDocumentFragment();
   for (let i = 0; i < 1000; i++) {
       fragment.appendChild(createItem(i));
   }
   list.appendChild(fragment);
   ```

2. **Use event delegation**
3. **Debounce/throttle expensive operations**
4. **Lazy load images và components**
5. **Use Web Workers cho heavy computations**
6. **Minimize reflows và repaints**
7. **Use requestAnimationFrame cho animations**

---

**🎉 HOÀN THÀNH MODULE 10 - ADVANCED TOPICS!**

**🎊 HOÀN THÀNH TẤT CẢ 50 BÀI HỌC! 🎊**

---

## 🌟 Congratulations!

Bạn đã hoàn thành toàn bộ khóa học JavaScript từ cơ bản đến nâng cao!

### Bạn đã học:
- ✅ Fundamentals (Biến, Types, Operators)
- ✅ Control Flow & Functions
- ✅ Objects & Arrays mastery
- ✅ DOM Manipulation & Events
- ✅ Advanced Functions (Closures, HOF)
- ✅ Async JavaScript (Promises, Async/Await)
- ✅ ES6+ Features
- ✅ OOP (Classes, Inheritance)
- ✅ Error Handling & Debugging
- ✅ Advanced Topics (Prototypes, Event Loop, Performance)

### Bước tiếp theo:
1. Build Projects để practice
2. Học Framework (React/Vue/Angular)
3. Học Backend (Node.js, Express)
4. Học TypeScript
5. Continuous learning!

**Happy Coding! 🚀**

