# Bài 06: Câu lệnh điều kiện (Conditionals)

## 📖 Lý thuyết

**Câu lệnh điều kiện** (Conditionals) cho phép chương trình thực thi các đoạn code khác nhau dựa trên điều kiện.

JavaScript có các loại conditionals:
1. **if statement**
2. **if...else statement**
3. **if...else if...else statement**
4. **switch statement**
5. **Ternary operator** (đã học ở bài 04)

---

## 💡 Các loại Conditionals

### 1. if Statement

Thực thi code block nếu điều kiện là `true`.

**Syntax**:
```javascript
if (condition) {
    // Code chạy nếu condition là true
}
```

**Ví dụ**:
```javascript
const age = 20;

if (age >= 18) {
    console.log('Bạn đã trưởng thành');
}

// Kiểm tra nhiều conditions
const score = 85;
const attendance = 90;

if (score >= 80) {
    console.log('Điểm tốt!');
}

if (attendance >= 80) {
    console.log('Chuyên cần tốt!');
}

// Single line (không nên dùng)
if (age >= 18) console.log('Adult');
```

### 2. if...else Statement

Thực thi code block A nếu điều kiện `true`, ngược lại thực thi code block B.

**Syntax**:
```javascript
if (condition) {
    // Code chạy nếu condition là true
} else {
    // Code chạy nếu condition là false
}
```

**Ví dụ**:
```javascript
const age = 16;

if (age >= 18) {
    console.log('Bạn có thể lái xe');
} else {
    console.log('Bạn chưa đủ tuổi lái xe');
}

// Nested if-else
const temperature = 25;

if (temperature > 30) {
    console.log('Nóng');
} else {
    if (temperature > 20) {
        console.log('Ấm');
    } else {
        console.log('Lạnh');
    }
}
```

### 3. if...else if...else Statement

Kiểm tra nhiều điều kiện.

**Syntax**:
```javascript
if (condition1) {
    // Code chạy nếu condition1 là true
} else if (condition2) {
    // Code chạy nếu condition2 là true
} else if (condition3) {
    // Code chạy nếu condition3 là true
} else {
    // Code chạy nếu tất cả conditions là false
}
```

**Ví dụ**:
```javascript
const score = 85;

if (score >= 90) {
    console.log('Điểm: A');
} else if (score >= 80) {
    console.log('Điểm: B');
} else if (score >= 70) {
    console.log('Điểm: C');
} else if (score >= 60) {
    console.log('Điểm: D');
} else {
    console.log('Điểm: F');
}

// Multiple conditions
const age = 25;
const hasLicense = true;
const hasCar = false;

if (age >= 18 && hasLicense && hasCar) {
    console.log('Bạn có thể lái xe của mình');
} else if (age >= 18 && hasLicense) {
    console.log('Bạn có thể thuê xe');
} else if (age >= 18) {
    console.log('Bạn cần có bằng lái');
} else {
    console.log('Bạn chưa đủ tuổi');
}
```

### 4. switch Statement

So sánh một giá trị với nhiều cases.

**Syntax**:
```javascript
switch (expression) {
    case value1:
        // Code chạy nếu expression === value1
        break;
    case value2:
        // Code chạy nếu expression === value2
        break;
    default:
        // Code chạy nếu không match case nào
}
```

**Ví dụ**:
```javascript
const day = 3;

switch (day) {
    case 1:
        console.log('Thứ Hai');
        break;
    case 2:
        console.log('Thứ Ba');
        break;
    case 3:
        console.log('Thứ Tư');
        break;
    case 4:
        console.log('Thứ Năm');
        break;
    case 5:
        console.log('Thứ Sáu');
        break;
    case 6:
        console.log('Thứ Bảy');
        break;
    case 7:
        console.log('Chủ Nhật');
        break;
    default:
        console.log('Ngày không hợp lệ');
}

// Multiple cases cùng code
const month = 2;

switch (month) {
    case 12:
    case 1:
    case 2:
        console.log('Mùa Đông');
        break;
    case 3:
    case 4:
    case 5:
        console.log('Mùa Xuân');
        break;
    case 6:
    case 7:
    case 8:
        console.log('Mùa Hè');
        break;
    case 9:
    case 10:
    case 11:
        console.log('Mùa Thu');
        break;
    default:
        console.log('Tháng không hợp lệ');
}

// Switch với strings
const action = 'save';

switch (action) {
    case 'save':
        console.log('Saving...');
        break;
    case 'load':
        console.log('Loading...');
        break;
    case 'delete':
        console.log('Deleting...');
        break;
    default:
        console.log('Unknown action');
}
```

