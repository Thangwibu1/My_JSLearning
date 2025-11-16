# Bài 01: Giới thiệu JavaScript

## 📖 Lý thuyết

### JavaScript là gì?
JavaScript là một ngôn ngữ lập trình **thông dịch** (interpreted), **động** (dynamic), và **yếu kiểu** (weakly-typed) được tạo ra vào năm 1995 bởi Brendan Eich tại Netscape. Ban đầu được thiết kế để làm cho trang web "sống động" hơn, ngày nay JavaScript đã trở thành một trong những ngôn ngữ phổ biến nhất thế giới.

### Đặc điểm chính của JavaScript

1. **High-level**: Bạn không cần quản lý bộ nhớ thủ công
2. **Garbage-collected**: Tự động dọn dẹp bộ nhớ
3. **Interpreted hoặc Just-in-time compiled**: Code được thực thi ngay lập tức
4. **Multi-paradigm**: Hỗ trợ nhiều phong cách lập trình (OOP, Functional, Procedural)
5. **Prototype-based**: Kế thừa dựa trên prototype
6. **First-class functions**: Functions là objects
7. **Dynamic typing**: Kiểu dữ liệu được xác định khi runtime
8. **Single-threaded**: Chỉ có một luồng thực thi chính
9. **Non-blocking event loop**: Xử lý bất đồng bộ hiệu quả

### JavaScript có thể làm gì?

#### 1. Frontend (Trình duyệt)
- Thao tác DOM (Document Object Model)
- Xử lý sự kiện người dùng
- AJAX/Fetch requests
- Animations
- Form validation
- Single Page Applications (SPA)

#### 2. Backend (Server)
- Node.js cho server-side development
- API development (REST, GraphQL)
- Database operations
- File system operations
- Real-time applications (WebSockets)

#### 3. Mobile Development
- React Native
- Ionic
- NativeScript

#### 4. Desktop Applications
- Electron (VS Code, Discord, Slack)
- NW.js

#### 5. IoT & Hardware
- Johnny-Five
- Cylon.js

### JavaScript Engine

JavaScript được thực thi bởi **JavaScript Engine**:
- **V8**: Chrome, Node.js, Edge
- **SpiderMonkey**: Firefox
- **JavaScriptCore**: Safari
- **Chakra**: Internet Explorer/Edge (cũ)

### ECMAScript

ECMAScript là **specification** (đặc tả) mà JavaScript tuân theo. Các phiên bản quan trọng:
- **ES5** (2009): Stable, widely supported
- **ES6/ES2015** (2015): Cải tiến lớn (arrow functions, classes, modules, promises)
- **ES2016 - ES2024**: Cập nhật hàng năm với features mới

### Môi trường thực thi JavaScript

1. **Browser Console**: Chrome DevTools, Firefox Console
2. **Node.js**: Runtime environment cho backend
3. **Online Editors**: CodePen, JSFiddle, CodeSandbox
4. **IDE/Text Editors**: VS Code, WebStorm, Sublime Text

---

## 💡 Ví dụ

### Ví dụ 1: JavaScript trong HTML
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Hello JavaScript</title>
</head>
<body>
    <h1 id="greeting">Xin chào!</h1>
    <button onclick="changeGreeting()">Nhấn vào đây</button>

    <script>
        // JavaScript code
        function changeGreeting() {
            document.getElementById('greeting').textContent = 'Chào mừng đến với JavaScript!';
            console.log('Button đã được nhấn!');
        }
    </script>
</body>
</html>
```

**Giải thích**:
- JavaScript có thể được nhúng trực tiếp trong HTML sử dụng thẻ `<script>`
- `document.getElementById()`: Truy cập element trong DOM
- `.textContent`: Thay đổi nội dung text của element
- `console.log()`: In ra console (công cụ debug quan trọng)

### Ví dụ 2: External JavaScript file
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>External JS</title>
</head>
<body>
    <h1>Kiểm tra Console</h1>
    
    <!-- Nạp file JavaScript từ bên ngoài -->
    <script src="app.js"></script>
</body>
</html>
```

**File app.js**:
```javascript
// app.js
console.log('JavaScript đang chạy!');

// Tính toán
let a = 10;
let b = 20;
let sum = a + b;
console.log('Tổng:', sum);

// Hiển thị thông tin trình duyệt
console.log('User Agent:', navigator.userAgent);
```

**Giải thích**:
- Best practice: Tách JavaScript ra file riêng
- Dễ maintain và tái sử dụng
- File JS thường được đặt cuối `<body>` để trang load nhanh hơn

### Ví dụ 3: JavaScript trong Node.js
```javascript
// hello.js
console.log('Hello from Node.js!');

// Tính toán đơn giản
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log('Tổng của mảng:', sum);

// Làm việc với modules
const fs = require('fs');
console.log('Node.js có thể làm việc với file system!');
```

