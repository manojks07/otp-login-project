CREATE DATABASE IF NOT EXISTS opt_login;

USE opt_login;

CREATE TABLE users (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       email VARCHAR(255) NOT NULL UNIQUE,
                       first_name VARCHAR(255) NOT NULL,
                       last_name VARCHAR(255) NOT NULL,
                       otp VARCHAR(255) NOT NULL
);

CREATE TABLE checkouts (
                           id BIGINT AUTO_INCREMENT PRIMARY KEY,
                           email VARCHAR(255) NOT NULL,
                           phone VARCHAR(255) NOT NULL,
                           shipping_address TEXT NOT NULL
);