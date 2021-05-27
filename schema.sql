CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE department (
  id - INT PRIMARY KEY,
  name - VARCHAR(30) to hold department name,
  PRIMARY KEY(id)
);

CREATE TABLE role (
  id INT - INT PRIMARY KEY,
  title -  VARCHAR(30) to hold role title,
  salary -  DECIMAL to hold role salary,
  department_id -  INT to hold reference to department role belongs to,
  PRIMARY KEY(id)
);

CREATE TABLE employee (
  id INT - INT PRIMARY KEY,
  first_name - VARCHAR(30) to hold employee first name,
  last_name - VARCHAR(30) to hold employee last name,
  role_id - INT to hold reference to role employee has,
  is_manager - INT to hold reference to another employee that manages the employee,
  manager_id INT 
  PRIMARY KEY(id)
);