**Chạy**: `node hello.js`

---

## 🔍 Giải thích sâu

### 1. Interpreted vs Compiled

**Compiled Languages** (C, C++, Java):
```
Source Code → Compiler → Machine Code → Execute
```

**Interpreted Languages** (JavaScript - cũ):
```
Source Code → Interpreter → Execute line by line
```

**Modern JavaScript (JIT - Just-In-Time Compilation)**:
```
Source Code → Parse → AST → Bytecode → JIT Compiler → Optimized Machine Code → Execute
```

JavaScript hiện đại sử dụng **JIT compilation**:
1. Code được parse thành Abstract Syntax Tree (AST)
2. Chuyển thành bytecode
3. Bytecode được thực thi và monitor
4. "Hot" code (chạy nhiều lần) được optimize thành machine code
5. Nếu assumptions sai, deoptimize và chạy lại

### 2. Single-threaded nhưng Non-blocking

JavaScript chạy trên **một thread duy nhất**, nhưng có thể xử lý nhiều tác vụ cùng lúc nhờ:

```javascript
// Synchronous (Blocking)
console.log('1. Bắt đầu');
console.log('2. Kết thúc');

// Asynchronous (Non-blocking)
console.log('1. Bắt đầu');
setTimeout(() => {
    console.log('2. Sau 2 giây');
}, 2000);
console.log('3. Kết thúc');

// Output:
// 1. Bắt đầu
// 3. Kết thúc
// 2. Sau 2 giây (sau 2s)
```

**Event Loop** cho phép JavaScript xử lý async operations mà không block main thread (sẽ học chi tiết ở Module 6 và 10).

### 3. Dynamic Typing

```javascript
// Biến có thể đổi kiểu bất cứ lúc nào
let x = 42;           // x là number
console.log(typeof x); // "number"

x = "hello";          // x giờ là string
console.log(typeof x); // "string"

x = true;             // x giờ là boolean
console.log(typeof x); // "boolean"
```

**Ưu điểm**: Linh hoạt, code nhanh
**Nhược điểm**: Dễ có lỗi runtime, khó debug

### 4. First-class Functions

Functions trong JavaScript là **objects**:

```javascript
// 1. Function có thể gán vào biến
const greet = function() {
    console.log('Hello!');
};

// 2. Function có thể làm tham số
function executeFunction(fn) {
    fn();
}
executeFunction(greet);

// 3. Function có thể return function
function createGreeter() {
    return function() {
        console.log('Hi!');
    };
}
const myGreeter = createGreeter();
myGreeter();
```

---

## ✏️ Bài tập

### Bài tập 1: Setup Environment
**Mục tiêu**: Cài đặt môi trường phát triển

**Yêu cầu**:
1. Cài đặt **Node.js** từ https://nodejs.org (LTS version)
2. Cài đặt **VS Code** từ https://code.visualstudio.com
3. Kiểm tra cài đặt:
   - Mở terminal/command prompt
   - Chạy: `node --version`
   - Chạy: `npm --version`
4. Tạo file `test.js` với nội dung:
   ```javascript
   console.log('Node.js version:', process.version);
   console.log('Setup thành công!');
   ```
5. Chạy: `node test.js`

### Bài tập 2: Hello World - 3 cách
**Mục tiêu**: Làm quen với các cách chạy JavaScript

**Yêu cầu**:
1. **Cách 1 - Browser Console**:
   - Mở Chrome DevTools (F12)
   - Vào tab Console
   - Gõ: `console.log('Hello from Browser!')`
   - Gõ: `alert('Hello World!')`

2. **Cách 2 - HTML file**:
   - Tạo file `index.html`:
   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <title>Bài tập 2</title>
   </head>
   <body>
       <h1>Xem Console</h1>
       <script>
           console.log('Hello from HTML!');
           document.body.style.backgroundColor = 'lightblue';
       </script>
   </body>
   </html>
   ```
   - Mở file trong trình duyệt

3. **Cách 3 - Node.js**:
   - Tạo file `hello.js`:
   ```javascript
   console.log('Hello from Node.js!');
   console.log('Current time:', new Date().toLocaleString('vi-VN'));
   ```
   - Chạy: `node hello.js`

### Bài tập 3: Khám phá Console
**Mục tiêu**: Làm quen với console methods

**Yêu cầu**: Tạo file `console-practice.js`:
```javascript
// 1. Các loại console
console.log('Thông tin bình thường');
console.warn('Cảnh báo!');
console.error('Lỗi!');
console.info('Thông tin');

// 2. Console với nhiều giá trị
console.log('Tên:', 'Nguyễn Văn A', 'Tuổi:', 25);

