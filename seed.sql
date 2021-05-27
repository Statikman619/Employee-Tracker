CREATE DATABASE employeeTracker;

USE employeeTracker;

CREATE TABLE department (
  id INT AUTO INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE role (
  id INT AUTO INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(9,2) NOT NULL,
  departmentId varchar(60) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE employee (
  id INT AUTO INCREMENT,
  firstName VARCHAR(30) NOT NULL,
  lastName VARCHAR(30) NOT NULL,
  roleId INT NOT NULL,
  isManager BOOLEAN NOT NULL,
  managerId INT 
  PRIMARY KEY(id)
);