# Bài 29: Async/Await

## 📖 Lý thuyết

**Async/Await** (ES2017) là syntax sugar built on top of Promises, giúp viết async code trông như sync code - dễ đọc và dễ hiểu hơn!

```javascript
// Promises
fetchUser(1)
    .then(user => fetchPosts(user.id))
    .then(posts => console.log(posts))
    .catch(error => console.error(error));

// Async/Await
async function getUser Posts() {
    try {
        const user = await fetchUser(1);
        const posts = await fetchPosts(user.id);
        console.log(posts);
    } catch (error) {
        console.error(error);
    }
}
```

---

## 💡 async Keyword

`async` function luôn return một Promise.

```javascript
// Regular function
function regularFunction() {
    return 'Hello';
}

// Async function
async function asyncFunction() {
    return 'Hello'; // Automatically wrapped in Promise
}

// Equivalent to:
function asyncFunctionEquivalent() {
    return Promise.resolve('Hello');
}

// Usage
asyncFunction().then(value => console.log(value)); // Hello

// Return promise explicitly
async function fetchData() {
    return Promise.resolve({ data: 'Some data' });
}
```

---

## 💡 await Keyword

`await` chỉ dùng được trong `async` functions. Nó "pause" execution cho đến khi Promise resolved.

```javascript
async function example() {
    console.log('1. Start');
    
    // Wait for promise to resolve
    const result = await Promise.resolve('Hello');
    console.log('2. Result:', result);
    
    console.log('3. End');
}

example();
// Output:
// 1. Start
// 2. Result: Hello
// 3. End

// ❌ Cannot use await outside async function
// const result = await Promise.resolve('Hello'); // SyntaxError
```

---

## 💡 Error Handling

### try...catch

```javascript
async function fetchUser(id) {
    try {
        const response = await fetch(`/api/users/${id}`);
        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error; // Re-throw or handle
    }
}

// Calling async function
fetchUser(1)
    .then(user => console.log(user))
    .catch(error => console.error(error));
```

### Multiple try...catch Blocks

```javascript
async function processData() {
    let user;
    let posts;
    
    // Separate error handling
    try {
        user = await fetchUser(1);
    } catch (error) {
        console.error('Failed to fetch user:', error);
        return; // Exit early
    }
    
    try {
        posts = await fetchPosts(user.id);
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        posts = []; // Use default value
    }
    
    console.log({ user, posts });
}
```

### catch() on Promise

```javascript
async function fetchData() {
    // Handle error with .catch()
    const user = await fetchUser(1).catch(error => {
        console.error('Error:', error);
        return null; // Default value
    });
    
    if (!user) {
        console.log('User not found');
        return;
    }
    
    console.log(user);
}
```

---

## 💡 Sequential vs Parallel

### Sequential Execution

```javascript
// Wait for each operation to complete
async function sequential() {
    console.time('Sequential');
    
    const user = await fetchUser(1);      // 2s
    const posts = await fetchPosts(1);    // 2s
    const comments = await fetchComments(1); // 2s
    
    console.timeEnd('Sequential'); // ~6 seconds
    
    return { user, posts, comments };
}
```

### Parallel Execution

```javascript
// Start all operations immediately
async function parallel() {
    console.time('Parallel');
    
    // Start all promises
    const userPromise = fetchUser(1);
    const postsPromise = fetchPosts(1);
    const commentsPromise = fetchComments(1);
    
    // Wait for all to complete
    const user = await userPromise;
    const posts = await postsPromise;
    const comments = await commentsPromise;
    
    console.timeEnd('Parallel'); // ~2 seconds (fastest)
    
    return { user, posts, comments };
}

// Better: Use Promise.all()
async function parallelWithPromiseAll() {
    console.time('Promise.all');
    
    const [user, posts, comments] = await Promise.all([
        fetchUser(1),
        fetchPosts(1),
        fetchComments(1)
    ]);
    
    console.timeEnd('Promise.all'); // ~2 seconds
    
    return { user, posts, comments };
}
```

