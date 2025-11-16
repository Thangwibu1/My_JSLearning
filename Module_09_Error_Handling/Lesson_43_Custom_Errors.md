# Bài 43: Custom Errors

## 📖 Lý thuyết

Custom errors giúp tạo specific error types cho application.

---

## 💡 Creating Custom Errors

```javascript
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
    }
}

// Usage
function validateUser(user) {
    if (!user.email) {
        throw new ValidationError('Email is required');
    }
    if (!user.email.includes('@')) {
        throw new ValidationError('Invalid email format');
    }
}

try {
    validateUser({ email: 'invalid' });
} catch (error) {
    if (error instanceof ValidationError) {
        console.log('Validation failed:', error.message);
    }
}
```

---

## 💡 Custom Error with Details

```javascript
class APIError extends Error {
    constructor(message, statusCode, details) {
        super(message);
        this.name = 'APIError';
        this.statusCode = statusCode;
        this.details = details;
    }
}

async function fetchUser(id) {
    const response = await fetch(`/api/users/${id}`);
    
    if (!response.ok) {
        throw new APIError(
            'Failed to fetch user',
            response.status,
            { userId: id, url: response.url }
        );
    }
    
    return response.json();
}
```

---

**Bài tiếp theo**: [Bài 44 - Debugging](./Lesson_44_Debugging.md)