// 3. Console với objects
const user = { name: 'John', age: 30 };
console.log('User:', user);

// 4. Console table
const users = [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 },
    { name: 'Bob', age: 35 }
];
console.table(users);

// 5. Timing
console.time('timer');
let sum = 0;
for (let i = 0; i < 1000000; i++) {
    sum += i;
}
console.timeEnd('timer');
console.log('Tổng:', sum);
```

Chạy và quan sát kết quả!

### Bài tập 4: JavaScript Playground
**Mục tiêu**: Thử nghiệm JavaScript cơ bản

**Yêu cầu**: Tạo file `playground.js`:
```javascript
// 1. Biến và kiểu dữ liệu
let name = 'Nguyen Van A';
let age = 25;
let isStudent = true;

console.log('Name:', name, '| Type:', typeof name);
console.log('Age:', age, '| Type:', typeof age);
console.log('Is Student:', isStudent, '| Type:', typeof isStudent);

// 2. Tính toán
let a = 10;
let b = 20;
console.log('a + b =', a + b);
console.log('a * b =', a * b);
console.log('b / a =', b / a);

// 3. String operations
let firstName = 'Nguyen';
let lastName = 'Van A';
let fullName = firstName + ' ' + lastName;
console.log('Full Name:', fullName);
console.log('Length:', fullName.length);
console.log('Uppercase:', fullName.toUpperCase());

// 4. Array
let numbers = [1, 2, 3, 4, 5];
console.log('Numbers:', numbers);
console.log('First number:', numbers[0]);
console.log('Array length:', numbers.length);

// 5. Object
let person = {
    name: 'John Doe',
    age: 30,
    city: 'Ha Noi'
};
console.log('Person:', person);
console.log('Person name:', person.name);
console.log('Person age:', person.age);
```

### Bài tập 5: Challenge - Tạo Profile Card
**Mục tiêu**: Tạo trang HTML đơn giản với JavaScript

**Yêu cầu**: Tạo file `profile.html`:
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Profile</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f0f0f0;
        }
        .profile-card {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        button {
            margin-top: 10px;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="profile-card">
        <h1 id="name">Tên của bạn</h1>
        <p id="bio">Bio của bạn</p>
        <p id="info">Thông tin thêm</p>
        <button onclick="updateProfile()">Cập nhật Profile</button>
        <button onclick="showSkills()">Hiển thị Skills</button>
    </div>

    <script>
        // TODO: Bạn hãy hoàn thành các functions sau
        
        function updateProfile() {
            // Thay đổi nội dung của name, bio, info
            // Gợi ý: Sử dụng document.getElementById()
        }

        function showSkills() {
            // Hiển thị alert với danh sách skills của bạn
            // Gợi ý: Sử dụng alert()
        }
        
        // Khi trang load, tự động cập nhật với thông tin của bạn
        window.onload = function() {
            // Code của bạn ở đây
        };
    </script>
</body>
</html>
```

**Hướng dẫn giải**:
```javascript
function updateProfile() {
    document.getElementById('name').textContent = 'Nguyễn Văn A';
    document.getElementById('bio').textContent = 'Web Developer | JavaScript Enthusiast';
    document.getElementById('info').textContent = 'Đang học JavaScript từ cơ bản đến nâng cao';
}

function showSkills() {
    let skills = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'];
    alert('Skills của tôi:\n' + skills.join(', '));
}

window.onload = function() {
    console.log('Trang đã load xong!');
    document.getElementById('name').textContent = 'Welcome!';
};
```

---

## 📝 Tóm tắt

Trong bài này bạn đã học:
- ✅ JavaScript là gì và tại sao nó quan trọng
- ✅ Đặc điểm chính của JavaScript (dynamic, interpreted, single-threaded)
- ✅ JavaScript có thể làm gì (Frontend, Backend, Mobile, Desktop)
- ✅ JavaScript Engine và ECMAScript
- ✅ Cách chạy JavaScript (Browser, Node.js)
- ✅ Concepts quan trọng: JIT compilation, Event Loop, First-class Functions
- ✅ Setup môi trường và viết code JavaScript đầu tiên

---

## 🎯 Kiến thức cần nắm vững

Trước khi chuyển sang bài tiếp theo, hãy chắc chắn bạn:
- [ ] Hiểu JavaScript là gì và nó khác gì với Java
- [ ] Biết cách chạy JavaScript trong Browser và Node.js
- [ ] Hiểu khái niệm dynamic typing
- [ ] Biết sử dụng console.log() để debug
- [ ] Đã setup môi trường phát triển (Node.js + VS Code)

---

**Bài tiếp theo**: [Bài 02 - Biến và khai báo (var, let, const)](./Lesson_02_Variables.md)