---

## 💡 Real-World Examples

### 1. API Calls với Error Handling

```javascript
async function getUserData(userId) {
    try {
        // Fetch user
        const userResponse = await fetch(`/api/users/${userId}`);
        if (!userResponse.ok) {
            throw new Error(`HTTP error! status: ${userResponse.status}`);
        }
        const user = await userResponse.json();
        
        // Fetch user's posts
        const postsResponse = await fetch(`/api/posts?userId=${userId}`);
        if (!postsResponse.ok) {
            throw new Error(`HTTP error! status: ${postsResponse.status}`);
        }
        const posts = await postsResponse.json();
        
        return { user, posts };
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

// Usage
getUserData(1)
    .then(data => console.log(data))
    .catch(error => console.error(error));
```

### 2. Loading State Pattern

```javascript
async function loadUserData(userId) {
    let loading = true;
    let error = null;
    let data = null;
    
    try {
        showLoadingSpinner(); // UI update
        
        data = await getUserData(userId);
        
    } catch (err) {
        error = err;
    } finally {
        loading = false;
        hideLoadingSpinner(); // UI update
    }
    
    if (error) {
        displayError(error);
    } else {
        displayData(data);
    }
}
```

### 3. Retry Logic

```javascript
async function fetchWithRetry(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed');
            return await response.json();
        } catch (error) {
            if (i === retries - 1) throw error; // Last attempt
            console.log(`Retry ${i + 1}/${retries}`);
            await delay(1000); // Wait before retry
        }
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
```

### 4. Timeout Pattern

```javascript
function timeout(ms) {
    return new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout')), ms);
    });
}

async function fetchWithTimeout(url, ms) {
    try {
        const response = await Promise.race([
            fetch(url),
            timeout(ms)
        ]);
        return await response.json();
    } catch (error) {
        if (error.message === 'Timeout') {
            console.error('Request timed out');
        }
        throw error;
    }
}

// Usage
fetchWithTimeout('/api/data', 5000)
    .then(data => console.log(data))
    .catch(error => console.error(error));
```

---

## 💡 Common Patterns

### 1. Waterfall Pattern (Sequential Dependencies)

```javascript
async function waterfall() {
    const user = await fetchUser(1);
    const profile = await fetchProfile(user.profileId);
    const settings = await fetchSettings(profile.settingsId);
    
    return { user, profile, settings };
}
```

### 2. Parallel Independent Requests

```javascript
async function parallelRequests() {
    const [users, posts, comments] = await Promise.all([
        fetchUsers(),
        fetchPosts(),
        fetchComments()
    ]);
    
    return { users, posts, comments };
}
```

### 3. Mixed Sequential and Parallel

```javascript
async function mixed() {
    // Fetch user first
    const user = await fetchUser(1);
    
    // Then fetch posts and comments in parallel
    const [posts, comments] = await Promise.all([
        fetchPosts(user.id),
        fetchComments(user.id)
    ]);
    
    return { user, posts, comments };
}
```

### 4. Error Recovery

```javascript
async function withFallback() {
    let user;
    
    try {
        user = await fetchUser(1);
    } catch (error) {
        console.error('Primary API failed, trying backup');
        user = await fetchUserFromBackup(1);
    }
    
    return user;
}
```

---

## ⚠️ Common Pitfalls

### 1. Forgetting await

```javascript
// ❌ BAD - Missing await
async function bad() {
    const user = fetchUser(1); // Returns Promise, not data!
    console.log(user.name);     // undefined
}

// ✅ GOOD
async function good() {
    const user = await fetchUser(1);
    console.log(user.name); // Works!
}
```

### 2. Sequential khi có thể Parallel

```javascript
// ❌ BAD - Sequential (slow)
async function bad() {
    const user = await fetchUser(1);     // 2s
    const posts = await fetchPosts(1);   // 2s
    // Total: 4s
}

// ✅ GOOD - Parallel (fast)
async function good() {
    const [user, posts] = await Promise.all([
        fetchUser(1),
        fetchPosts(1)
    ]);
    // Total: 2s
}
```

