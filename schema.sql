DROP DATABASE IF EXISTS  employee_trackerdb;

CREATE DATABASE   employee_trackerdb;

USE employee_trackerdb;

CREATE TABLE  department(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(30),
);

CREATE TABLE role(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT UNSIGNED NOT NULL,
    INDEX dep_id (department_id),
    CONSTRAINT fk_deparment FOREIGN KEY (deparment_id) REFERENCES department(id) ON DELETE CASCADE

);

CREATE TABLE employee(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL ,
    role_id INT UNSIGNED NOT NULL,
    INDEX role_id (role_id),
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    manager_id INT UNSIGNED NOT NULL,
    INDEX man_id (manager_id),
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES manager(id) ON DELETE CASCADE
);