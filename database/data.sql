CREATE DATABASE UserManagement;
USE UserManagement;

CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    x INT,
    z INT,
    PRIMARY KEY (id)
);

INSERT INTO users (name, email, status)
VALUES("FirstUser", "adko@moj.com", "active",1,2);
