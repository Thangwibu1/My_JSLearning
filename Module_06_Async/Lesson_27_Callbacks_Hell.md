# Bài 27: Callback Hell

## 📖 Lý thuyết

**Callback Hell** (Pyramid of Doom) xảy ra khi có nhiều nested callbacks, code trở nên khó đọc và maintain.

---

## 💡 The Problem

```javascript
// ❌ Callback Hell
getUser(1, (user) => {
    getPosts(user.id, (posts) => {
        getComments(posts[0].id, (comments) => {
            getAuthor(comments[0].authorId, (author) => {
                console.log(author);
                // Nested 4 levels!
            });
        });
    });
});
```

---

## 💡 Solutions

### 1. Named Functions

```javascript
function getAuthorCallback(author) {
    console.log(author);
}

function getCommentsCallback(comments) {
    getAuthor(comments[0].authorId, getAuthorCallback);
}

function getPostsCallback(posts) {
    getComments(posts[0].id, getCommentsCallback);
}

function getUserCallback(user) {
    getPosts(user.id, getPostsCallback);
}

getUser(1, getUserCallback);
```

### 2. Promises (Better!)

```javascript
getUser(1)
    .then(user => getPosts(user.id))
    .then(posts => getComments(posts[0].id))
    .then(comments => getAuthor(comments[0].authorId))
    .then(author => console.log(author))
    .catch(error => console.error(error));
```

### 3. Async/Await (Best!)

```javascript
async function fetchData() {
    try {
        const user = await getUser(1);
        const posts = await getPosts(user.id);
        const comments = await getComments(posts[0].id);
        const author = await getAuthor(comments[0].authorId);
        console.log(author);
    } catch (error) {
        console.error(error);
    }
}
```

---

**Bài tiếp theo**: [Bài 28 - Promises](./Lesson_28_Promises.md) (✅ Đã hoàn thành)

