# Bài 28: Promises

## 📖 Lý thuyết

**Promise** là object đại diện cho kết quả của một async operation trong tương lai. Promise giải quyết vấn đề "callback hell".

### Promise States

Promise có 3 states:
1. **Pending**: Initial state, chưa hoàn thành
2. **Fulfilled**: Operation thành công
3. **Rejected**: Operation thất bại

```javascript
// Promise flow
Pending → Fulfilled (resolved)
       → Rejected
```

---

## 💡 Creating Promises

### Basic Promise

```javascript
const promise = new Promise((resolve, reject) => {
    // Async operation
    const success = true;
    
    if (success) {
        resolve('Success!'); // Fulfilled
    } else {
        reject('Error!');    // Rejected
    }
});

promise
    .then(result => console.log(result)) // Success!
    .catch(error => console.error(error));
```

### Practical Example - Simulated API Call

```javascript
function fetchUser(userId) {
    return new Promise((resolve, reject) => {
        console.log('Fetching user...');
        
        setTimeout(() => {
            if (userId > 0) {
                resolve({
                    id: userId,
                    name: 'John Doe',
                    email: 'john@example.com'
                });
            } else {
                reject(new Error('Invalid user ID'));
            }
        }, 2000);
    });
}

fetchUser(1)
    .then(user => {
        console.log('User:', user);
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
```

---

## 💡 then(), catch(), finally()

### then() - Handle Success

```javascript
const promise = Promise.resolve('Success');

promise.then(result => {
    console.log(result); // Success
});

// Chaining - Return value
Promise.resolve(5)
    .then(num => num * 2)    // 10
    .then(num => num + 3)    // 13
    .then(num => {
        console.log(num);    // 13
    });
```

### catch() - Handle Errors

```javascript
const promise = Promise.reject('Error!');

promise
    .then(result => console.log(result))
    .catch(error => console.error(error)); // Error!

// Error propagation
Promise.resolve(5)
    .then(num => {
        if (num < 10) {
            throw new Error('Number too small');
        }
        return num * 2;
    })
    .then(num => console.log(num))
    .catch(error => console.error(error.message)); // Number too small
```

### finally() - Always Executes

```javascript
fetch('/api/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))
    .finally(() => {
        console.log('Request completed'); // Always runs
        // Hide loading spinner
    });
```

---

## 💡 Promise Chaining

```javascript
// Sequential operations
function fetchUser(id) {
    return fetch(`/api/users/${id}`)
        .then(response => response.json());
}

function fetchPosts(userId) {
    return fetch(`/api/posts?userId=${userId}`)
        .then(response => response.json());
}

// Chain promises
fetchUser(1)
    .then(user => {
        console.log('User:', user);
        return fetchPosts(user.id); // Return promise
    })
    .then(posts => {
        console.log('Posts:', posts);
    })
    .catch(error => {
        console.error('Error:', error);
    });

// ❌ Common mistake - Nesting (Pyramid of Doom)
fetchUser(1)
    .then(user => {
        fetchPosts(user.id)
            .then(posts => {
                // Nested...
            });
    });

// ✅ Correct - Flat chain
fetchUser(1)
    .then(user => fetchPosts(user.id))
    .then(posts => console.log(posts))
    .catch(error => console.error(error));
```

---

## 💡 Promise Static Methods

### Promise.resolve() và Promise.reject()

```javascript
// Create resolved promise
const resolved = Promise.resolve('Success');
resolved.then(value => console.log(value)); // Success

// Create rejected promise
const rejected = Promise.reject(new Error('Failed'));
rejected.catch(error => console.error(error));

// Wrap value in promise
const promise = Promise.resolve(42);
promise.then(num => console.log(num)); // 42
```

### Promise.all() - All or Nothing

```javascript
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.resolve(3);

Promise.all([promise1, promise2, promise3])
    .then(results => {
        console.log(results); // [1, 2, 3]
    });

// Practical - Multiple API calls
const fetchUser = fetch('/api/user/1').then(r => r.json());
const fetchPosts = fetch('/api/posts').then(r => r.json());
const fetchComments = fetch('/api/comments').then(r => r.json());

Promise.all([fetchUser, fetchPosts, fetchComments])
    .then(([user, posts, comments]) => {
        console.log({ user, posts, comments });
    })
    .catch(error => {
        console.error('One or more requests failed:', error);
    });

// ⚠️ If ANY promise rejects, Promise.all rejects
Promise.all([
    Promise.resolve(1),
    Promise.reject('Error'),
    Promise.resolve(3)
])
.catch(error => console.log(error)); // 'Error'
```

### Promise.race() - First to Finish

```javascript
const slow = new Promise(resolve => setTimeout(() => resolve('Slow'), 3000));
const fast = new Promise(resolve => setTimeout(() => resolve('Fast'), 1000));

Promise.race([slow, fast])
    .then(result => console.log(result)); // 'Fast' (first to complete)

// Practical - Timeout
function fetchWithTimeout(url, timeout) {
    const fetchPromise = fetch(url);
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout')), timeout);
    });
    
    return Promise.race([fetchPromise, timeoutPromise]);
}

fetchWithTimeout('/api/data', 5000)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error.message));
```

### Promise.allSettled() - Wait for All

```javascript
// ES2020 - Waits for all, returns all results (fulfilled or rejected)
const promises = [
    Promise.resolve(1),
    Promise.reject('Error'),
    Promise.resolve(3)
];

Promise.allSettled(promises)
    .then(results => {
        console.log(results);
        // [
        //   { status: 'fulfilled', value: 1 },
        //   { status: 'rejected', reason: 'Error' },
        //   { status: 'fulfilled', value: 3 }
        // ]
        
        results.forEach(result => {
            if (result.status === 'fulfilled') {
                console.log('Success:', result.value);
            } else {
                console.log('Failed:', result.reason);
            }
        });
    });
```

