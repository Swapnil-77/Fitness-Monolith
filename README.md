# 💪 Fitness Monolith

A Fitness Tracking Application built using **Java 21, Spring Boot, Spring Security, JWT, MySQL, HTML, CSS, and JavaScript**.

This project is designed to provide a backend for fitness activity tracking and personalized recommendations, with a separate frontend for the user interface.

---

## 📌 Project Overview

Fitness Monolith is a full-stack application that organizes its backend and frontend into separate folders within a single repository.

The backend handles application logic, REST APIs, authentication, and database operations, while the frontend provides the user interface.

## 🛠️ Tech Stack

### Backend
- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- REST APIs
- JWT Authentication
- MySQL
- Maven

### Frontend
- HTML5
- CSS3
- JavaScript

### Tools
- IntelliJ IDEA
- MySQL Workbench
- Postman
- Git and GitHub

## ✨ Features

- REST API-based backend architecture
- User authentication and security using Spring Security and JWT
- Database integration with MySQL
- Entity management using Spring Data JPA and Hibernate
- Fitness activity tracking
- Recommendation-related functionality
- Separate frontend and backend directories

*Note: The features listed above describe the intended application capabilities. Refer to the source code for the currently implemented functionality.*

## 📂 Project Structure

```text
Fitness-Monolith/
│
├── fitness-backend/
│   ├── src/
│   ├── pom.xml
│   ├── mvnw
│   ├── mvnw.cmd
│   ├── Dockerfile
│   └── README.md
│
├── fitness-frontend/
│   ├── index.html
│   ├── CSS files
│   ├── JavaScript files
│   └── Other frontend assets
│
├── .gitignore
└── README.md
```

## ⚙️ Prerequisites

Before running the application, make sure you have:

- Java JDK 21
- MySQL Server
- Git
- A modern web browser

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Swapnil-77/Fitness-Monolith.git
```

### 2. Configure the Database

1. Start your MySQL server.
2. Create or configure the database used by the backend.
3. Open the backend's `application.properties` file.
4. Update the database URL, username, and password according to your local MySQL configuration.

**Important:** Use your own database credentials. Do not upload passwords or other secrets to GitHub.

### 3. Run the Backend

Open a terminal in the `fitness-backend` directory.

Run:

```bash
.\mvnw.cmd spring-boot:run
```

On Windows, this command starts the Spring Boot application using the Maven Wrapper.

Alternatively, you can build the project first:

```bash
.\mvnw.cmd -DskipTests package
```

Then run the generated JAR file from the `target` directory.

The application will use the port configured in its Spring Boot settings. The default is commonly `8080`.

### 4. Run the Frontend

Open the `fitness-frontend` directory and launch `index.html` in your web browser.

If the frontend makes API requests, ensure that the backend is running and that the API URLs and CORS settings are configured correctly.

## 🧪 API Testing

You can use **Postman** to test the backend REST APIs.

Depending on the endpoint, testing may involve:

- Sending HTTP requests
- Checking API responses
- Testing authentication
- Verifying database operations

Refer to the backend source code for the available endpoints and request formats.

## 🐳 Docker

A Dockerfile is included in the backend directory.

Before building the image, make sure the backend JAR has been generated.

From the `fitness-backend` directory, run:

```bash
docker build -t fitness-backend .
```

Start the container with:

```bash
docker run -p 8080:8080 fitness-backend
```

Database connectivity and other required configuration must be provided for your environment.

## 👨‍💻 Developer

**Swapnil Phad**

- GitHub: [Swapnil-77](https://github.com/Swapnil-77)
- LinkedIn: [Swapnil Phad](https://www.linkedin.com/in/swapnil-phad7/)

## 🎯 Project Goal

To build and improve a fitness tracking application while gaining practical experience with Java backend development, Spring Boot, REST APIs, authentication, database integration, and frontend technologies.

---

⭐ If you find this project interesting, consider giving the repository a star!
