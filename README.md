# 🏋️ Fitness Monolith — Fitness Tracker Application

A fitness tracking application built using **Java, Spring Boot, Spring Security, JWT, MySQL, HTML, CSS, and JavaScript**. The application allows users to track fitness activities and receive personalized recommendations through REST APIs.

## 🚀 Features

- 🔐 User authentication and authorization using Spring Security and JWT
- 🏃 Fitness activity tracking
- 💡 Personalized fitness recommendations
- 🔄 RESTful API architecture
- 🗄️ Database management using MySQL and Spring Data JPA
- 🧱 Layered architecture: Controller → Service → Repository
- ⚠️ Exception handling for reliable API responses
- 🖥️ Frontend built using HTML, CSS, and JavaScript

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Language | Java |
| Backend | Spring Boot, Spring MVC |
| Security | Spring Security, JWT |
| Database | MySQL |
| ORM | Spring Data JPA, Hibernate |
| Frontend | HTML, CSS, JavaScript |
| Build Tool | Maven |
| API Testing | Postman |
| Documentation | Swagger UI, if configured |

## 📂 Project Structure

```text
Fitness-Monolith/
│
├── src/
│   └── main/
│       ├── java/              # Backend source code
│       └── resources/         # Application configuration
│
├── fitness-frontend/
│   ├── index.html             # Main frontend page
│   ├── dashboard.html         # Fitness dashboard
│   ├── style.css              # Styling
│   └── script.js              # Frontend JavaScript
│
├── pom.xml                    # Maven dependencies
├── Dockerfile
└── README.md
```

## 🔑 API Overview

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate a user and obtain a JWT |

### Activities

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/activities` | Create a fitness activity |
| GET | `/api/activities` | Retrieve fitness activities |

### Recommendations

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/recommendation/generate` | Generate a recommendation |
| GET | `/api/recommendation/user/{userId}` | Retrieve recommendations for a user |
| GET | `/api/recommendation/activity/{activityId}` | Retrieve recommendations for an activity |

*Note: These endpoints are based on the existing project documentation. Verify the paths and supported operations against the actual controllers before using them.*

## ⚙️ Getting Started

### Prerequisites

Install the following tools:

- Java JDK
- Maven (or use the included Maven Wrapper)
- MySQL Server
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Swapnil-77/Fitness-Monolith.git
cd Fitness-Monolith
```

### 2. Configure the Database

Create the database in MySQL:

```sql
CREATE DATABASE fitness_demo;
```

Configure your database URL, username, and password in the application's configuration.

**Security tip:** Never commit real database passwords, JWT secrets, or other credentials to GitHub. Use environment variables for sensitive values.

### 3. Run the Backend

From the project root, use the Maven Wrapper on Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

Alternatively, if Maven is installed:

```bash
mvn spring-boot:run
```

The backend's default port depends on your Spring Boot configuration.

### 4. Run the Frontend

1. Open the `fitness-frontend` folder.
2. Open `index.html` in your browser.
3. Navigate to the dashboard as supported by the frontend.

If the frontend calls backend APIs, make sure the backend is running and the API URLs in `script.js` match the backend address and port.

## 🧪 Testing

- Test API endpoints using Postman.
- Verify authentication using JWT tokens.
- Test activity tracking and recommendation endpoints.
- Confirm that the frontend can communicate with the backend.

## 🧠 Key Learnings

- Building REST APIs with Spring Boot
- Implementing authentication and authorization using Spring Security and JWT
- Integrating MySQL with Spring Data JPA and Hibernate
- Organizing backend code using a layered architecture
- Connecting an HTML, CSS, and JavaScript frontend to backend APIs

## 🔮 Future Improvements

- Deploy the frontend and backend online
- Improve dashboard responsiveness and user experience
- Add more fitness analytics and progress visualizations
- Enhance automated testing and API documentation

## 👨‍💻 Author

**Swapnil Phad**

- GitHub: https://github.com/Swapnil-77
- LinkedIn: https://www.linkedin.com/in/swapnil-phad7/

---

⭐ If you find this project interesting, consider starring the repository!