### Promise.any() - First Success

```javascript
// ES2021 - Returns first fulfilled promise
const promises = [
    Promise.reject('Error 1'),
    Promise.resolve('Success!'),
    Promise.reject('Error 2')
];

Promise.any(promises)
    .then(result => console.log(result)) // 'Success!'
    .catch(error => console.log('All failed'));
```

---

## 🔍 Giải thích sâu

### 1. Error Handling

```javascript
// catch() catches errors from any previous then()
Promise.resolve(1)
    .then(num => {
        throw new Error('Error in first then');
        return num * 2;
    })
    .then(num => {
        console.log(num); // Never executes
    })
    .catch(error => {
        console.error(error.message); // Error in first then
        return 10; // Recover from error
    })
    .then(num => {
        console.log(num); // 10 - Continues after catch
    });

// Multiple catch blocks
Promise.resolve(1)
    .then(num => {
        throw new Error('Error 1');
    })
    .catch(error => {
        console.error('Caught:', error.message);
        throw new Error('Error 2');
    })
    .catch(error => {
        console.error('Caught again:', error.message);
    });
```

### 2. Promise vs Callback

```javascript
// ❌ Callback Hell
getUserData(userId, (error, user) => {
    if (error) return handleError(error);
    
    getOrders(user.id, (error, orders) => {
        if (error) return handleError(error);
        
        getOrderDetails(orders[0].id, (error, details) => {
            if (error) return handleError(error);
            
            // Finally do something...
        });
    });
});

// ✅ Promises
getUserData(userId)
    .then(user => getOrders(user.id))
    .then(orders => getOrderDetails(orders[0].id))
    .then(details => {
        // Do something
    })
    .catch(error => handleError(error));
```

### 3. Tạo Custom Promises

```javascript
// Delay function
function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

delay(2000)
    .then(() => console.log('After 2 seconds'));

// Retry mechanism
function retryFetch(url, retries = 3) {
    return fetch(url)
        .catch(error => {
            if (retries > 0) {
                console.log(`Retrying... (${retries} left)`);
                return delay(1000).then(() => retryFetch(url, retries - 1));
            }
            throw error;
        });
}
```

---

## ✏️ Bài tập

### Bài tập 1: Basic Promises

```javascript
// TODO: Tạo promise simulates coin flip
function flipCoin() {
    return new Promise((resolve, reject) => {
        // Random heads (true) or tails (false)
        // 50% chance to resolve, 50% to reject
    });
}

flipCoin()
    .then(result => console.log('Heads!'))
    .catch(() => console.log('Tails!'));
```

**Đáp án**:
```javascript
function flipCoin() {
    return new Promise((resolve, reject) => {
        const isHeads = Math.random() < 0.5;
        if (isHeads) {
            resolve();
        } else {
            reject();
        }
    });
}
```

### Bài tập 2: Promise Chaining

```javascript
// TODO: Chain these functions
function getUser(id) {
    return Promise.resolve({ id, name: 'John', age: 30 });
}

function getUserPosts(userId) {
    return Promise.resolve([
        { id: 1, title: 'Post 1' },
        { id: 2, title: 'Post 2' }
    ]);
}

function getPostComments(postId) {
    return Promise.resolve([
        { id: 1, text: 'Great post!' },
        { id: 2, text: 'Thanks!' }
    ]);
}

// Chain: Get user → Get their posts → Get first post's comments
// Your code here
```

**Đáp án**:
```javascript
getUser(1)
    .then(user => {
        console.log('User:', user);
        return getUserPosts(user.id);
    })
    .then(posts => {
        console.log('Posts:', posts);
        return getPostComments(posts[0].id);
    })
    .then(comments => {
        console.log('Comments:', comments);
    })
    .catch(error => console.error(error));
```

### Bài tập 3: Promise.all() Practice

```javascript
// TODO: Fetch multiple users in parallel
const userIds = [1, 2, 3, 4, 5];

function fetchUser(id) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ id, name: `User ${id}` });
        }, 1000);
    });
}

// Fetch all users và log khi tất cả hoàn thành
// Your code here
```

**Đáp án**:
```javascript
const promises = userIds.map(id => fetchUser(id));

Promise.all(promises)
    .then(users => {
        console.log('All users:', users);
    })
    .catch(error => console.error(error));
```

### Bài tập 4: Practical - Parallel Requests

```javascript
// TODO: Fetch data from multiple APIs in parallel
// Calculate total time

const API1 = 'https://jsonplaceholder.typicode.com/users/1';
const API2 = 'https://jsonplaceholder.typicode.com/posts/1';
const API3 = 'https://jsonplaceholder.typicode.com/comments/1';

const startTime = Date.now();

// Fetch tất cả APIs song song
// Log data và total time
// Your code here
```

**Đáp án**:
```javascript
const startTime = Date.now();

Promise.all([
    fetch(API1).then(r => r.json()),
    fetch(API2).then(r => r.json()),
    fetch(API3).then(r => r.json())
])
.then(([user, post, comment]) => {
    console.log({ user, post, comment });
    const endTime = Date.now();
    console.log(`Total time: ${endTime - startTime}ms`);
})
.catch(error => console.error(error));
```

---

## 📝 Tóm tắt

- ✅ Promise states: Pending, Fulfilled, Rejected
- ✅ Creating promises với new Promise()
- ✅ then(), catch(), finally()
- ✅ Promise chaining
- ✅ Promise.all(), race(), allSettled(), any()
- ✅ Error handling trong promises
- ✅ Promises vs Callbacks

---

**Bài tiếp theo**: [Bài 29 - Async/Await](./Lesson_29_Async_Await.md)

