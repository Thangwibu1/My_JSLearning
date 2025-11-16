# Bài 20: Event Delegation

## 📖 Lý thuyết

**Event Delegation** là pattern sử dụng event bubbling để handle events hiệu quả hơn bằng cách attach một listener trên parent element thay vì nhiều listeners trên children.

---

## 💡 Why Event Delegation?

```javascript
// ❌ BAD - nhiều listeners
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
    btn.addEventListener('click', handleClick);
});
// Problem: Dynamic elements không có listener

// ✅ GOOD - Event Delegation
document.querySelector('.container').addEventListener('click', (e) => {
    if (e.target.classList.contains('btn')) {
        handleClick(e);
    }
});
// Dynamic elements tự động work!
```

---

## 💡 Benefits

1. **Ít memory** - 1 listener thay vì nhiều
2. **Dynamic elements** - Tự động work với elements mới
3. **Simpler code** - Easier to manage

---

## 💡 Implementation

```javascript
// Event delegation pattern
document.querySelector('#todoList').addEventListener('click', (e) => {
    // Delete button
    if (e.target.classList.contains('delete-btn')) {
        e.target.closest('li').remove();
    }
    
    // Toggle button
    if (e.target.classList.contains('toggle-btn')) {
        e.target.closest('li').classList.toggle('completed');
    }
    
    // Edit button
    if (e.target.classList.contains('edit-btn')) {
        const li = e.target.closest('li');
        const text = li.querySelector('.text');
        // Edit logic...
    }
});
```

---

## 💡 matches() Method

```javascript
container.addEventListener('click', (e) => {
    // More flexible matching
    if (e.target.matches('.btn, button')) {
        // Handle button clicks
    }
    
    if (e.target.matches('[data-action="delete"]')) {
        // Handle delete action
    }
});
```

---

## 💡 closest() Method

```javascript
// Find closest ancestor matching selector
list.addEventListener('click', (e) => {
    const listItem = e.target.closest('li');
    if (listItem) {
        console.log('Clicked item:', listItem);
    }
});
```

---

## ✏️ Bài tập: Complete Todo App

```javascript
// TODO: Implement full todo app với event delegation
// Features:
// - Add todo
// - Delete todo
// - Toggle complete
// - Edit todo
// - Filter (all/active/completed)
```

---

**🎉 HOÀN THÀNH MODULE 4!**

**Module tiếp theo**: [Module 5 - Advanced Functions](../Module_05_Advanced_Functions/Lesson_21_Closures.md)