**⚠️ Lưu ý về break**:
```javascript
const grade = 'B';

// Without break - Fall through
switch (grade) {
    case 'A':
        console.log('Xuất sắc');
    case 'B':
        console.log('Giỏi');
    case 'C':
        console.log('Khá');
    default:
        console.log('Học lực');
}
// Output:
// Giỏi
// Khá
// Học lực
// (Tất cả cases sau 'B' đều chạy!)

// With break - Correct
switch (grade) {
    case 'A':
        console.log('Xuất sắc');
        break;
    case 'B':
        console.log('Giỏi');
        break;
    case 'C':
        console.log('Khá');
        break;
    default:
        console.log('Học lực');
}
// Output: Giỏi (Only!)
```

---

## 🔍 Giải thích sâu

### 1. Truthy và Falsy trong Conditionals

```javascript
// Falsy values: false, 0, '', null, undefined, NaN
if (0) {
    console.log('Không chạy'); // 0 is falsy
}

if ('') {
    console.log('Không chạy'); // empty string is falsy
}

if (null) {
    console.log('Không chạy'); // null is falsy
}

// Truthy values: tất cả còn lại
if (1) {
    console.log('Chạy'); // 1 is truthy
}

if ('hello') {
    console.log('Chạy'); // non-empty string is truthy
}

if ([]) {
    console.log('Chạy'); // empty array is truthy!
}

if ({}) {
    console.log('Chạy'); // empty object is truthy!
}

// Practical example
function greet(name) {
    if (name) {
        console.log(`Hello, ${name}!`);
    } else {
        console.log('Hello, Guest!');
    }
}

greet('John');  // Hello, John!
greet('');      // Hello, Guest!
greet();        // Hello, Guest!
```

### 2. Comparison trong Conditionals

```javascript
// Strict equality (===) - Recommended
const age = 18;

if (age === 18) {
    console.log('Exactly 18');
}

if (age === '18') {
    console.log('Không chạy'); // Khác type
}

// Loose equality (==) - Avoid
if (age == '18') {
    console.log('Chạy'); // Type coercion
}

// Comparison operators
const score = 85;

if (score > 80) {
    console.log('Trên 80');
}

if (score >= 80 && score < 90) {
    console.log('Từ 80 đến dưới 90');
}

// String comparison
const name = 'John';

if (name === 'John') {
    console.log('Welcome, John!');
}

// Case-insensitive comparison
if (name.toLowerCase() === 'john') {
    console.log('Match regardless of case');
}
```

### 3. Logical Operators trong Conditionals

```javascript
// AND (&&) - Tất cả phải true
const age = 25;
const hasLicense = true;
const hasInsurance = true;

if (age >= 18 && hasLicense && hasInsurance) {
    console.log('Có thể lái xe hợp pháp');
}

// OR (||) - Một trong các conditions true là được
const isWeekend = false;
const isHoliday = true;

if (isWeekend || isHoliday) {
    console.log('Không làm việc');
}

// NOT (!) - Đảo ngược boolean
const isLoggedIn = false;

if (!isLoggedIn) {
    console.log('Please login');
}

// Complex conditions
const role = 'admin';
const isActive = true;
const hasPermission = true;

if ((role === 'admin' || role === 'superadmin') && isActive && hasPermission) {
    console.log('Access granted');
}

// Short-circuit evaluation
const user = { name: 'John' };

if (user && user.name) {
    console.log(`User: ${user.name}`);
}

// Better với Optional Chaining (ES2020)
if (user?.name) {
    console.log(`User: ${user.name}`);
}
```

### 4. if vs switch - Khi nào dùng gì?

