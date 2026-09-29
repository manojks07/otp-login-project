# LLM Prompts Used During Development

This file documents the prompts used with an LLM during the development of the OTP-based login and checkout application.

## 1. Backend Architecture

Prompt:

> Build an OTP-based login and checkout system using React for the frontend, Spring Boot for the backend, and MySQL for data persistence. Keep the frontend, API, and database layers separate.

## 2. User Registration

Prompt:

> Create a Spring Boot registration API that accepts email, first name, and last name, checks whether the email already exists, generates a 6-digit OTP, and saves the user in MySQL.

## 3. Email Recognition

Prompt:

> Create an API to recognize whether an email is already registered and return the user's information without exposing the OTP unnecessarily.

## 4. OTP Verification

Prompt:

> Create an OTP verification endpoint that accepts email and OTP, validates that the OTP contains exactly 6 digits, verifies it against the stored OTP, and returns a structured success or error response.

## 5. Registration Validation

Prompt:

> Add validation for registration fields and return clear field-specific validation errors to the React frontend.

## 6. Duplicate Email Handling

Prompt:

> Handle duplicate email registration gracefully and return an appropriate error message instead of an internal server error.

## 7. Checkout Validation

Prompt:

> Add Spring Boot validation for checkout email, phone number, and shipping address. Return clear validation messages for invalid fields.

## 8. React Checkout Validation

Prompt:

> Connect the backend checkout validation errors to React and display the appropriate error message below each checkout field.

## 9. OTP Validation in React

Prompt:

> Add frontend validation for the OTP so that only numeric values can be entered and the OTP must contain exactly 6 digits before sending the request to the backend.

## 10. UI Improvements

Prompt:

> Improve the React registration and checkout UI using Tailwind CSS while preserving the existing application logic, API calls, validation, OTP verification, guest checkout, and registered-user checkout flow.

## 11. Preserve Existing Logic

Prompt:

> Preserve the existing Checkout component logic exactly and modify only the UI presentation. Do not remove or change email recognition, OTP verification, guest checkout, validation, API calls, or checkout persistence.

## 12. Debugging

Prompt:

> Diagnose the runtime error and explain the cause and the required code changes without changing unrelated working functionality.

## 13. Database Schema

Prompt:

> Create a schema.sql file matching the existing Spring Boot User and Checkout entities, including the users and checkouts tables and their required columns and constraints.

## 14. Testing

Prompt:

> Provide test cases for registration, duplicate email, invalid input, OTP verification, invalid OTP, guest checkout, registered-user checkout, and checkout validation.
