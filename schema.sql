DROP DATABASE IF EXISTS  employee_trackerdb;

CREATE DATABASE   employee_trackerdb;

USE employee_trackerdb;

CREATE TABLE  department(
    id INT AUTO_INCREMENT NOT NULL,
    dep_name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE `role`(
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT(10),
    PRIMARY KEY (id)
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL ,
    role_id INT(10) NOT NULL,
    manager_id INT(10),
    PRIMARY KEY(id)
);