**Dùng if khi**:
```javascript
// 1. Comparison với ranges
const age = 25;
if (age < 18) {
    console.log('Minor');
} else if (age < 65) {
    console.log('Adult');
} else {
    console.log('Senior');
}

// 2. Complex conditions
const score = 85;
const attendance = 90;
if (score >= 80 && attendance >= 80) {
    console.log('Pass with honors');
}

// 3. Different types of comparisons
const user = { role: 'admin', isActive: true };
if (user.role === 'admin' || user.isActive) {
    console.log('Access granted');
}
```

**Dùng switch khi**:
```javascript
// 1. So sánh một giá trị với nhiều options cụ thể
const action = 'save';
switch (action) {
    case 'save':
        console.log('Saving...');
        break;
    case 'load':
        console.log('Loading...');
        break;
    case 'delete':
        console.log('Deleting...');
        break;
}

// 2. Nhiều cases (>3)
const httpStatus = 404;
switch (httpStatus) {
    case 200:
        console.log('OK');
        break;
    case 201:
        console.log('Created');
        break;
    case 400:
        console.log('Bad Request');
        break;
    case 401:
        console.log('Unauthorized');
        break;
    case 404:
        console.log('Not Found');
        break;
    case 500:
        console.log('Server Error');
        break;
    default:
        console.log('Unknown status');
}
```

### 5. Guard Clauses (Early Return)

**Bad** (Nested ifs):
```javascript
function processPayment(amount, user) {
    if (amount > 0) {
        if (user) {
            if (user.isActive) {
                if (user.balance >= amount) {
                    // Process payment
                    console.log('Payment processed');
                    return true;
                } else {
                    console.log('Insufficient balance');
                    return false;
                }
            } else {
                console.log('User not active');
                return false;
            }
        } else {
            console.log('User not found');
            return false;
        }
    } else {
        console.log('Invalid amount');
        return false;
    }
}
```

**Good** (Guard clauses):
```javascript
function processPayment(amount, user) {
    // Guard clauses - Check và return early
    if (amount <= 0) {
        console.log('Invalid amount');
        return false;
    }
    
    if (!user) {
        console.log('User not found');
        return false;
    }
    
    if (!user.isActive) {
        console.log('User not active');
        return false;
    }
    
    if (user.balance < amount) {
        console.log('Insufficient balance');
        return false;
    }
    
    // Main logic (không còn nested)
    console.log('Payment processed');
    return true;
}
```

---

## ✏️ Bài tập

### Bài tập 1: Basic Conditionals

```javascript
// TODO: Viết function kiểm tra số chẵn/lẻ
function isEven(number) {
    // Return 'Even' nếu số chẵn, 'Odd' nếu số lẻ
}

console.log(isEven(4));  // 'Even'
console.log(isEven(7));  // 'Odd'

// TODO: Viết function kiểm tra tuổi
function checkAge(age) {
    // < 13: 'Child'
    // 13-19: 'Teenager'
    // 20-59: 'Adult'
    // >= 60: 'Senior'
}

console.log(checkAge(10));  // 'Child'
console.log(checkAge(15));  // 'Teenager'
console.log(checkAge(30));  // 'Adult'
console.log(checkAge(65));  // 'Senior'
```

**Đáp án**:
```javascript
function isEven(number) {
    if (number % 2 === 0) {
        return 'Even';
    } else {
        return 'Odd';
    }
    // Hoặc: return number % 2 === 0 ? 'Even' : 'Odd';
}

function checkAge(age) {
    if (age < 13) {
        return 'Child';
    } else if (age <= 19) {
        return 'Teenager';
    } else if (age < 60) {
        return 'Adult';
    } else {
        return 'Senior';
    }
}
```

### Bài tập 2: Grade Calculator

```javascript
// TODO: Tạo function tính grade dựa trên điểm
function getGrade(score) {
    // 90-100: A
    // 80-89: B
    // 70-79: C
    // 60-69: D
    // <60: F
    // Invalid score (<0 hoặc >100): 'Invalid score'
}

console.log(getGrade(95));   // 'A'
console.log(getGrade(85));   // 'B'
console.log(getGrade(75));   // 'C'
console.log(getGrade(65));   // 'D'
console.log(getGrade(50));   // 'F'
console.log(getGrade(105));  // 'Invalid score'
console.log(getGrade(-5));   // 'Invalid score'
```

