# Bài 40: Encapsulation & Private Fields

## 📖 Lý thuyết

**Encapsulation** là việc hiding internal state và chỉ expose public API.

---

## 💡 Private Fields (#)

```javascript
class BankAccount {
    #balance = 0;  // Private field
    #pin;          // Private field
    
    constructor(initialBalance, pin) {
        this.#balance = initialBalance;
        this.#pin = pin;
    }
    
    deposit(amount) {
        if (amount > 0) {
            this.#balance += amount;
            return true;
        }
        return false;
    }
    
    withdraw(amount, pin) {
        if (pin !== this.#pin) {
            throw new Error('Invalid PIN');
        }
        
        if (amount > this.#balance) {
            throw new Error('Insufficient funds');
        }
        
        this.#balance -= amount;
        return this.#balance;
    }
    
    getBalance(pin) {
        if (pin !== this.#pin) {
            throw new Error('Invalid PIN');
        }
        return this.#balance;
    }
}

const account = new Account(1000, '1234');
account.deposit(500);
// console.log(account.#balance); // ❌ SyntaxError
console.log(account.getBalance('1234')); // ✅ 1500
```

---

## 💡 Private Methods

```javascript
class User {
    #password;
    
    constructor(username, password) {
        this.username = username;
        this.#password = this.#hashPassword(password);
    }
    
    // Private method
    #hashPassword(password) {
        return password.split('').reverse().join('');
    }
    
    #validatePassword(password) {
        return this.#hashPassword(password) === this.#password;
    }
    
    // Public method
    login(password) {
        return this.#validatePassword(password);
    }
}

const user = new User('john', 'secret');
console.log(user.login('secret')); // true
// user.#hashPassword('test'); // ❌ SyntaxError
```

---

## 💡 Getters và Setters

```javascript
class Temperature {
    #celsius;
    
    constructor(celsius) {
        this.#celsius = celsius;
    }
    
    get celsius() {
        return this.#celsius;
    }
    
    set celsius(value) {
        if (value < -273.15) {
            throw new Error('Temperature below absolute zero');
        }
        this.#celsius = value;
    }
    
    get fahrenheit() {
        return this.#celsius * 9/5 + 32;
    }
    
    set fahrenheit(value) {
        this.celsius = (value - 32) * 5/9;
    }
}

const temp = new Temperature(25);
console.log(temp.celsius);     // 25
console.log(temp.fahrenheit);  // 77
temp.fahrenheit = 86;
console.log(temp.celsius);     // 30
```

---

## 💡 WeakMap Pattern (Old way)

```javascript
// Before private fields, used WeakMap
const _balance = new WeakMap();

class Account {
    constructor(initialBalance) {
        _balance.set(this, initialBalance);
    }
    
    getBalance() {
        return _balance.get(this);
    }
    
    deposit(amount) {
        const balance = _balance.get(this);
        _balance.set(this, balance + amount);
    }
}
```

---

**🎉 HOÀN THÀNH MODULE 8 - OOP!**

