# Bài 30: Fetch API

## 📖 Lý thuyết

**Fetch API** là modern interface để thực hiện HTTP requests, thay thế XMLHttpRequest.

---

## 💡 Basic Fetch

```javascript
// GET request
fetch('https://api.example.com/users')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

// Async/Await (preferred)
async function fetchUsers() {
    try {
        const response = await fetch('https://api.example.com/users');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}
```

---

## 💡 Response Object

```javascript
async function checkResponse() {
    const response = await fetch('https://api.example.com/data');
    
    console.log(response.status);      // 200, 404, 500...
    console.log(response.ok);          // true if 200-299
    console.log(response.statusText);  // 'OK', 'Not Found'...
    console.log(response.headers);     // Headers object
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
}
```

---

## 💡 Request Methods

### GET

```javascript
fetch('https://api.example.com/users')
    .then(r => r.json())
    .then(data => console.log(data));
```

### POST

```javascript
fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com'
    })
})
.then(r => r.json())
.then(data => console.log(data));
```

### PUT / PATCH

```javascript
fetch('https://api.example.com/users/1', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'Jane Doe'
    })
})
.then(r => r.json());
```

### DELETE

```javascript
fetch('https://api.example.com/users/1', {
    method: 'DELETE'
})
.then(r => r.json());
```

---

## 💡 Headers

```javascript
const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Authorization', 'Bearer token123');

fetch('https://api.example.com/data', {
    headers: headers
});

// Or object
fetch('https://api.example.com/data', {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token123'
    }
});
```

---

## 💡 Error Handling

```javascript
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        
        // Check HTTP status
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        // Network error or parsing error
        console.error('Fetch error:', error);
        throw error;
    }
}
```

---

## 💡 Real Example - JSONPlaceholder

```javascript
// GET users
async function getUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    console.log(users);
}

// GET single user
async function getUser(id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const user = await response.json();
    console.log(user);
}

// POST new post
async function createPost(post) {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    });
    const data = await response.json();
    console.log(data);
}

// Usage
getUsers();
getUser(1);
createPost({
    title: 'My Post',
    body: 'Post content',
    userId: 1
});
```

---

## ✏️ Bài tập

```javascript
// TODO: Create API wrapper
class API {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    
    async get(endpoint) {
        // Implement GET
    }
    
    async post(endpoint, data) {
        // Implement POST
    }
    
    async put(endpoint, data) {
        // Implement PUT
    }
    
    async delete(endpoint) {
        // Implement DELETE
    }
}

// Usage
const api = new API('https://jsonplaceholder.typicode.com');
const users = await api.get('/users');
```

---

**🎉 HOÀN THÀNH MODULE 6 - ASYNC JAVASCRIPT!**