**Đáp án**:
```javascript
function getGrade(score) {
    // Guard clause
    if (score < 0 || score > 100) {
        return 'Invalid score';
    }
    
    if (score >= 90) {
        return 'A';
    } else if (score >= 80) {
        return 'B';
    } else if (score >= 70) {
        return 'C';
    } else if (score >= 60) {
        return 'D';
    } else {
        return 'F';
    }
}
```

### Bài tập 3: Switch Statement - Calculator

```javascript
// TODO: Tạo calculator sử dụng switch
function calculate(num1, num2, operator) {
    // Support: +, -, *, /, %
    // Return kết quả hoặc error message
}

console.log(calculate(10, 5, '+'));   // 15
console.log(calculate(10, 5, '-'));   // 5
console.log(calculate(10, 5, '*'));   // 50
console.log(calculate(10, 5, '/'));   // 2
console.log(calculate(10, 3, '%'));   // 1
console.log(calculate(10, 0, '/'));   // 'Cannot divide by zero'
console.log(calculate(10, 5, '^'));   // 'Invalid operator'
```

**Đáp án**:
```javascript
function calculate(num1, num2, operator) {
    // Guard clause cho division by zero
    if (operator === '/' && num2 === 0) {
        return 'Cannot divide by zero';
    }
    
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num1 / num2;
        case '%':
            return num1 % num2;
        default:
            return 'Invalid operator';
    }
}
```

### Bài tập 4: Traffic Light

```javascript
// TODO: Tạo function mô phỏng đèn giao thông
function trafficLight(color) {
    // 'red': 'Stop'
    // 'yellow': 'Slow down'
    // 'green': 'Go'
    // Other: 'Invalid color'
    
    // Sử dụng switch statement
    // Accept cả uppercase và lowercase
}

console.log(trafficLight('red'));     // 'Stop'
console.log(trafficLight('RED'));     // 'Stop'
console.log(trafficLight('yellow'));  // 'Slow down'
console.log(trafficLight('green'));   // 'Go'
console.log(trafficLight('blue'));    // 'Invalid color'
```

**Đáp án**:
```javascript
function trafficLight(color) {
    switch (color.toLowerCase()) {
        case 'red':
            return 'Stop';
        case 'yellow':
            return 'Slow down';
        case 'green':
            return 'Go';
        default:
            return 'Invalid color';
    }
}
```

### Bài tập 5: Login System

```javascript
// TODO: Tạo function kiểm tra đăng nhập
function login(username, password, isActive) {
    // Kiểm tra:
    // 1. username và password không rỗng
    // 2. username ít nhất 3 ký tự
    // 3. password ít nhất 6 ký tự
    // 4. isActive === true
    // 
    // Return appropriate messages
}

console.log(login('john', '123456', true));    // 'Login successful'
console.log(login('', '123456', true));        // 'Username required'
console.log(login('john', '', true));          // 'Password required'
console.log(login('jo', '123456', true));      // 'Username too short'
console.log(login('john', '123', true));       // 'Password too short'
console.log(login('john', '123456', false));   // 'Account not active'
```

**Đáp án**:
```javascript
function login(username, password, isActive) {
    // Guard clauses
    if (!username) {
        return 'Username required';
    }
    
    if (!password) {
        return 'Password required';
    }
    
    if (username.length < 3) {
        return 'Username too short';
    }
    
    if (password.length < 6) {
        return 'Password too short';
    }
    
    if (!isActive) {
        return 'Account not active';
    }
    
    return 'Login successful';
}
```

### Bài tập 6: BMI Calculator