### 3. Unhandled Promise Rejection

```javascript
// ❌ BAD - No error handling
async function bad() {
    const data = await fetch('/api/data'); // Might fail
    return data.json();
}

// ✅ GOOD - With error handling
async function good() {
    try {
        const data = await fetch('/api/data');
        return data.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
```

---

## ✏️ Bài tập

### Bài tập 1: Convert Promises to Async/Await

```javascript
// TODO: Convert to async/await

// Using Promises
function getUserPosts(userId) {
    return fetchUser(userId)
        .then(user => fetchPosts(user.id))
        .then(posts => {
            console.log('Posts:', posts);
            return posts;
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

// TODO: Rewrite using async/await
async function getUserPostsAsync(userId) {
    // Your code here
}
```

**Đáp án**:
```javascript
async function getUserPostsAsync(userId) {
    try {
        const user = await fetchUser(userId);
        const posts = await fetchPosts(user.id);
        console.log('Posts:', posts);
        return posts;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
```

### Bài tập 2: Parallel vs Sequential

```javascript
// TODO: Implement both versions và so sánh time

function delay(ms, value) {
    return new Promise(resolve => {
        setTimeout(() => resolve(value), ms);
    });
}

// 1. Sequential version
async function sequential() {
    console.time('Sequential');
    // Fetch 3 items, each takes 1 second
    // Your code
    console.timeEnd('Sequential');
}

// 2. Parallel version
async function parallel() {
    console.time('Parallel');
    // Fetch 3 items in parallel
    // Your code
    console.timeEnd('Parallel');
}
```

**Đáp án**:
```javascript
async function sequential() {
    console.time('Sequential');
    const item1 = await delay(1000, 'Item 1');
    const item2 = await delay(1000, 'Item 2');
    const item3 = await delay(1000, 'Item 3');
    console.log([item1, item2, item3]);
    console.timeEnd('Sequential'); // ~3s
}

async function parallel() {
    console.time('Parallel');
    const [item1, item2, item3] = await Promise.all([
        delay(1000, 'Item 1'),
        delay(1000, 'Item 2'),
        delay(1000, 'Item 3')
    ]);
    console.log([item1, item2, item3]);
    console.timeEnd('Parallel'); // ~1s
}
```

### Bài tập 3: Error Handling Practice

```javascript
// TODO: Handle errors properly

async function fetchMultipleUsers(userIds) {
    // Fetch all users
    // If some fail, continue with others
    // Return { successful: [...], failed: [...] }
}

// Test
fetchMultipleUsers([1, 2, 999, 3])
    .then(result => console.log(result));
```

**Đáp án**:
```javascript
async function fetchMultipleUsers(userIds) {
    const results = await Promise.allSettled(
        userIds.map(id => fetchUser(id))
    );
    
    const successful = [];
    const failed = [];
    
    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            successful.push(result.value);
        } else {
            failed.push({ id: userIds[index], error: result.reason });
        }
    });
    
    return { successful, failed };
}
```

---

## 📝 Tóm tắt

- ✅ async functions luôn return Promise
- ✅ await pause execution cho đến khi Promise resolved
- ✅ try...catch cho error handling
- ✅ Sequential vs Parallel execution
- ✅ Promise.all() với async/await
- ✅ Common patterns và pitfalls
- ✅ Real-world examples

---

## 🎯 Best Practices

1. **Always handle errors** với try...catch hoặc .catch()
2. **Use parallel execution** khi có thể (Promise.all)
3. **Don't forget await** - easy to miss!
4. **Return early** khi có error
5. **Use TypeScript** để catch await issues

---

**Bài tiếp theo**: [Bài 30 - Fetch API](./Lesson_30_Fetch_API.md)

**🎉 Async/Await là một trong những features quan trọng nhất! Practice nhiều!**

