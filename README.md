# 🚀 Fitness Tracker Backend System

A scalable and secure backend system built using Spring Boot that enables users to track fitness activities and receive personalized recommendations. Designed with production-level architecture and authentication mechanisms.

---

## 🔥 Highlights

- 🔐 Secure authentication using JWT (Spring Security)
- 🏃 Activity tracking system with structured data handling
- 💡 Recommendation engine for fitness insights
- 🧱 Clean layered architecture (Controller → Service → Repository)
- ⚡ Optimized database interactions using JPA (Hibernate)
- 🛡️ Global exception handling for robust API responses

---

## 🛠️ Tech Stack

| Category        | Technologies |
|----------------|-------------|
| Language       | Java        |
| Backend        | Spring Boot, Spring MVC, Spring Security |
| Database       | MySQL, JPA (Hibernate) |
| Tools          | Postman, Swagger UI |
| Architecture   | Layered Architecture |

---

## ⚙️ System Design

- Followed **modular and scalable design principles**
- Implemented **JWT-based authentication flow**
- Designed APIs with proper **request/response handling**
- Used **DTO pattern** to separate internal models from API responses

---

## 📡 API Overview

### 🔐 Authentication
- `POST /api/auth/register` → Register a new user  
- `POST /api/auth/login` → Authenticate user & return JWT  

### 🏃 Activities
- `POST /api/activities` → Track a new activity  
- `GET /api/activities` → Fetch all activities for user  

### 💡 Recommendations
- `POST /api/recommendation/generate` → Generate recommendation  
- `GET /api/recommendation/user/{userId}` → Get user recommendations  
- `GET /api/recommendation/activity/{activityId}` → Get activity recommendations  

---

## 🧪 Testing & Documentation

- APIs tested using **Postman**
- API documentation available via **Swagger UI**
- Secure endpoints tested with JWT tokens

---

## 🧠 Key Learnings

- Implemented **authentication & authorization using JWT**
- Understood **real-world backend architecture design**
- Improved knowledge of **Spring Security & JPA**
- Gained experience in **building production-ready REST APIs**

---

## 🚀 Getting Started

### Clone Repository
```bash
git clone https://github.com/Swapnil-77/Fitness-Monolith.git
cd Fitness-Monolith