```javascript
// TODO: Tính chỉ số BMI và phân loại
function calculateBMI(weight, height) {
    // BMI = weight / (height * height)
    // 
    // < 18.5: 'Underweight'
    // 18.5-24.9: 'Normal weight'
    // 25-29.9: 'Overweight'
    // >= 30: 'Obese'
    // 
    // Validate input:
    // - weight > 0
    // - height > 0
    // 
    // Return object: { bmi: number, category: string }
}

console.log(calculateBMI(70, 1.75));
// { bmi: 22.86, category: 'Normal weight' }

console.log(calculateBMI(50, 1.75));
// { bmi: 16.33, category: 'Underweight' }

console.log(calculateBMI(0, 1.75));
// { bmi: null, category: 'Invalid input' }
```

**Đáp án**:
```javascript
function calculateBMI(weight, height) {
    // Validate
    if (weight <= 0 || height <= 0) {
        return { bmi: null, category: 'Invalid input' };
    }
    
    const bmi = weight / (height * height);
    const bmiRounded = Math.round(bmi * 100) / 100; // 2 decimal places
    
    let category;
    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi < 25) {
        category = 'Normal weight';
    } else if (bmi < 30) {
        category = 'Overweight';
    } else {
        category = 'Obese';
    }
    
    return { bmi: bmiRounded, category };
}
```

### Bài tập 7: Discount Calculator

```javascript
// TODO: Tính discount dựa trên amount và membership
function calculateDiscount(amount, membershipType) {
    // Membership types:
    // - 'regular': 0% discount
    // - 'silver': 5% discount if amount >= 100
    // - 'gold': 10% discount if amount >= 100, 15% if >= 500
    // - 'platinum': 15% discount if amount >= 100, 20% if >= 500, 25% if >= 1000
    // 
    // Return object: { 
    //   originalAmount: number,
    //   discount: number,
    //   finalAmount: number,
    //   message: string
    // }
}

console.log(calculateDiscount(150, 'silver'));
// { originalAmount: 150, discount: 7.5, finalAmount: 142.5, message: '5% discount applied' }

console.log(calculateDiscount(600, 'gold'));
// { originalAmount: 600, discount: 90, finalAmount: 510, message: '15% discount applied' }
```

**Đáp án**:
```javascript
function calculateDiscount(amount, membershipType) {
    let discountPercent = 0;
    let message = 'No discount';
    
    switch (membershipType.toLowerCase()) {
        case 'regular':
            discountPercent = 0;
            message = 'No discount';
            break;
            
        case 'silver':
            if (amount >= 100) {
                discountPercent = 5;
                message = '5% discount applied';
            }
            break;
            
        case 'gold':
            if (amount >= 500) {
                discountPercent = 15;
                message = '15% discount applied';
            } else if (amount >= 100) {
                discountPercent = 10;
                message = '10% discount applied';
            }
            break;
            
        case 'platinum':
            if (amount >= 1000) {
                discountPercent = 25;
                message = '25% discount applied';
            } else if (amount >= 500) {
                discountPercent = 20;
                message = '20% discount applied';
            } else if (amount >= 100) {
                discountPercent = 15;
                message = '15% discount applied';
            }
            break;
            
        default:
            message = 'Invalid membership type';
    }
    
    const discount = amount * (discountPercent / 100);
    const finalAmount = amount - discount;
    
    return {
        originalAmount: amount,
        discount: discount,
        finalAmount: finalAmount,
        message: message
    };
}
```

---

## 📝 Tóm tắt

Trong bài này bạn đã học:
- ✅ if, if...else, if...else if...else statements
- ✅ switch statement và khi nào dùng
- ✅ Truthy và Falsy values trong conditionals
- ✅ Logical operators (&&, ||, !) trong conditionals
- ✅ Guard clauses cho code sạch hơn
- ✅ if vs switch - Khi nào dùng gì
- ✅ Best practices: Avoid deep nesting, use early returns

---

## 🎯 Kiến thức cần nắm vững

Trước khi chuyển sang bài tiếp theo:
- [ ] Hiểu cách hoạt động của if, else, else if
- [ ] Biết khi nào dùng switch thay vì if
- [ ] Hiểu truthy/falsy values
- [ ] Biết cách kết hợp logical operators
- [ ] Áp dụng được guard clauses
- [ ] Tránh nested ifs quá sâu

---

**Bài tiếp theo**: [Bài 07 - Vòng lặp (Loops)](./Lesson_07_Loops.md)

