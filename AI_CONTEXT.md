# Project Context for AI Agents (System Prompt Extension)

This document provides technical context and architectural standards for the **Campus Used Textbook Marketplace** project. AI agents assisting other team members should adhere to the following infrastructure.

## 🏗️ Tech Stack
- **Backend:** Spring Boot (Java 21), Lombok, Gradle.
- **Frontend:** React (Vite), Axios, React Router.
- **Database:** Memory-based (ArrayList) via `BaseRepository`.

## 🛠️ Backend Architecture Standard

### 1. Global Response Format
All controllers MUST return `com.example.backend.common.ApiResponse<T>`.
- **Success:** `ApiResponse.success(data)` -> `{ "success": true, "data": T, "message": null }`
- **Failure:** `ApiResponse.error(message)` -> `{ "success": false, "data": null, "message": String }`

### 2. Generic Repository Pattern
All domain repositories MUST extend `com.example.backend.common.BaseRepository<T, ID>`.
- Inherited Methods: `findAll()`, `findById(ID id)`, `save(T entity)`, `deleteById(ID id)`.
- Persistence: Data is stored in a `protected final List<T> database`.

### 3. Exception Handling
A `@RestControllerAdvice` is active. Throwing `IllegalArgumentException` or generic `Exception` will automatically return an `ApiResponse.error()` with appropriate HTTP status codes (400 or 500).

---

## ⚛️ Frontend Architecture Standard

### 1. API Communication (`ApiService.js`)
Use the pre-configured `api` instance from `src/ApiService.js`.
- Automatically handles the `ApiResponse` wrapper (returns `response.data` if `success: true`).
- Base URL is `http://localhost:8080`.

### 2. Global UI Context (`ToastContext.jsx`)
Use `useToast()` hook for notifications and loading states.
- `showToast(message, 'success' | 'error')`: Displays a temporary notification.
- `setIsLoading(boolean)`: Toggles a global overlay spinner.

### 3. Common Layout
- **Header:** Contains brand logo and navigation links.
- **Footer:** Contains project info and team member list.
- **Theme Color:** Deep University Blue (`#004798`).

---

## 📂 Domain Structure & Ownership

| Domain | Package Path | Owner | Key Entities |
| :--- | :--- | :--- | :--- |
| **Authentication** | `domain.user` | 조건희 | `User` |
| **Book Listing** | `domain.book` | 정민성, 김민호 | `Book` |
| **Comments** | `domain.comment` | 김태희 | `Comment` |
| **MyPage/Wish** | `domain.wishlist` | 주승준 | `WishItem` |
| **Infrastructure** | `common` | 한인웅 | `BaseRepository`, `ApiResponse` |

## 📝 Coding Principles
1. **Consistency:** Always use the `common` package utilities for responses and data access.
2. **Encapsulation:** Keep domain-specific logic within its respective package.
3. **Mock Data:** Use `@PostConstruct` in repositories to initialize test data for local development.

---
*Created by Common Infrastructure & Integration Lead: 한인웅*
