## Mục tiêu

* Mỗi `li` có nút "Xóa" và khi bấm sẽ xóa chính `li` đó.

* Hoạt động với cả 4 `li` có sẵn và các mục mới thêm.

## Hiện trạng

* `script.js` hiện thêm nút "Xóa" cho mục mới với handler đóng kín (closure) xóa `li` tương ứng.

* Các `li` sẵn có chưa có nút "Xóa", nên không thể xóa.

## Cách triển khai

1. Thêm nút "Xóa" cho mọi `li` sẵn có khi trang tải:

   * Duyệt `#todoList li`; nếu thiếu `.delete-btn` thì append `<button class="delete-btn">Xóa</button>`.
2. Chuyển sang event delegation trên `#todoList` để xử lý xóa tập trung:

   * Lắng nghe `click` trên `#todoList`.

   * Nếu `event.target.closest('.delete-btn')` tồn tại, lấy `li` gần nhất bằng `closest('li')` và `li.remove()`.
3. Khi tạo `li` mới từ input, vẫn append nút `<button class="delete-btn">Xóa</button>` nhưng không gắn handler riêng; để parent xử lý.

## Mã dự kiến (không bình luận)

```js
// Thêm nút cho li sẵn có
document.querySelectorAll('#todoList li').forEach(li => {
  if (!li.querySelector('.delete-btn')) {
    const btn = document.createElement('button');
    btn.textContent = 'Xóa';
    btn.className = 'delete-btn';
    btn.style.marginLeft = '8px';
    li.appendChild(btn);
  }
});

// Event delegation
todoList.addEventListener('click', e => {
  const btn = e.target.closest('.delete-btn');
  if (!btn) return;
  const li = btn.closest('li');
  if (li) li.remove();
});

// Khi thêm mới
const li = document.createElement('li');
li.textContent = todoText;
const deleteBtn = document.createElement('button');
deleteBtn.textContent = 'Xóa';
deleteBtn.className = 'delete-btn';
deleteBtn.style.marginLeft = '8px';
li.appendChild(deleteBtn);
```

## Giải thích

* Event bubbling: sự kiện `click` nổi lên từ nút lên `ul`. `event.target` là nút được bấm, `closest('li')` tìm đúng phần tử cha `li` chứa nút đó, xóa chính xác `li` tương ứng.

* Với cách cũ dùng closure, mỗi handler được tạo trong phạm vi của `li` cụ thể, nên gọi `removeChild(li)` vào đúng đối tượng.

## Kiểm thử

* Tạo 4 `li` sẵn có, bấm từng nút "Xóa" để kiểm tra xóa đúng.

* Thêm mục mới và thử xóa.

