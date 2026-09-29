# OTP-Based Login and Checkout System

A full-stack web application implementing OTP-based user recognition, verification, and checkout using React, Spring Boot, and MySQL.

## Tech Stack

### Frontend

* React
* JavaScript
* Vite
* Tailwind CSS

### Backend

* Java
* Spring Boot
* Spring Data JPA
* Jakarta Validation
* Maven

### Database

* MySQL

## Project Structure

```text
OTP-Login-Project/
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── ...
│
├── schema.sql
├── prompts.md
└── README.md
```

## Features

### Registration

* Register using email, first name, and last name.
* Validate registration fields.
* Prevent duplicate email registration.
* Generate a 6-digit OTP.
* Store registered user information in MySQL.

### User Recognition

* Recognize an existing user using their email address.
* Display OTP verification for recognized users.

### OTP Verification

* Verify a 6-digit OTP.
* Display clear success and error messages.
* Reject invalid OTP lengths.
* Allow users to skip login and continue as a guest.

### Checkout

* Collect email, phone number, and shipping address.
* Validate checkout fields on both frontend and backend.
* Display field-specific validation errors.
* Save valid checkout information to MySQL.

## Application Flow

```text
Registration
     │
     ▼
Enter User Details
     │
     ▼
Backend Validation
     │
     ├── Invalid ──► Display Error
     │
     ▼
Generate OTP
     │
     ▼
Store User in MySQL
     │
     ▼
Checkout
     │
     ▼
Enter Email
     │
     ├── Existing User ──► OTP Verification
     │                         │
     │                         ├── Correct ──► Continue
     │                         └── Incorrect ─► Error
     │
     └── New/Guest User ──► Continue
                              │
                              ▼
                       Checkout Validation
                              │
                              ▼
                         Save to MySQL
```

## Backend Setup

### Requirements

Make sure the following are installed:

* Java
* Maven
* MySQL

### 1. Create the Database

Open MySQL and run:

```sql
CREATE DATABASE opt_login;
```

The complete database structure is available in:

```text
schema.sql
```

### 2. Configure Database Connection

Open:

```text
backend/src/main/resources/application.properties
```

Configure the MySQL connection according to your local MySQL username, password, and database settings.

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/opt_login
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Do not commit real database passwords or other secrets to the repository.

### 3. Start the Backend

Open the backend project and run:

```bash
mvn spring-boot:run
```

The Spring Boot API will run on the configured local port.

## Frontend Setup

### 1. Open the Frontend

Open the `frontend` directory in VS Code.

### 2. Install Dependencies

Run:

```bash
npm install
```

### 3. Start React

Run:

```bash
npm run dev
```

Vite will display the local development URL in the terminal.

## API Endpoints

### Register User

```text
POST /api/users/register
```

Registers a new user and generates an OTP.

### Recognize User

```text
GET /api/users/recognize?email={email}
```

Checks whether an email belongs to an existing user.

### Verify OTP

```text
POST /api/users/verify-otp?email={email}&otp={otp}
```

Verifies the OTP for an existing user.

### Checkout

```text
POST /api/checkout
```

Validates and saves checkout information.

## Validation

The application performs validation at both frontend and backend levels.

Examples include:

* Required email
* Valid email format
* Required first name
* Required last name
* Duplicate email detection
* OTP must contain exactly 6 digits
* Phone number must contain exactly 10 digits
* Shipping address is required

## Testing

The following scenarios were tested during development:

* Valid user registration
* Invalid registration input
* Duplicate email registration
* Existing-user recognition
* Correct OTP
* Incorrect OTP
* Invalid OTP length
* Guest checkout
* Invalid checkout information
* Valid checkout
* Checkout database persistence

## Documentation

Additional development documentation is available in:

```text
prompts.md
schema.sql
```

`prompts.md` documents the LLM prompts used during development.

`schema.sql` contains the database schema required by the application.

## Notes

This project is intended as a demonstration of a full-stack OTP-based login and checkout workflow using React, Spring Boot, and MySQL.
